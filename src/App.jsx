// // import React from "react";
// // import Navbar from "./components/Navbar/Navbar";
// // import Hero from "./components/Hero/Hero";
// // import Products from "./components/Products/Products";
// // import AOS from "aos";
// // import "aos/dist/aos.css";
// // import TopProducts from "./components/TopProducts/TopProducts";
// // // import Banner from "./components/Banner/Banner"; // Uncomment if needed
// // import Subscribe from "./components/Subscribe/Subscribe";
// // import Testimonials from "./components/Testimonials/Testimonials";
// // import Footer from "./components/Footer/Footer";
// // import Popup from "./components/Popup/Popup";
// // import Cart from "./components/Cart/Cart";

// // const App = () => {
// //   const [orderPopup, setOrderPopup] = React.useState(false);

// //   const handleOrderPopup = () => {
// //     setOrderPopup((prev) => !prev); // Improved toggle function
// //   };

// //   React.useEffect(() => {
// //     AOS.init({
// //       offset: 100,
// //       duration: 800,
// //       easing: "ease-in-sine",
// //       delay: 100,
// //     });
// //     AOS.refresh();
// //   }, []);

// //   return (
// //     <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
// //       <Navbar handleOrderPopup={handleOrderPopup} />
// //       <Hero handleOrderPopup={handleOrderPopup} />
// //       <Products />
// //       <TopProducts handleOrderPopup={handleOrderPopup} />
// //       {/* <Banner /> */} {/* Uncomment if needed */}
// //       <Subscribe />
// //       <Testimonials />
// //       <Cart />
// //       <Footer />
// //       <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
// //     </div>
// //   );
// // };

// // export default App;


// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Navbar from "./components/Navbar/Navbar";
// // import Hero from "./components/Hero/Hero";
// // import Products from "./components/Products/Products";
// // import AOS from "aos";
// // import "aos/dist/aos.css";
// // import TopProducts from "./components/TopProducts/TopProducts";
// // // import Banner from "./components/Banner/Banner"; // Uncomment if needed
// // import Subscribe from "./components/Subscribe/Subscribe";
// // import Testimonials from "./components/Testimonials/Testimonials";
// // import Footer from "./components/Footer/Footer";
// // import Popup from "./components/Popup/Popup";
// // import Cart from "./components/Cart/Cart"; // Import Cart component
// // import AdminLogin from "./components/Admin/AdminLogin";
// // import AdminDashboard from "./components/Admin/AdminDashboard";

// // const App = () => {
// //   const [orderPopup, setOrderPopup] = React.useState(false);

// //   const handleOrderPopup = () => {
// //     setOrderPopup((prev) => !prev); // Toggle popup
// //   };

// //   React.useEffect(() => {
// //     AOS.init({
// //       offset: 100,
// //       duration: 800,
// //       easing: "ease-in-sine",
// //       delay: 100,
// //     });
// //     AOS.refresh();
// //   }, []);

// //   return (
// //     <Router>
// //       <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
// //         <Navbar handleOrderPopup={handleOrderPopup} /> 
// //         <Routes>
// //           <Route
// //             path="/"
// //             element={
// //               <>
// //                 <Hero handleOrderPopup={handleOrderPopup} />
// //                 <Products />
// //                 <TopProducts handleOrderPopup={handleOrderPopup} />
// //                 {/* <Banner /> */} {/* Uncomment if needed */}
// //                 <Subscribe />
// //                 <Testimonials />
// //               </>
// //             }
// //           />
// //           <Route path="/cart" element={<Cart />} />
// //           <Route path="/login" element={<AdminLogin />} />
// //           <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

// //         </Routes>
// //         <Footer />
// //         <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
// //       </div>
// //     </Router>
// //   );
// // };

// // export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Hero from "./components/Hero/Hero";
// import Products from "./components/Products/Products";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import TopProducts from "./components/TopProducts/TopProducts";
// // import Subscribe from "./components/Subscribe/Subscribe";
// import Testimonials from "./components/Testimonials/Testimonials";
// import Footer from "./components/Footer/Footer";
// import Popup from "./components/Popup/Popup";
// import Cart from "./components/Cart/Cart"; 
// import AdminLogin from "./components/Admin/AdminLogin";
// import AdminDashboard from "./components/Admin/AdminDashboard";
// import PrivateRoute from "./components/Admin/PrivateRoute"; // Import PrivateRoute

// const App = () => {
//   const [orderPopup, setOrderPopup] = React.useState(false);

//   const handleOrderPopup = () => {
//     setOrderPopup((prev) => !prev);
//   };

//   React.useEffect(() => {
//     AOS.init({
//       offset: 100,
//       duration: 800,
//       easing: "ease-in-sine",
//       delay: 100,
//     });
//     AOS.refresh();
//   }, []);

//   return (
//     <Router>
//       <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
//         <Navbar handleOrderPopup={handleOrderPopup} /> 
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <Hero handleOrderPopup={handleOrderPopup} />
//                 <Products />
//                 <TopProducts handleOrderPopup={handleOrderPopup} />
//                 <Testimonials />
//                 <Footer />
//               </>
//             }
//           />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/login" element={<AdminLogin />} />
//           <Route
//             path="/admin/*"
//             element={
//               <PrivateRoute>
//                 <AdminDashboard />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
        
//         <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import AOS from "aos";
import "aos/dist/aos.css";
import TopProducts from "./components/TopProducts/TopProducts";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";
import Cart from "./components/Cart/Cart"; 
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import PrivateRoute from "./components/Admin/PrivateRoute"; // Import PrivateRoute

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup((prev) => !prev);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar handleOrderPopup={handleOrderPopup} /> 
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Hero handleOrderPopup={handleOrderPopup} />
                <Products />
                <TopProducts handleOrderPopup={handleOrderPopup} />
                <Testimonials />
                <Footer />
              </div>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        
        <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      </div>
    </Router>
  );
};

export default App;
