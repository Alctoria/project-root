import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const PostItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/marketplace');
    } catch (error) {
      console.error('Error posting item:', error);
    }
  };

  return (
    <div className="post-item">
      <h1>Post New Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
        />
        <button type="submit">Post Item</button>
      </form>
    </div>
  );
};

export default PostItem;