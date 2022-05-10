import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Navbar from './components/Navigation/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import RequireAuth from './components/RequireAuth';


function App() {
	return (
		<Router>
      <Navbar />
			<Routes>
				<Route element={<RequireAuth />} >
					
				<Route path='/' element={<MainPage />} />
				
				</Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
			</Routes>
			<div className='App'></div>
		</Router>
	);
}

export default App;
