import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommunityManagement from '../components/CommunityManagement'
import MessageManagement from '../components/MessageManagement'
import NotificationManagement from '../components/NotificationManagement'
import ModeratorManagement from '../components/UpdateModerator';
import Logo from '../components/logoson1.png'; // Logomuz

function ModeratorDashboard() {
    const [moderatorData, setModeratorData] = useState({});
    const [selectedComponent, setSelectedComponent] = useState(null);

    useEffect(() => {
        fetchModeratorData();
    }, []);

    const fetchModeratorData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/moderator/${JSON.parse(localStorage.getItem("data")).id}`); // Moderator id'sini dinamik olarak alabilirsiniz
            setModeratorData(response.data);
        } catch (error) {
            console.error('Moderator verileri alınırken hata oluştu:', error);
        }
    };
    if (localStorage.getItem("usertype")!="moderator"){
        return (
            <div>
                <h1 className='font-semibold'>You cant access this page.</h1>
            </div>
        )
    }
    return (
        <div className="flex h-screen">
            <img src={Logo} alt="Logo" className="logo" />

            <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
                <div className="p-4 flex items-center">
                    {moderatorData.profile_picture && (
                        <img src={`data:image/jpg;base64,${moderatorData.profile_picture}`} alt="Moderator Profile" className="userIcon w-10 h-10 rounded-full mr-2" />
                    )}
                    <p className="username text-lg font-semibold">{moderatorData.name}</p>
                </div>
                <nav className="p-4">
                    <ul>
                        <li>
                            <button className="block py-2 px-4 text-sm hover:underline underline-offset-4 rounded-full duration-300" onClick={() => setSelectedComponent('moderator')}>
                                Manage Your Account
                            </button>
                        </li>
                        <li>
                            <button className="block py-2 px-4 text-sm hover:underline underline-offset-4 rounded-full duration-300" onClick={() => setSelectedComponent('communities')}>
                                Communities
                            </button>
                        </li>
                        <li>
                            <button className="block py-2 px-4 text-sm hover:underline underline-offset-4 rounded-full duration-300" onClick={() => setSelectedComponent('notifications')}>
                                Notifications
                            </button>
                        </li>
                        <li>
                            <button className="block py-2 px-4 text-sm hover:underline underline-offset-4 rounded-full duration-300" onClick={() => setSelectedComponent('messages')}>
                                Messages
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            <div className="selected-component col-span-2">
                {selectedComponent === 'communities' && <CommunityManagement />}
                {selectedComponent === 'moderator' && <ModeratorManagement />}
                {selectedComponent === 'notifications' && <NotificationManagement />}
                {selectedComponent === 'messages' && <MessageManagement />}
            </div>
        </div>

    );
}

export default ModeratorDashboard;
