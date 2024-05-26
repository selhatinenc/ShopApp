// DeleteProduct.js
import React from 'react';
import axios from 'axios';

const DeleteProduct = ({ product, onClose, onDelete }) => {
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/product/${product.id}`);
            console.log('Product deleted successfully:', response.data);
            onDelete(product.id); // Delete işlemi başarılı olduğunda bu fonksiyon çağrılacak
            onClose();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product: ' + error.message);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
                <p>Are you sure you want to delete {product.name}?</p>
                <div className="mt-4 flex justify-center">
                    <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2">Delete</button>
                    <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteProduct;
