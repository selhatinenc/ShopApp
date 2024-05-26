import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');
    const [selectedParentCategory, setSelectedParentCategory] = useState('');
    const [showDeleteButton, setShowDeleteButton] = useState(false); // Silme butonunu göstermek için bir durum ekledik

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/category/all');
            setCategories(response.data);
            setShowDeleteButton(response.data.length > 0); // Kategori varsa silme butonunu göster
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleNewCategorySubmit = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) {
            alert('Please enter a category name.');
            return;
        }
        try {
            await axios.post('http://localhost:8080/category', { name: newCategory });
            setNewCategory('');
            
            fetchCategories();
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleNewSubCategorySubmit = async (e) => {
        e.preventDefault();
        if (!newSubCategory.trim() || !selectedParentCategory.trim()) {
            alert('Please select a parent category and enter a subcategory name.');
            return;
        }
        try {
            await axios.post('http://localhost:8080/category', { parentName: selectedParentCategory, name: newSubCategory });
            setNewSubCategory('');
            fetchCategories();
        } catch (error) {
            console.error('Error creating subcategory:', error);
        }
    };

    const handleDeleteCategory = async (categoryName) => {
        try {
            await axios.delete("http://localhost:8080/category/${categoryName}");
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-6 text-center">Category Management</h1>

            <div className="flex flex-col gap-8 items-center justify-center w-full">
                <div className="w-full max-w-md">
                    <ul className="divide-y divide-gray-200">
                        {categories.map(category => (
                            <li key={category.name} className="py-2 flex items-center justify-between">
                                <span>{category.name}</span>
                                {showDeleteButton && ( // Silme butonunu sadece showDeleteButton true olduğunda göster
                                    <button onClick={() => handleDeleteCategory(category.name)} className="text-red-600 hover:text-red-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M14 5a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1h8zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 5a1 1 0 00-1 1 1 1 0 001 1h4a1 1 0 100-2H8z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full max-w-md">
                    <form onSubmit={handleNewCategorySubmit} className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
                        <input
                            type="text"
                            placeholder="Enter new category name"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="border border-gray-300 px-4 py-2 rounded mb-2 w-full"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                        >
                            Add Category
                        </button>
                    </form>

                    {categories.length > 0 && ( // Eğer kategori varsa alt kategori ekleme formunu göster
                        <form onSubmit={handleNewSubCategorySubmit}>
                            <h2 className="text-xl font-semibold mb-4">Add New Subcategory</h2>
                            <select
                                value={selectedParentCategory}
                                onChange={(e) => setSelectedParentCategory(e.target.value)}
                                className="border border-gray-300 px-4 py-2 rounded mb-2 w-full"
                            >
                                <option value="" disabled>Select Parent Category</option>
                                {categories.map(category => (
                                    <option key={category.name} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Enter new subcategory name"
                                value={newSubCategory}
                                onChange={(e) => setNewSubCategory(e.target.value)}
                                className="border border-gray-300 px-4 py-2 rounded mb-2 w-full"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                            >
                                Add Subcategory
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryManagement;