

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const AdminDashboard = () => {
//   const [content, setContent] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("http://localhost:8000/api/admin/get-markdown-content")
//       .then(res => setContent(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const deleteContent = async (id) => {
//     await axios.delete(`http://localhost:8000/api/admin/delete-markdown-content/${id}`);
//     setContent(content.filter(c => c._id !== id));
//   };

//   const styles = {
//     page: {
//       background: "#f0f4f8",
//       minHeight: "100vh",
//       padding: "40px",
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//     },
//     header: {
//       color: "#d32f2f",
//       textAlign: "center",
//       fontSize: "38px",
//       marginBottom: "30px",
//       fontWeight: "bold"
//     },
//     addButton: {
//       background: "#1976D2",
//       color: "#fff",
//       padding: "12px 20px",
//       fontSize: "16px",
//       border: "none",
//       borderRadius: "8px",
//       cursor: "pointer",
//       marginBottom: "30px",
//       transition: "background 0.3s ease",
//     },
//     card: {
//       background: "#ffffff",
//       borderRadius: "10px",
//       boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//       padding: "20px",
//       marginBottom: "20px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     title: {
//       fontSize: "18px",
//       fontWeight: "500",
//       color: "#333",
//     },
//     buttonGroup: {
//       display: "flex",
//       gap: "10px",
//     },
//     viewButton: {
//       background: "#388E3C",
//       color: "#fff",
//       border: "none",
//       padding: "8px 14px",
//       borderRadius: "6px",
//       cursor: "pointer",
//       transition: "background 0.3s ease",
//     },
//     deleteButton: {
//       background: "#D32F2F",
//       color: "#fff",
//       border: "none",
//       padding: "8px 14px",
//       borderRadius: "6px",
//       cursor: "pointer",
//       transition: "background 0.3s ease",
//     },
//   };

//   return (
//     <div style={styles.page}>
//       <motion.h2 
//         style={styles.header}
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Admin Dashboard
//       </motion.h2>

//       <motion.button
//         style={styles.addButton}
//         onClick={() => navigate("/add-markdown-page")}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         ➕ Add New Markdown Page
//       </motion.button>

//       {content.map(item => (
//         <motion.div
//           key={item._id}
//           style={styles.card}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           <span style={styles.title}>{item.title}</span>
//           <div style={styles.buttonGroup}>
//             <button
//               style={styles.viewButton}
//               onClick={() => navigate(`/markdown-page/${item._id}`)}
//             >
//               View 📖
//             </button>
//             <button
//               style={styles.deleteButton}
//               onClick={() => deleteContent(item._id)}
//             >
//               Delete 🗑️
//             </button>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/admin/get-markdown-content")
      .then(res => setContent(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteContent = async (id) => {
    await axios.delete(`http://localhost:8000/api/admin/delete-markdown-content/${id}`);
    setContent(content.filter(c => c._id !== id));
  };

  const styles = {
    page: {
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      padding: "40px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      color: "#d32f2f",
      textAlign: "center",
      fontSize: "35px",
      fontWeight: "700",
      marginBottom: "30px",
    },
    addButton: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "10px 20px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      marginBottom: "30px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      padding: "15px 20px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: "18px",
      color: "#333",
      fontWeight: "500",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
    },
    viewButton: {
      backgroundColor: "#28a745",
      color: "white",
      padding: "8px 12px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
      padding: "8px 12px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <motion.h2
        style={styles.header}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h2>

      <button
        style={styles.addButton}
        onClick={() => navigate("/add-markdown-page")}
      >
        ➕ Add New Markdown Page
      </button>

      {content.length === 0 && (
        <p style={{ textAlign: "center", color: "#888" }}>
          No content available. Please add new content.
        </p>
      )}

      {content.map(item => (
        <div key={item._id} style={styles.card}>
          <span style={styles.title}>
            {item.title || "Untitled Page"}
          </span>
          <div style={styles.buttonGroup}>
            <button
              style={styles.viewButton}
              onClick={() => navigate(`/markdown-page/${item._id}`)}
            >
              View
            </button>
            <button
              style={styles.deleteButton}
              onClick={() => deleteContent(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
