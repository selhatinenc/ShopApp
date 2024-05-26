import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModeratorManagement() {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [moderators, setModerators] = useState([]);
    const [newModerator, setNewModerator] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        gender: '',
        phoneNumber: '',
        profilePicture: "s",
    });

    useEffect(() => {
        getAllModerators();
    }, []);

    const getAllModerators = async () => {
        try {
            const response = await axios.get('http://localhost:8081/moderator/all');
            setModerators(response.data);
        } catch (error) {
            console.error('Error fetching moderators:', error);
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

    const handleCreateModerator = async () => {
        const { name, username, email, password, gender, phoneNumber, profilePicture } = newModerator;
        const emptyFields = [];

        if (!name) emptyFields.push('Name');
        if (!username) emptyFields.push('Username');
        if (!email) emptyFields.push('Email');
        if (!password) emptyFields.push('Password');
        if (!gender) emptyFields.push('Gender');
        if (!phoneNumber) emptyFields.push('Phone Number');
        if (!profilePicture) emptyFields.push('Profile Picture');

        if (emptyFields.length > 0) {
            alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
            return;
        }

        try {
            const data = {
                name,
                username,
                email,
                password,
                gender,
                phoneNumber,
                profilePicture: image ? await convertToBase64(image) : null
            };

            await axios.post('http://localhost:8081/moderator', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            setNewModerator({
                name: '',
                username: '',
                email: '',
                password: '',
                gender: '',
                phoneNumber: '',
                profilePicture: "sd"
            });
            setImage(null);
            getAllModerators();
        } catch (error) {
            console.error('Error creating moderator:', error);
        }
    };

    const handleDeleteModerator = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/moderator/${id}`);
            getAllModerators();
        } catch (error) {
            console.error('Error deleting moderator:', error);
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(selectedImage);
            setPreviewImage(URL.createObjectURL(selectedImage));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-4">Moderator Management</h1>
            
            <div className="w-full max-w-md">
                <div className="flex flex-col mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newModerator.name}
                        onChange={(e) => setNewModerator({ ...newModerator, name: e.target.value })}
                        className="border border-gray-300 px-4 py-2 rounded mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={newModerator.username}
                        onChange={(e) => setNewModerator({ ...newModerator, username: e.target.value })}
                        className="border border-gray-300 px-4 py-2 rounded mb-2"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newModerator.email}
                        onChange={(e) => setNewModerator({ ...newModerator, email: e.target.value })}
                        className="border border-gray-300 px-4 py-2 rounded mb-2"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newModerator.password}
                        onChange={(e) => setNewModerator({ ...newModerator, password: e.target.value })}
                        className="border border-gray-300 px-4 py-2 rounded mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Gender"
                        value={newModerator.gender}
                        onChange={(e) => setNewModerator({ ...newModerator, gender: e.target.value })}
                        className="border border-gray-300 px-4 py-2 rounded mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={newModerator.phoneNumber}
                        onChange={(e) => setNewModerator({ ...newModerator, phoneNumber: e.target.value })}
                        className="border border-gray-300 px-4 py-2 rounded mb-2"
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="border border-gray-300 px-4 py-2 rounded mb-2"
                    />
                    {previewImage && <img src={previewImage} alt="Preview" className="max-w-full h-auto mb-2" />}
                    <button onClick={handleCreateModerator} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create Moderator</button>
                </div>
            </div>
            
            <ul className="w-full max-w-md">
                {moderators.map(moderator => (
                    <li key={moderator.id} className="flex justify-between items-center py-2 border-b">
                        <span>{moderator.name}</span>
                        <button onClick={() => handleDeleteModerator(moderator.id)} className="text-red-600 cursor-pointer">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ModeratorManagement;
