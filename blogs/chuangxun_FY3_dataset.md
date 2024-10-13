# 风云 3G 卫星数据集

## 1. 数据处理

对数据的处理主要有两个目的：

1. 提取出卫星每秒扫描的区域和轨迹
2. 提取出卫星扫描的地面降水数据

### 1.1 卫星数据格式

FY3G 卫星的数据分为**一级产品**和**二级产品**，我们下载的是二级产品中**KuR 雷达的升轨降轨数据**，时间范围从 2024.1.19-2024.9.31。由于数据文件太大，我决定下载一个月的数据，提取出有用的数据后再上传到 NAS 中。数据格式为 HDF。

#### 1.1.1 数据集

数据中数据集包括*地理信息模块、分类模块、滴谱模块、数据预处理模块、环境参数模块、反演模块、频率修正模块*。

#### 1.1.2 数据维度

| 名称  | 数值   | 说明                     |
| ----- | ------ | ------------------------ |
| nscan | 可变量 | 扫描行数                 |
| nray  | 59     | 每条扫描行中的角度单元数 |
| nbin  | 400    | 垂直方向的距离库单元数   |

其中特别注意的是 nray 的意义，它表示每条扫描行中角度单元的数目，对于 FY3G 卫星来说，每条扫描行中角度单元的数目为 59，即每条扫描行中有 59 个不同角度的观测值。

### 1.2 数据处理

处理数据我用了 Python 的 h5py 和 pandas 库。由于原数据集内存较大，很有必要将有用的数据提取出来，减少内存占用。对于每一个数据文件，我们需要**时间的数据，地理位置的数据，降水数据**。

#### 1.2.1 数据提取和数据格式转换函数构造

```python
import h5py
import pandas as pd
import numpy as np
import pandas as pd
import h5py

def geo_fields_csv(raw_data_filepath):
    try:
        with h5py.File(raw_data_filepath, 'r') as hdf:
            year = hdf['Geo_Fields']['Year'][:]
            month = hdf['Geo_Fields']['Month'][:]
            day_of_month = hdf['Geo_Fields']['DayOfMonth'][:]
            hour = hdf['Geo_Fields']['Hour'][:]
            minute = hdf['Geo_Fields']['Minute'][:]
            second = hdf['Geo_Fields']['Second'][:]
            for i in range(59):
                latitude_{i} = hdf['Geo_Fields']['Latitude'][:, i, 0]
                longitude_{i} = hdf['Geo_Fields']['Longitude'][:, i, 0]
                precipRateNearSurface_{i} = hdf['SLV']['precipRateNearSurface'][:, i]

            geo_fields_data = pd.DataFrame({
                'Year': year,
                'Month': month,
                'DayOfMonth': day_of_month,
                'Hour': hour,
                'Minute': minute,
                'Second': second,
            })

            for i in range(59):
                geo_fields_data = pd.DataFrame({
                    'Latitude_{i}': latitude_{i},
                    'Longitude_{i}': longitude_{i},
                    'PrecipRateNearSurface_{i}': precipRateNearSurface_{i},
            })

            return geo_fields_data

    except FileNotFoundError:
        print(f"错误: 文件 '{raw_data_filepath}' 未找到。")
    except KeyError as e:
        print(f"错误: 数据集中缺少键 {e}。")
    except Exception as e:
        print(f"发生错误: {e}")
```

#### 1.2.2 数据提取工作流

然后要做的工作是从磁盘中读数据,我才用的是读一天的数据生成一个 csv 文件，这样可以节省内存也方便检查数据缺失,也方便后续生成一天的扫描轨迹图。

```python
folder_path = 'path_for_one_day'
df_total = pd.DataFrame()
ls_filepaths=[]

for filename in os.listdir(folder_path):
    if filename.endswith('.HDF'):
        file_path = os.path.join(folder_path, filename)
        ls_filepaths.append(file_path)
print("Total files: ",len(ls_filepaths))
for i in range(0, len(ls_filepaths),2):
    file = ls_filepaths[i]
    print(i,"/",len(ls_filepaths),":",file)
    df_new = geo_fields_csv(file)
    df_total = pd.concat([df_total, df_new], ignore_index=True)
    print(df_total.shape)
```
