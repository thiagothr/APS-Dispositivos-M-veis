import React, { useState } from 'https://esm.sh/react';
import ReactDOM from 'https://esm.sh/react-dom';

// Lista inicial de produtos disponíveis
const initialProducts = [
  { id: 1, name: 'Curso Python do Sergio Monteiro', price: 500 },
  { id: 2, name: 'Curso de IA com Prof. Daisy', price: 200 },
  { id: 3, name: 'Curso Otimização de Sistemas Sergio Monteiro', price: 300 }
];

function App() {
  // Estado do carrinho de compras
  const [cart, setCart] = useState([]);

  // Função para adicionar produtos ao carrinho
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Atualiza a quantidade do produto existente no carrinho
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Adiciona o novo produto ao carrinho
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Função para remover produtos do carrinho
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Função para atualizar a quantidade de produtos no carrinho
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Calcula o total do carrinho
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1>
        <img src="https://www.unicarioca.edu.br/images/identidade/unicarioca.jpg" alt="Unicarioca" style={{ height: '40px', marginRight: '10px' }} />
        Cursos Unicarioca
      </h1>
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

// Renderiza o componente App no elemento root do HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
