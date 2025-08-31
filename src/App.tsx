import './App.css'
import Layout from './components/layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/Products';
import DashboardPage from './pages/Dashboard';
import LocalsPage from './pages/Locals';
import StockLocalPage from './pages/StockLocal';
  import { ToastContainer } from 'react-toastify';



function App() {

  return (
    <>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path='/locals' element={<LocalsPage />} />
          <Route path='/stocklocal' element={<StockLocalPage />} />
        </Routes>
      </Layout>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App
