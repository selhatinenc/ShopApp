import React, { useState } from 'react';
import axios from 'axios';

const EditProduct = ({ product, onClose }) => {
    const [editedProduct, setEditedProduct] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = {
                id: product.id,
                name: editedProduct.name || product.name,
                description: editedProduct.description || product.description,
                merchantId:0,
                image: product.image,
                price: editedProduct.price || product.price,
                stock: editedProduct.stock || product.stock,
               
            };

            const response = await axios.put(`http://localhost:8080/product/${product.id}`, updatedProduct);
            setMessage('Product updated successfully!');
            console.log('Product updated successfully:', response.data);
            setTimeout(() => {
                setMessage('');
                onClose();
            }, 2000); // Delay closing to show success message
        } catch (error) {
            setMessage('Error updating product.');
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" value={editedProduct.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" name="description" value={editedProduct.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input type="number" id="price" name="price" value={editedProduct.price} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                        <input type="number" id="stock" name="stock" value={editedProduct.stock} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    
                    {message && <div className="mb-4 text-red-500">{message}</div>}
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ml-2">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
