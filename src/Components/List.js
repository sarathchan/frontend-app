import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import { Button } from 'antd';
import './List.css'
import { BaseUrl } from '../Constat';

const SortableList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get(`${BaseUrl}sortable-list`)
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  };

  const handleDrag = (index, newPosition) => {
    const newItems = [...items];
    const draggedItem = newItems[index];

    newItems.splice(index, 1); // Remove the dragged item from its original position
    newItems.splice(newPosition, 0, draggedItem); // Insert the dragged item at the new position

    setItems(newItems);

    // Update the order in the API
    axios.put(`${BaseUrl}sortable-list`, newItems)
      .then(response => console.log('Order updated successfully:', response))
      .catch(error => console.error('Error updating order:', error));
  };

  return (
    <div className='sortable-main' style={{  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
      {items.map((item, index) => (
        <Draggable key={item.id} onStop={(e, data) => handleDrag(index, Math.round(data.y / 50))}>
          <Button  style={{ padding: '10px', marginBottom: '10px', cursor: 'move' }}>
            {item.content}
          </Button>
        </Draggable>
      ))}
    </div>
  );
};

export default SortableList;
