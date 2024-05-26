import React, { useState , useEffect} from 'react';
import axios from 'axios';
import ManageAccount from '../components/ManageAccount';
import ListRecommendation from '../components/ListRecommendation';
import CreateWishList from '../components/CreateWishList';
import Logo from '../components/logoson1.png'; // Logomuz

function UserDashboard() {
    const [userData, setUserData] = useState({});
    const [selectedComponent, setSelectedComponent] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/customer/${JSON.parse(localStorage.getItem("data")).id}`); // 1 yerine dinamik olarak kullanıcı id'sini alabilirsiniz
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    if (localStorage.getItem("usertype")!="customer"){
        return (
            <div>
                <h1 className='font-semibold'>You cant access this page.</h1>
            </div>
        )
    }
    return (
        <div className="flex h-[100vh]">
            <img src={Logo} alt="Logo" className="logo" />

           <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
                <div className="p-4 flex items-center">
                    {userData.profilePicture && (
                        <img src={`data:image/jpg;base64,${userData.profilePicture}`} alt="User Profile" className="userIcon w-10 h-10 rounded-full mr-2" />
                    )}
                    <p className="username text-lg font-semibold">{userData.name}</p>
                </div>

            <nav className="p-4">
                <ul >
                    <li >
                        <button className="block py-2 px-4 text-sm hover:underline underline-offset-4 rounded-full duration-300" onClick={() => setSelectedComponent('manage_account')}>
                            Manage your account
                        </button>
                    </li>
                    
                    <li >
                        <button className="block py-2 px-4 text-sm hover:underline underline-offset-4 rounded-full duration-300" onClick={() => setSelectedComponent('list_recommendation')}>
                            List the recommendations
                        </button>
                    </li>
                    <li>
                        <button className="block py-2 px-4 text-sm hover:underline underline-offset-4 rounded-full duration-300" onClick={() => setSelectedComponent('create_wishlist')}>
                            List your wishlist
                        </button>
                    </li>
                </ul>
            </nav>
            </aside>

            <div className="selected-component col-span-2">
                {selectedComponent === 'manage_account' && <ManageAccount type="customer"/>}

                {selectedComponent === 'list_recommendation' && <ListRecommendation />}
                {selectedComponent === 'create_wishlist' && <CreateWishList />}
            </div>
        </div>
    );
}

export default UserDashboard;
