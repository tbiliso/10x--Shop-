
import Header from './components/Header'
import CartProvider from './context/CartContext'
import './App.css'

function App() {


  return (
    <CartProvider>
      <Header />
    </CartProvider>
  )
}

export default App
