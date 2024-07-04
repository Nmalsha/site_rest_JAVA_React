// import React, { createContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     isAuthenticated: false,
//     userName: "",
//     isAdmin: false,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("jwtToken");
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setAuthState({
//         isAuthenticated: true,
//         userName: decodedToken.nickname,
//         isAdmin: decodedToken.roles.includes("ROLE_ADMIN"),
//       });
//     }
//   }, []);

//   const handleLoginSuccess = (token) => {
//     const decodedToken = jwtDecode(token);
//     setAuthState({
//       isAuthenticated: true,
//       userName: decodedToken.nickname,
//       isAdmin: decodedToken.roles.includes("ROLE_ADMIN"),
//     });
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setAuthState({
//       isAuthenticated: false,
//       userName: "",
//       isAdmin: false,
//     });
//   };

//   return (
//     <AuthContext.Provider
//       value={{ authState, handleLoginSuccess, handleLogout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
