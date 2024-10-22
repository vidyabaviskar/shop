import React, { useState, useEffect } from 'react';
import { getDatabase, ref, update, remove, get } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditProduct = ({ setSuccessMessage, setErrorMessage }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    category: '',
    colors: '',
    imageURL: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getDatabase();
      const productsRef = ref(db, 'products');
      const snapshot = await get(productsRef);
      const productsList = [];

      snapshot.forEach((childSnapshot) => {
        productsList.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });

      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      const selectedProduct = products.find(product => product.id === selectedProductId);
      if (selectedProduct) {
        setProduct({ ...selectedProduct, image: null });
      }
    }
  }, [selectedProductId, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();

    if (!selectedProductId) {
      setErrorMessage('Please select a product to update.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    const db = getDatabase();
    const storage = getStorage();
    const productRef = ref(db, `products/${selectedProductId}`);

    try {
      let imageURL = product.imageURL;

      if (product.image) {
        const imageRef = storageRef(storage, `images/${product.image.name}`);
        await uploadBytes(imageRef, product.image);
        imageURL = await getDownloadURL(imageRef);
      }

      const colorsArray = Array.isArray(product.colors)
        ? product.colors
        : typeof product.colors === 'string'
          ? product.colors.split(',').map(color => color.trim())
          : [];

      const updatedProduct = {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        colors: colorsArray,
        imageURL
      };

      await update(productRef, updatedProduct);

      setSuccessMessage('Product updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setSelectedProductId('');
      setProduct({
        name: '',
        description: '',
        price: '',
        image: null,
        category: '',
        colors: '',
        imageURL: ''
      });

    } catch (error) {
      console.error("Error updating product:", error);
      setErrorMessage('Failed to update product. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProductId) {
      setErrorMessage('Please select a product to delete.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    const db = getDatabase();
    const productRef = ref(db, `products/${selectedProductId}`);

    try {
      await remove(productRef);
      const updatedProducts = products.filter(product => product.id !== selectedProductId);
      setProducts(updatedProducts);
      setSelectedProductId('');
      setProduct({
        name: '',
        description: '',
        price: '',
        image: null,
        category: '',
        colors: '',
        imageURL: ''
      });
      setSuccessMessage('Product deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage('Failed to delete product. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <form className="border p-4 shadow-sm bg-white dark:bg-gray-800 rounded">
      <div className="mb-4">
        <label htmlFor="productSelect" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Select Product
        </label>
        <select
          id="productSelect"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-300"
        >
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>

      {selectedProductId && (
        <>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter description"
            />
          </div>


          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter product price"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter product category"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="colors" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Colors (comma-separated)
            </label>
            <input
              type="text"
              id="colors"
              name="colors"
              value={product.colors}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Enter product colors"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleEditProduct}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={handleDeleteProduct}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md"
            >
              Delete Product
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default EditProduct;
