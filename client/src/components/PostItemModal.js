import React, { useState } from 'react';
import api from '../services/api';

const PostItemModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', { title, description, price, images });
      onClose();
    } catch (error) {
      console.error('Error posting item:', error);
    }
  };

  return (
    <div className="post-item-modal">
      <h2>Post New Item</h2>
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

export default PostItemModal;