import React, { useState } from "react";
import { post } from "../../utilities";
import "./NewBlog.css";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [etitle, setEtitle] = useState("");
  const [blogcontent, setBlogcontent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    post("http://localhost:3001/api/blogs", {
      title: title,
      summary: summary,
      date: date,
      etitle: etitle,
      blogcontent: blogcontent,
    });
  };
  return (
    <div className="NewBlog">
      <input
        type="text"
        placeholder="Enter your blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your blog summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="date"
        placeholder="Enter your blog date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your blog etitle"
        value={etitle}
        onChange={(e) => setEtitle(e.target.value)}
      />
      <input
        type="file"
        placeholder="Upload your blog image"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              setBlogcontent(event.target.result);
            };
            reader.readAsText(file);
          }
        }}
      />

      <br />

      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default NewBlog;
