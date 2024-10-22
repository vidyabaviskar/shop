import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { realtimeDb } from '../../../firebase';

const AddProduct = ({ setSuccessMessage, setErrorMessage }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    category: '',
    colors: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const storage = getStorage();
    const newProductRef = push(ref(realtimeDb, 'products')); 

    try {
      let imageURL = '';


      if (product.image) {
        const imageRef = storageRef(storage, `images/${product.image.name}`);
        await uploadBytes(imageRef, product.image);
        imageURL = await getDownloadURL(imageRef);
      }

  
      await set(newProductRef, {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        colors: product.colors.split(',').map(color => color.trim()),
        imageURL: imageURL,
      });

      setProduct({
        name: '',
        description: '',
        price: '',
        image: null,
        category: '',
        colors: ''
      });

      setSuccessMessage('Product added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage('Failed to add product. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8" id="add">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h1>
      <form onSubmit={handleFormSubmit}>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Enter product price"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          >
            <option value="">Select category</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Electronics">Electronics</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Available Colors */}
        <div className="mb-4">
          <label htmlFor="colors" className="block text-gray-700 font-semibold mb-2">Available Colors</label>
          <input
            type="text"
            id="colors"
            name="colors"
            value={product.colors}
            onChange={handleInputChange}
            placeholder="Enter available colors (comma separated)"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition duration-200">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
