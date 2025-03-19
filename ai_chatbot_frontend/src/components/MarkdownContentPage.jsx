import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

const MarkdownContentPage = () => {
  const [content, setContent] = useState(null);
  const { contentId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/admin/get-markdown-content`)
      .then(res => setContent(res.data.find(c => c._id === contentId)));
  }, [contentId]);

  return content ? (
    <div>
      <h1>{content.title}</h1>
      <ReactMarkdown>{content.markdown_content}</ReactMarkdown>
    </div>
  ) : <div>Loading...</div>;
};

export default MarkdownContentPage;
