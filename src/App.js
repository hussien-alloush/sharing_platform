import React from 'react';
import { Create, Footer, Header, Home, Login, Post, Search, User } from './components';
import './App.css';

const App = () => {
  return (
    <div>
        <Create />
        <Footer />
        <Header />
        <Home />
        <Login />
        <Post />
        <Search />
        <User />
      
    </div>
  );
}

export default App;
