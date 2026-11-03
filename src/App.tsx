import CartProvider from './context/CartContext'
import './App.css'
import Products from './components/Products'
import Header from './components/Header'

function App() {


  return (
    <CartProvider>
      <Header />
      <Products />
    </CartProvider>
  )
}

export default App
