import React, { useState } from 'https://esm.sh/react';
import ReactDOM from 'https://esm.sh/react-dom';

const initialProducts = [
  { id: 1, name: 'Curso Python do Sergio Monteiro', price: 100 },
  { id: 2, name: 'Curso de IA com Prof. Daisy', price: 200 },
  { id: 3, name: 'Curso Otimização de Sistemas Sergio Monteiro', price: 300 }
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1>Cursos Unicarioca</h1>
      <h2>Cursos Disponíveis</h2>
      <ul>
        {initialProducts.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span> <span className="separator">-</span> <span>R$ {product.price}</span>{" "}
            <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
          </li>
        ))}
      </ul>

      <h2>Seu Carrinho</h2>
      {cart.length === 0 ? (
        <div>
          <p className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            O carrinho está vazio
          </p>
        </div>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span> <span className="separator">-</span> <span>R$ {item.price}</span> x {item.quantity}{" "}
              <button onClick={() => removeFromCart(item.id)}>Remover</button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              />
            </li>
          ))}
        </ul>
      )}
      <h3>
        <span className="cart-icon">🛒</span>Total: R$ {total}
      </h3>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
