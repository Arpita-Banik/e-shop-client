import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import AddProduct from './Pages/AddProduct/AddProduct';
import AddReview from './Pages/DashBoard/AddReview/AddReview';
import Dashboard from './Pages/DashBoard/DashBoard/Dashboard';
import DashboardHome from './Pages/DashBoard/DashboardHome/DashboardHome';
import MakeAdmin from './Pages/DashBoard/MakeAdmin/MakeAdmin';
import ManageOrders from './Pages/DashBoard/ManageOrders/ManageOrders';
import ManageProducts from './Pages/DashBoard/ManageProducts/ManageProducts';
import MyOrders from './Pages/DashBoard/Orders/MyOrders';
import About from './Pages/Home/About/About';
import AllProducts from './Pages/Home/AllProducts/AllProducts';
import Home from './Pages/Home/Home/Home';
import Items from './Pages/Home/Items/Item';
import NotFound from './Pages/Home/NotFound/NotFound';
import Reviews from './Pages/Home/Reviews/Reviews';
import Login from './Pages/Login/Login/Login';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Register from './Pages/Login/Register/Register';
import BookingOrder from './Pages/Order/BookingOrder/BookingOrder';
import OrderDetails from './Pages/Order/OrderDetails/OrderDetails';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Products from './Pages/Products/Products';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Fragment>
            <Header />
            <Routes>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/allProducts" element={<PrivateRoute><AllProducts /></PrivateRoute>}></Route>
              <Route path="/items" element={<Items />}></Route>
              <Route path="/details/:productId" element={<ProductDetails />}></Route>
              <Route path="/booking" element={<PrivateRoute><BookingOrder /></PrivateRoute>}></Route>
              <Route path="/orderDetails" element={<PrivateRoute><OrderDetails /></PrivateRoute>}></Route>

              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                <Route exact path="/dashboard" element={<DashboardHome />}>
                </Route>

                <Route path={`/dashboard/addProduct`} element={<AddProduct />}>
                </Route>

                <Route path={`/dashboard/myOrders`} element={<MyOrders />}>
                </Route>

                <Route path={`/dashboard/manageProducts`} element={<ManageProducts />}>
                </Route>

                <Route path={`/dashboard/manageOrders`} element={<ManageOrders />}>
                </Route>

                <Route path={`/dashboard/makeAdmin`} element={<MakeAdmin />}>
                </Route>
                
                <Route path={`/dashboard/addReview`} element={<AddReview />}>
                </Route>
              </Route>
              <Route exact path="/reviews" element={<Reviews />}></Route>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path='*' element={<NotFound />}></Route>
            </Routes>
          </Fragment>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
