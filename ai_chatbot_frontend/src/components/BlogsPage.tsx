import React from "react";

const BlogPost = () => {
    const containerStyle = {
        display: "flex",
        flexDirection: "row",
        padding: "20px",
        fontFamily: "Arial, sans-serif"
    };

    const sidebarStyle = {
        width: "20%",
        paddingRight: "20px"
    };

    const contentStyle = {
        width: "60%"
    };

    const summaryStyle = {
        fontWeight: "bold",
        fontSize: "18px",
        marginBottom: "10px"
    };

    const rightSidebarStyle = {
        width: "20%",
        paddingLeft: "20px"
    };

    const headingStyle = {
        fontSize: "24px",
        fontWeight: "bold"
    };

    const linkStyle = {
        color: "red",
        textDecoration: "none"
    };

    return (
        <div style={containerStyle}>
            {/* Left Sidebar */}
            <div style={sidebarStyle}>
                <h3>Conferences</h3>
                <ul>
                    <li><a href="#" style={linkStyle}>AI Action Summit 2025</a></li>
                    <li><a href="#" style={linkStyle}>NeuralX 2024</a></li>
                    <li><a href="#" style={linkStyle}>8th Toronto Machine Learning Summit</a></li>
                </ul>
            </div>

            {/* Main Content */}
            <div style={contentStyle}>
                <h1 style={headingStyle}>8th Toronto Machine Learning Summit</h1>
                <p><strong>July 10 2024 – July 15 2024</strong></p>

                <h2>Executive Summary</h2>
                <p>
                    The <a href="#" style={linkStyle}>8th Annual Toronto Machine Learning Summit</a> celebrates Canadian applied AI innovations...
                </p>

                <h2>1.0 Introduction</h2>
                <p>
                    Corey Yang attended this conference from July 10 - July 15, 2024. He attended the following presentations:
                </p>

                <ul>
                    <li><a href="#" style={linkStyle}>Scaling Vector Database Usage Without Breaking the Bank</a></li>
                    <li><a href="#" style={linkStyle}>AI for AI: Award Winning ML Models</a></li>
                    <li><a href="#" style={linkStyle}>Generative AI Design Patterns</a></li>
                </ul>
            </div>

            {/* Right Sidebar */}
            <div style={rightSidebarStyle}>
                <h3>Key Takeaways</h3>
                <ul>
                    <li>Scaling Vector Database</li>
                    <li>Graph Database</li>
                    <li>AI Agents</li>
                </ul>
            </div>
        </div>
    );
};

export default BlogPost;
