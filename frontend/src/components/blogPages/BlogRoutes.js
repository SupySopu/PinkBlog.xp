import React from 'react';

import Entrada from './Entrada';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainBlog from './MainBlog';

function Blog() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainBlog />} />
          <Route path="/entrada/:id" element={<Entrada />}/>
        </Routes>
    </Router>
  );
}

export default Blog;