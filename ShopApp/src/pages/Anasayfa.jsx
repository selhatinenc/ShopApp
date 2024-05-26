import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from "../components/Search";
import { json, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../components/logoson1.png'; // Logomuz

function Main() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [productsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    filterProducts(searchQuery, categoryFilter, priceFilter);
  }, [searchQuery, categoryFilter, priceFilter, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/all/pages?page=${currentPage}&size=${productsPerPage}`);
      setProducts(response.data.content);
      setFilteredProducts(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleProductClick = async (customerId,productId) => {
    try {
      // Make a backend call
      await axios.post('http://localhost:8080/product/interact?customerId='
      +customerId+"&productId="+productId);

      // Navigate to the product page
      navigate(`/product/${productId}`);
    } catch (error) {
      console.error('Error making backend call', error);
      // Handle error appropriately, e.g., show a notification to the user
    }
  };

  const handleAssignWishList = async (productId) => {
    const customerId = JSON.parse(localStorage.getItem("data")).id;
    try {
      await axios.put(`http://localhost:8080/wishList/assign?customerId=${customerId}&productId=${productId}`);
      alert('Product assigned to wishlist successfully!');
    } catch (error) {
      console.error('Error assigning product to wishlist:', error);
      alert('Failed to assign product to wishlist. Please try again later.');
    }

  };
  

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryFilterChange = (category) => {
    setCategoryFilter(category);
  };

  const handlePriceFilterChange = (price) => {
    setPriceFilter(price);
  };

  const filterProducts = (searchQuery, category, price) => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (category) {
      filtered = filtered.filter(product => product.categoryName.toLowerCase() === category.toLowerCase());
    }

    if (price) {
      const [minPrice, maxPrice] = price.split('-');
      filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    setFilteredProducts(filtered);
  };

  const handleDashboardRedirect = () => {
    let userType = localStorage.getItem("usertype");
    if (userType === 'admin') {
      navigate('/admindashboard');
    } else if (userType === 'customer') {
      navigate('/userdashboard');
    } else if (userType === 'merchant') {
      navigate('/merchantdashboard');
    }else if (userType === 'moderator') {
      navigate('/moderatordashboard');
    }
  };

  const handleCommunityRedirect = () => {
    navigate('/community');
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">

    
    <div className="w-64 bg-gray-800 text-white h-[1200px] p-4">
        <h2 className="text-xl mb-4"></h2>
        <button className="w-full bg-purple-500 text-white p-2 rounded-md mb-4" onClick={handleDashboardRedirect}>Dashboard</button>
        {/* Community butonu */}
        <button className="w-full bg-purple-500 text-white p-2 rounded-md mb-4" onClick={handleCommunityRedirect}>Community</button>
        {/* Burada yan çubuğa içerik ekleyebilirsiniz */}
      </div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl mb-4">ShopApp</h1>
                           <img src={Logo} alt="Logo" className="logo" />
                           
      
      <Search onSearch={handleSearch} />
      <div className="flex mb-4">
        <select onChange={(e) => handleCategoryFilterChange(e.target.value)} className="mr-4 p-2 border border-gray-300 rounded-md">
          <option value="">All Categories</option>
          <option value="deneme">Deneme</option>
        </select>
        <select onChange={(e) => handlePriceFilterChange(e.target.value)} className="p-2 border border-gray-300 rounded-md">
          <option value="">All Prices</option>
          <option value="0-20">$0 - $20</option>
          <option value="21-50">$21 - $50</option>
          <option value="51-100">$51 - $100</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredProducts.map(product => (
    <div key={product.id} className="border border-gray-300 rounded-md p-4 cursor-pointer" >
      <div className='flex flex-row justify-between'>
        <div>
          <h3 className="text-xl font-bold">{product.name}</h3>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-gray-700">Price: {product.price} TL</p>
          <p className="text-gray-700">Category: {product.categoryName}</p>
          <p className="text-gray-700">Stock: {product.stock}</p>
          <p className="text-gray-700">Available: {product.available ? 'Yes' : 'No'}</p>
        </div>
        <button   onClick={() => handleAssignWishList(product.id)} className="flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a1.5 1.5 0 01-1.5-1.5H6a4 4 0 01-4-4V9a6 6 0 016-6 2 2 0 011 3.732A2 2 0 0114 9V12a4 4 0 01-4 4h-2.5A1.5 1.5 0 0110 18zm3.176-7.072A4 4 0 0010 8a4 4 0 00-3.176 1.568A2 2 0 014 9v4a2 2 0 002 2h8a2 2 0 002-2v-4a2 2 0 01-.824-1.072z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {product.image && (
        <img onClick={() => handleProductClick(JSON.parse(localStorage.getItem("data")).id, product.id)} src={`data:image/jpg;base64,${product.image}`} alt={product.name} className="mt-2 w-full max-h-48 max-w-48 object-contain" />
      )}
    </div>
  ))}
</div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handlePrevPage}
          className={`mx-1 px-3 py-1 rounded-md focus:outline-none ${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`mx-1 px-3 py-1 rounded-md focus:outline-none ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={`mx-1 px-3 py-1 rounded-md focus:outline-none ${currentPage === totalPages - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
}

export default Main;
