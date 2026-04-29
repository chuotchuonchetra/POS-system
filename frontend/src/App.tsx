
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/MainLayout'
import { CashierPage } from './components/pages/Cashier'
import { OrderPage } from './components/pages/Orders'
import ProductPage from './components/pages/Product'
import Login from './components/Login'

function App() {
  

  return (
    <BrowserRouter>
      <Routes >
        <Route path='login' element={<Login/>}/>
        <Route path='/' element={<MainLayout/>}>
          <Route path='cashier' element={<CashierPage/>}/>
          <Route path='products' element={<ProductPage/>}/>
          <Route path='order' element={<OrderPage/>}/>
        </Route>
        

      </Routes>
    </BrowserRouter>
  )
}

export default App
