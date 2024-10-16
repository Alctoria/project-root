import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Map from '../components/Map';
import ProductCard from '../components/ProductCard';
import SearchCollege from '../components/SearchCollege';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [college, setCollege] = useState('');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [distance, setDistance] = useState(10);

  useEffect(() => {
    if (college && location.lat && location.lng) {
      fetchProducts();
    }
  }, [college, location, distance]);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products', {
        params: {
          college,
          lat: location.lat,
          lng: location.lng,
          distance
        }
      });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCollegeSelect = (selectedCollege) => {
    setCollege(selectedCollege.name);
    setLocation({
      lat: selectedCollege.geometry.location.lat(),
      lng: selectedCollege.geometry.location.lng()
    });
  };

  return (
    <div className="marketplace">
      <SearchCollege onSelect={handleCollegeSelect} />
      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="Search distance (miles)"
      />
      <Map products={products} center={location} />
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;