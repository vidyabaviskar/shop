// // // Cart.jsx
// // import React, { useEffect, useState } from "react";
// // import { database } from "../../firebase"; // Import your firebase configuration
// // import { ref, onValue } from "firebase/database";

// // const Cart = () => {
// //   const [cartItems, setCartItems] = useState([]);

// //   useEffect(() => {
// //     const cartRef = ref(database, 'cart/');
// //     onValue(cartRef, (snapshot) => {
// //       const data = snapshot.val();
// //       const items = data ? Object.values(data) : [];
// //       setCartItems(items);
// //     });
// //   }, []);

// //   return (
// //     <div className="container">
// //       <h1 className="text-3xl font-bold">Your Cart</h1>
// //       {cartItems.length === 0 ? (
// //         <p>Your cart is empty</p>
// //       ) : (
// //         <ul>
// //           {cartItems.map((item, index) => (
// //             <li key={index} className="mt-2">
// //               {item.title}
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default Cart;
// import React, { useEffect, useState } from 'react';
// import { ref, onValue, push, set } from 'firebase/database';
// import { realtimeDb } from '../../firebase';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const cartRef = ref(realtimeDb, 'cart');
//     const cartListener = onValue(cartRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const cartData = snapshot.val();
//         setCartItems(Object.values(cartData));
//       } else {
//         setCartItems([]);
//       }
//     });

//     return () => cartListener();
//   }, []);

//   const handleQuoteSubmit = async (e) => {
//     e.preventDefault();

//     const quoteRef = ref(realtimeDb, 'quotes');
//     const newQuoteRef = push(quoteRef);
//     await set(newQuoteRef, {
//       name,
//       email,
//       message,
//       cartItems,
//       timestamp: new Date().toISOString(),
//     });

//     setName('');
//     setEmail('');
//     setMessage('');
//     alert('Quote request submitted successfully!');
//   };

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
//       <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
//       {cartItems.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {cartItems.map((item, index) => (
//             <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
//               <h5 className="text-xl font-semibold">{item.name}</h5>
//               <h6 className="text-lg text-gray-600 mb-2">₹{item.price}</h6>
//               <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-lg">No items in cart.</p>
//       )}

//       {cartItems.length > 0 && (
//         <div className="mt-5">
//           <h3 className="text-2xl font-bold text-center mb-4">Get a Quote</h3>
//           <form onSubmit={handleQuoteSubmit} className="space-y-4">
//             <div className="flex flex-col md:flex-row md:space-x-4">
//               <div className="flex-1">
//                 <label htmlFor="name" className="block text-sm font-medium">Name</label>
//                 <input
//                   id="name"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="flex-1">
//                 <label htmlFor="email" className="block text-sm font-medium">Email</label>
//                 <input
//                   id="email"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="message" className="block text-sm font-medium">Message</label>
//               <textarea
//                 id="message"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 rows="3"
//                 required
//               ></textarea>
//             </div>
//             <div className="text-center">
//               <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary dark:bg-blue-600">
//                 Submit Quote
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
import React, { useEffect, useState } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { realtimeDb } from '../../firebase';
import { FaStar } from 'react-icons/fa';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const cartRef = ref(realtimeDb, 'cart');
    const cartListener = onValue(cartRef, (snapshot) => {
      if (snapshot.exists()) {
        const cartData = snapshot.val();
        setCartItems(Object.values(cartData));
      } else {
        setCartItems([]);
      }
    });

    return () => cartListener(); // Clean up the listener on unmount
  }, []);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();

    try {
      const quoteRef = ref(realtimeDb, 'quotes');
      const newQuoteRef = push(quoteRef);
      await set(newQuoteRef, {
        name,
        email,
        message,
        cartItems,
        timestamp: new Date().toISOString(),
      });

      setName('');
      setEmail('');
      setMessage('');
      alert('Quote request submitted successfully!');
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('There was an error submitting your quote. Please try again later.');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white" id="cart">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <img src={item.img} alt={item.title} className="max-w-[140px] block mx-auto" />
              <h5 className="text-xl font-semibold">{item.title}</h5>
              <h6 className="text-lg text-gray-600 mb-2">₹{item.price}</h6>
              <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
              <div className="flex items-center justify-center gap-1">
                {/* Display stars based on item rating */}
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className={index < item.rating ? "text-yellow-500" : "text-gray-400"} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No items in cart.</p>
      )}

      {cartItems.length > 0 && (
        <div className="mt-5">
          <h3 className="text-2xl font-bold text-center mb-4">Get a Quote</h3>
          <form onSubmit={handleQuoteSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  id="name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  id="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea
                id="message"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
