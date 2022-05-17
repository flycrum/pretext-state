import React, { useRef } from 'react';

export function RenderCounter() {
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;

  return (
    <div
      style={{
        background: 'lightgray',
        color: 'gray',
        fontSize: '12px',
        position: 'absolute',
        right: 0,
        padding: '0 3px',
      }}
    >
      renders:
      {renderCounter.current}
    </div>
  );
}
