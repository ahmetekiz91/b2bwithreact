import { useEffect } from 'react';
import { Route, Routes, Navigate  } from 'react-router-dom';
import HomePage from './Pages/Home';
import UserPage from './Pages/Users/UserPage';
import Datatable from './Pages/Users/Datatable';
import CategoryPage from './Pages/Category/CategoryPage';
import Customer from './Pages/Customer/CustomerPage';
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLayout from './layouts/AppLayout';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import ProductPage from './Pages/Product/ProductPage';
import Orders from './Pages/Orders/Orders';
import { CountProvider } from './Pages/Orders/CountContext';
import Login from './Login';
import PrivateRoute from './auth/PrivateRoute';
import Logout from './auth/logout';
import ShoppingCart from "./Pages/Basket/ShoppingCart";
import Payment from './Pages/Payment/Payment';
// Function to check authentication asynchronously


function App() {
  return (
    <div>
      <CountProvider>
        <AppLayout>
   
          <Routes>
           <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="/users" element={<PrivateRoute />}>
              <Route index element={<UserPage />} />
            </Route>
            <Route path="/customer" element={<PrivateRoute />}>
              <Route index element={<Customer />} />
            </Route>
            <Route path="/product" element={<PrivateRoute />}>
              <Route index element={<ProductPage />} />
            </Route>
            <Route path="/order" element={<PrivateRoute />}>
              <Route index element={<Orders />} />
            </Route>
            <Route path="/shoppingcart" element={<PrivateRoute />}>
              <Route index element={<ShoppingCart />} />
            </Route>
            <Route path="/category" element={<PrivateRoute />}>
              <Route index element={<CategoryPage />} />
            </Route>
            <Route path="/Payment" element={<PrivateRoute />}>
              <Route index element={<Payment />} />
            </Route>
          </Routes>
        </AppLayout>
      </CountProvider>
    </div>
  );
}
export default App;