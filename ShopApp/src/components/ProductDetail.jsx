import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerId] = useState(1); // Hardcoded customerId, bu değeri dinamik hale getirebilirsiniz

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const handleInteract = async () => {
      try {
        console.log(customerId);
        await axios.post('http://localhost:8080/product/interact', null, {
          params: {
            customerId: customerId,
            productId: id,
          }
        });
      } catch (error) {
        console.error('Error interacting with product:', error);
        alert('Failed to interact with product.');
      }
    };

    if (product) {
      handleInteract();
    }
  }, [product, customerId, id]);

  if (loading) {
    return <div>Loading...</div>; // Ürün yüklenene kadar yükleme göstergesi göster
  }

  if (!product) {
    return <div>Error loading product</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate('/')} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Back to Main</button>
      <div className="border border-gray-300 rounded-md p-4 flex">
        <div className="flex-1 ml-80 mt-10">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-gray-700">Price: {product.price} TL</p>
          <p className="text-gray-700">Category: {product.categoryName}</p>
          <p className="text-gray-700">Stock: {product.stock}</p>
          <p className="text-gray-700">Available: {product.available ? 'Yes' : 'No'}</p>
        </div>
        <div className="mr-80">
          {product.image && (
            <img
              src={`data:image/jpg;base64,${product.image}`}
              alt={product.name}
              className="w-full max-w-xs object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
