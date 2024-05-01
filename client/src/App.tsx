import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login';
import PrivateRoutes from './utils/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import TaskCreation from './pages/Tasks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Projects from './pages/Projects';
import NotFoundPage from './components/Notfound';
const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <div className="flex h-screen">
        <div className='absolute lg:hidden bg-gray-900 top-0 w-full py-[7px] pr-5 text-end'>
          <Link to={'/'}>
            <h2 className='text-2xl text-white'>Task<span className='text-blue-300'>Asin</span></h2>
          </Link>
        </div>
        <section>
          <Navbar />
        </section>
        <section className="w-full lg:pt-0 pt-[5rem] bg-gradient-to-r from-blue-400 to-blue-400 py-[1rem] px-4 overflow-y-auto no-scrollbar">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/protected" element={<PrivateRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="tasks" element={<TaskCreation />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </section>
      </div>
    </Router>

  );
};

export default App;
