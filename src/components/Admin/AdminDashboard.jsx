import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import AddProduct from "./Products/AddProduct";
import EditProduct from "./Products/EditProduct";
import DeleteProduct from "./Products/DeleteProduct";
import Users from './Users';
import Cart from './DisplayCart';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          </li>
          <li>
            <span className="block font-semibold">Products</span>
            <ul className="ml-4 space-y-2">
              <li><Link to="/add" className="hover:text-gray-300">Add Product</Link></li>
              <li><Link to="/edit" className="hover:text-gray-300">Edit Product</Link></li>
              <li><Link to="/delete" className="hover:text-gray-300">Delete Product</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/users" className="hover:text-gray-300">Users</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-gray-300">Cart</Link>
          </li>
        </ul>
      </nav>

      {/* Main content area */}
      <div className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit" element={<EditProduct />} />
          <Route path="/delete" element={<DeleteProduct />} />
          <Route path="/users" element={<Users />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
