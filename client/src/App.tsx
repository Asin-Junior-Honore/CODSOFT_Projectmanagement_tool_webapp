import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login';
import PrivateRoutes from './utils/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import TaskCreation from './pages/Tasks';
import Projects from './pages/Projects';
const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <section>
          <Navbar /> {/* Include the Navbar */}
        </section>
        <section className="w-full bg-gradient-to-r from-blue-100 to-blue-300 py-[1rem] px-4 overflow-y-auto no-scrollbar">
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
          </Routes>
        </section>
      </div>
    </Router>

  );
};

export default App;
