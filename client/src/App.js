import React from 'react'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Success from './pages/Success'
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux'


const App = () => {

  const user = useSelector(state=>state.user.currentUser)

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/products/:category" element={<ProductList/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/product/:id" element={<Product/>}/>


         {/* Protected Route: Only accessible if user is logged in */}
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" replace />}
        />

         {/* Conditional Route: Only accessible if user is not logged in */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

         {/* Conditional Route: Only accessible if user is not logged in */}
         <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
        
        <Route path="/success" element={<Success/>}/>
      </Routes>
    </Router>
  )
}

export default App
