// SearchNode.js
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const SearchNode = memo(({ data, isConnectable }) => {
  const handleSearchChange = (event) => {
    console.log("Search Query:", event.target.value);
    // Implement your search logic or pass the query up to the parent component
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <div className="react-flow__node-default" style={{ 
          border: '1px solid #777', 
          borderRadius: '10px', // Adjusted for a more pronounced curve
          padding: '10px', 
          background: 'orange', 
          height: '38px', // Ensures the input takes up the full height of the node
          overflow: 'hidden' // Ensures background doesn't peek out from corners
        }}>
        <input
          type="search"
          placeholder="Search..."
          onChange={handleSearchChange}
          className="nodrag" // Prevents drag action when interacting with the input
          style={{ 
            width: '100%', 
            marginTop: '5px', 
            background: '#ff8c00', // Slightly darker orange
            border: 'none', 
            borderRadius: '5px', // Rounded corners for the input
            padding: '5px', // Padding inside the input for text
            outline: 'none' // Removes the blue highlight border when clicked
          }}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  );
});

export default SearchNode;
