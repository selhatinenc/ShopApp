import React, { useState, useEffect } from 'react';

function AddProducts() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [stock, setStock] = useState(0);
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null); // State to store the image file
    const [previewImage, setPreviewImage] = useState(null); // State to store the preview of the selected image
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState({ type: '', content: '' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/category/all');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setErrorMessage('Failed to fetch categories');
            setMessage({ type: 'error', content: 'Failed to fetch categories' });
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(selectedImage);
            setPreviewImage(URL.createObjectURL(selectedImage));
        }
    };
    
    const validateForm = () => {
        // Check if name contains only letters, numbers, and hyphens and is not only numbers
        const nameRegex = /^(?!\d+$)[a-zA-Z0-9-]+$/;
        if (!nameRegex.test(name)) {
            setMessage({ type: 'error', content: 'Name should contain only letters, numbers, and hyphens and cannot be only numbers.' });
            return false;
        }

        // Check if description is at most 400 characters
        if (description.length > 400) {
            setMessage({ type: 'error', content: 'Description should be at most 400 characters long.' });
            return false;
        }

        // Check if price is a positive number with up to two decimal places
        const priceRegex = /^\d+(\.\d{1,2})?$/;
        if (!priceRegex.test(price) || price <= 0) {
            setMessage({ type: 'error', content: 'Price should be a positive number with up to two decimal places.' });
            return false;
        }

        // Check if stock is not negative
        if (stock < 0) {
            setMessage({ type: 'error', content: 'Stock cannot be negative.' });
            return false;
        }

        // Check if image is selected
        if (!image) {
            setMessage({ type: 'error', content: 'Image is required.' });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        try {
            const formData = {
                name,
                description,
                price,
                categoryName,
                merchantId: 1,
                stock,
                image: image ? await convertToBase64(image) : null
            };

            const response = await fetch('http://localhost:8080/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            setMessage({ type: 'success', content: 'Product added successfully' });

            setSuccessMessage('Product added successfully');
            setName('');
            setDescription('');
            setPrice(0);
            setCategoryName('');
            setStock(0);
            setImage(null);
            setPreviewImage(null);
        } catch (error) {
            console.error('Error adding product:', error);
            setErrorMessage('Failed to add product');
            setMessage({ type: 'error', content: 'Failed to add product' });

        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold mb-8">Add Products</h2>
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 p-2 border border-gray-300  rounded-md w-full" required />
                </div>
                <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                <select id="category" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                    <option value="">Select a category</option> {/* Boş option */}
                    {categories.map((category, index) => (
                        <option key={index} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>

                <div className="mb-4">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock:</label>
                    <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image:</label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    {previewImage && (
                        <img src={previewImage} alt="Product" className="mt-2 w-full max-h-40 object-contain" />
                    )}
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Product</button>
            </form>
            {message.type === 'success' && <div className="text-green-600 mt-4">{message.content}</div>}
            {message.type === 'error'  && <div className="text-red-600 mt-4">{message.content}</div>}
        </div>
    );
}

export default AddProducts;
