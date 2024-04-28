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
import { useColorContext } from './contexts/ThemeContext ';
import NotFoundPage from './components/Notfound';

const App: React.FC = () => {
  const { bodyBg } = useColorContext();
  return (
    <Router>
      <div className="flex h-screen">
        <section>
          <Navbar /> {/* Include the Navbar */}
        </section>
        <section className={`w-full ${bodyBg} py-4 px-4 overflow-y-auto no-scrollbar`}>
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

             {/* Catch-All Route for 404 */}
             <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </section>
      </div>
    </Router>

  );
};

export default App;
