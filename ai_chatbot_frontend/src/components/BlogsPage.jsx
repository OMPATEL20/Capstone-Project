import React from "react";

const BlogPost = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    borderTop: "2px solid #ddd",
    borderBottom: "2px solid #ddd",
    backgroundColor: "#fafafa"
  };

  const sidebarStyle = {
    width: "20%",
    paddingRight: "20px",
    borderRight: "2px solid #ddd"
  };

  const contentStyle = {
    width: "60%",
    padding: "0 20px"
  };

  const rightSidebarStyle = {
    width: "20%",
    paddingLeft: "20px",
    borderLeft: "2px solid #ddd"
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#222"
  };

  const subHeadingStyle = {
    color: "#444"
  };

  const linkStyle = {
    color: "#d32f2f",
    textDecoration: "none"
  };

  return (
    <div style={containerStyle}>
      {/* Left Sidebar */}
      <div style={sidebarStyle}>
        <h3>Conferences</h3>
        <ul>
          <li>
            <a href="https://www.urbansystems.ca/ai-action-summit-2025" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              AI Action Summit 2025
            </a>
          </li>
          <li>
            <a href="https://www.urbansystems.ca/neuralx-2024" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              NeuralX 2024
            </a>
          </li>
          <li>
            <a href="https://www.urbansystems.ca/toronto-ml-summit" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              8th Toronto Machine Learning Summit
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={contentStyle}>
        <h1 style={headingStyle}>8th Toronto Machine Learning Summit</h1>
        <p><strong>July 10, 2024 – July 15, 2024</strong></p>

        <h2 style={subHeadingStyle}>Executive Summary</h2>
        <p>
          The <a href="https://www.urbansystems.ca/toronto-ml-summit" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            8th Annual Toronto Machine Learning Summit
          </a> celebrates Canadian applied AI innovations...
        </p>

        <h2 style={subHeadingStyle}>1.0 Introduction</h2>
        <p>
          Corey Yang attended this conference from July 10 - July 15, 2024. He attended the following presentations:
        </p>

        <ul>
          <li>
            <a href="https://www.urbansystems.ca/scaling-vector-database" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              Scaling Vector Database Usage Without Breaking the Bank
            </a>
          </li>
          <li>
            <a href="https://www.urbansystems.ca/ai-award-winning-ml-models" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              AI for AI: Award Winning ML Models
            </a>
          </li>
          <li>
            <a href="https://www.urbansystems.ca/generative-ai-design-patterns" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              Generative AI Design Patterns
            </a>
          </li>
        </ul>
      </div>

      {/* Right Sidebar */}
      <div style={rightSidebarStyle}>
        <h3>Key Takeaways</h3>
        <ul>
          <li>
            <a href="https://www.urbansystems.ca/scaling-vector-database" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              Scaling Vector Database
            </a>
          </li>
          <li>
            <a href="https://www.urbansystems.ca/graph-database" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              Graph Database
            </a>
          </li>
          <li>
            <a href="https://www.urbansystems.ca/ai-agents" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              AI Agents
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogPost;


