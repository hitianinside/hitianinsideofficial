import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Routers from '../routes/Routers';
import Footer from '../components/Footer/Footer';
import { isAuthenticatedContext } from '../context/context';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';

function Layout() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user-info'));
    if (userData?.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate])

  return (
    <isAuthenticatedContext.Provider value={{ setIsAuthenticated, isAuthenticated }}>
      <div>
        <Header />
        <main>
          <Routers />
        </main>
        <Footer />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        transition={Bounce}
      />
    </isAuthenticatedContext.Provider>
  )
}

export default Layout;