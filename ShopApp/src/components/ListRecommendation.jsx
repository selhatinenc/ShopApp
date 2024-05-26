import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListRecommendation() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {

            const response = await axios.get(`http://localhost:8080/product/recommendation?customerId=
            ${JSON.parse(localStorage.getItem("data")).id}`);
            setRecommendations(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching recommendations');
            setLoading(false);
            console.error('Error fetching recommendations:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-mono mb-4">List Recommendations</h2>
    <div className="border-b-4 border-gray-400 w-20 mx-auto mb-6"></div>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {recommendations.map(product => (
      <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img src={product.image || 'placeholder.jpg'} alt={product.name} className="w-full h-56 object-cover object-center" />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-900 font-bold text-lg mb-2">{product.price} TL</p>
          <p className="text-gray-600">Category: {product.category.name}</p>
        </div>
      </div>
    ))}
  </div>
</div>

    );
}

export default ListRecommendation;
