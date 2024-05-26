import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommunityManagement = () => {
    const [communities, setCommunities] = useState([]);
    const [newCommunity, setNewCommunity] = useState('');

    useEffect(() => {
        fetchCommunities();
    }, []);

    const fetchCommunities = async () => {
        try {
            const response = await axios.get('http://localhost:8080/community/all');
            setCommunities(response.data);
        } catch (error) {
            console.error('Error fetching communities:', error);
        }
    };

    const handleDeleteCommunity = async (name) => {
        try {
            await axios.delete("http://localhost:8080/community/${name}");
            fetchCommunities(); // Listeyi güncellemek için toplulukları yeniden getir
        } catch (error) {
            console.error('Error deleting community:', error);
        }
    };

    const handleNewCommunitySubmit = async (e) => {
        e.preventDefault();
        if (!newCommunity.trim()) {
            alert('Please enter a community name.');
            return;
        }
        try {
            await axios.post('http://localhost:8080/community', { name: newCommunity });
            setNewCommunity(''); // Yeni topluluk girişini sıfırla
            fetchCommunities(); // Listeyi güncellemek için toplulukları yeniden getir
        } catch (error) {
            console.error('Error creating community:', error);
        }
    };
    

    const nonEmptyCommunities = communities.filter(community => community.name.trim() !== ''); // Burada boş listelere ekranda göstermemek için güncelleme yaptım. Map işlemi mevcut.

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="container px-4 py-8 bg-white rounded-lg shadow-md max-w-lg">
                <h1 className="text-3xl font-semibold mb-4 text-center">Community Management</h1>

                {/* Mevcut toplulukları listele */}
                <ul className="mb-4">
                    {nonEmptyCommunities.map(community => (
                        <li key={community.name} className="flex justify-between items-center py-2 border-b">
                            <span>{community.name}</span>
                            <span
                                className="text-red-600 cursor-pointer"
                                onClick={() => handleDeleteCommunity(community.name)}
                            >
                                🗑
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Yeni topluluk ekleme formu */}
                <form onSubmit={handleNewCommunitySubmit} className="flex items-center w-full">
                    <input
                        type="text"
                        placeholder="Enter new community name"
                        value={newCommunity}
                        onChange={(e) => setNewCommunity(e.target.value)}
                        className="border border-gray-300 px-4 py-2 rounded-l w-full"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                    >
                        Add Community
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommunityManagement;