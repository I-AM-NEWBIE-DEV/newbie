import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home/index';
import Batch from './views/batch/index';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="batch" element={<Batch />} />
      </Routes>
    </Router>
    // <Router>
    //   <Routes>
    //     <Route>
    //       <Route path="/" element={<Layout />}>
    //       <Route index element={<Home />} />
    //       <Route path="about" element={<About />} />
    //       <Route path="contact" element={<Contact />} />
    //       <Route path="user/:userId" element={<User />} />
    //     </Route>
    //   </Routes>
    // </Router>
  );
}

export default App;