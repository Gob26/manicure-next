// src/components/ExampleComponent.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { increment } from '../../store/testSlice';

const ExampleComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.test.count);

  return (
    <div style={{ padding: '20px', border: '1px solid gray', margin: '20px' }}>
      <h2>Тестовый компонент</h2>
      <p>Счетчик: {count}</p>
      <button onClick={() => dispatch(increment())}>Увеличить</button>
    </div>
  );
};

export default ExampleComponent;
