// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//     const [hovered, setHovered] = useState(null);

//     const navbarStyle = {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         background: "#222",
//         padding: "15px 30px",
//         color: "white"
//     };

//     const logoStyle = {
//         fontSize: "22px",
//         fontWeight: "bold",
//         textDecoration: "none",
//         color: "white"
//     };

//     const navLinksStyle = {
//         listStyle: "none",
//         display: "flex",
//         margin: "0",
//         padding: "0"
//     };

//     const navItemStyle = {
//         marginLeft: "20px"
//     };

//     const linkStyle = (isHovered) => ({
//         textDecoration: "none",
//         color: isHovered ? "#ff9900" : "white",
//         fontSize: "18px",
//         transition: "color 0.3s ease-in-out"
//     });

//     return (
//         <nav style={navbarStyle}>
//             <div>
//                 <Link to="/" style={logoStyle}>
//                     URBAN SYSTEMS
//                 </Link>
//             </div>
//             <ul style={navLinksStyle}>
//                 {["/main", "/blogs", "/add-post"].map((path, index) => {
//                     const labels = ["CHATBOT", "BLOGS", "ADD POST"];
//                     return (
//                         <li key={index} style={navItemStyle}>
//                             <Link 
//                                 to={path} 
//                                 style={linkStyle(hovered === index)}
//                                 onMouseEnter={() => setHovered(index)}
//                                 onMouseLeave={() => setHovered(null)}
//                             >
//                                 {labels[index]}
//                             </Link>
//                         </li>
//                     );
//                 })}
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [hovered, setHovered] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Adjust this based on how authentication is handled
        navigate("/"); // Redirect to the login page
    };

    const navbarStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#222",
        padding: "15px 30px",
        color: "white"
    };
    

    const logoStyle = {
        fontSize: "22px",
        fontWeight: "bold",
        textDecoration: "none",
        color: "white"
    };

    const navLinksStyle = {
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        margin: "0",
        padding: "0"
    };

    const navItemStyle = {
        marginLeft: "20px"
    };

    const linkStyle = (isHovered) => ({
        textDecoration: "none",
        color: isHovered ? "#ff9900" : "white",
        fontSize: "18px",
        transition: "color 0.3s ease-in-out"
    });

    const logoutButtonStyle = {
        marginLeft: "20px",
        padding: "8px 15px",
        background: "#ff4444",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background 0.3s ease-in-out"
    };

    return (
        <nav style={navbarStyle}>
            <div>
                <Link to="/" style={logoStyle}>
                    URBAN SYSTEMS
                </Link>
            </div>
            <ul style={navLinksStyle}>
                {["/main", "/blogs", "/add-post"].map((path, index) => {
                    const labels = ["CHATBOT", "BLOGS", "ADD POST"];
                    return (
                        <li key={index} style={navItemStyle}>
                            <Link 
                                to={path} 
                                style={linkStyle(hovered === index)}
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {labels[index]}
                            </Link>
                        </li>
                    );
                })}
                <li>
                    <button style={logoutButtonStyle} onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
