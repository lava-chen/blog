import React, { useEffect, useState } from "react";

const MarkNav = ({ content, scrollContainer }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // 提取文章中的标题
    const headingElements = content.match(/(#+)\s(.+)/g) || [];
    const newHeadings = headingElements.map((heading, index) => {
      const level = heading.match(/#+/)[0].length; // 获取标题级别
      const text = heading.replace(/#+\s/, "").trim(); // 获取标题文本
      return { level, text, index };
    });
    setHeadings(newHeadings);
  }, [content]);

  const scrollToHeading = (index) => {
    const target = document.querySelector(`[data-id="heading-${index}"]`);
    if (target && scrollContainer) {
      scrollContainer.scrollTo(0, target.offsetTop); // 滚动到标题
    }
  };

  return (
    <div className="markdown-navigation">
      {headings.map((heading) => (
        <div
          key={heading.index}
          onClick={() => scrollToHeading(heading.index)}
          className={`title-level${heading.level}`}
        >
          {heading.text}
        </div>
      ))}
    </div>
  );
};

export default MarkNav;
