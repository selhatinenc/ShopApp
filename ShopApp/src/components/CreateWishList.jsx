import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateWishlist() {
    const [wishlistName, setWishlistName] = useState('');
    const [wishList, setWishList] = useState([]);
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showDeleteButton, setShowDeleteButton] = useState(false); // Silme butonunu göstermek için bir durum ekledik

    useEffect(() => {
        fetchWishList();
    }, []);

    const fetchWishList = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/wishList/?id=${JSON.parse(localStorage.getItem("data")).id}`);
            const products = response.data.products; // Ensure this is the correct path to products in your response
            setWishList(products);
            setShowDeleteButton(products.length > 0); // Kategori varsa silme butonunu göster
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };
    const handleDeleteFromWishList = async (productId) => {
        const customerId = JSON.parse(localStorage.getItem("data")).id;
        try {
          await axios.put(`http://localhost:8080/wishList/dissociate?customerId=${customerId}&prouctId=${productId}`);
          alert('Item deleted from wishlist successfully!');
          setWishList(prevWishList => prevWishList.filter(item => item.id !== productId));
          // Optionally, you can update the UI to reflect the deletion
        } catch (error) {
          console.error('Error deleting item from wishlist:', error);
          alert('Failed to delete item from wishlist. Please try again later.');
        }
    };    

    return (<div className="w-full max-w-md mx-auto">
    <ul className="divide-y divide-gray-200">
      {wishList.map(product => (
        <li key={product.name} className="py-3 flex items-center justify-between">
          <span className="text-gray-900">{product.name}</span>
          {showDeleteButton && (
            <button
              onClick={() => handleDeleteFromWishList(product.id)}
              className="text-red-600 hover:text-red-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14 5a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1h8zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 5a1 1 0 00-1 1 1 1 0 001 1h4a1 1 0 100-2H8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
  
    );
}

export default CreateWishlist;
