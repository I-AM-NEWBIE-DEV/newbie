import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

const Home = lazy(() => import('./views/home/index'));
const Batch = lazy(() => import('./views/batch/index'));
const Tool = lazy(() => import('./views/tool/index'));
const AboutNewbie = lazy(() => import('./views/about/index'));
const Layout = lazy(() => import('./component/layout/index'));

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    isIndex: true,
  },
  {
    path: '/batch',
    component: Batch,
    name: 'Batch',
  },
  {
    path: '/tool',
    component: Tool,
    name: 'Tool',
  },
  {
    path: '/about',
    component: AboutNewbie,
    name: 'AboutNewbie',
  },
];

function App() {
  return (
    <Router>
      <Suspense fallback={<div className='loading_wrapper'>
        <div className="triangle_one"></div>
        <div className="triangle_two"></div>
        {/* <h1 className="load">
          <span>l</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </h1> */}
        <h4 className="loading_text">loading...</h4>
      </div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {routes.map((route, index) => {
              return route?.isIndex
                ? <Route key={index} index element={<route.component />} />
                : <Route key={index} path={route.path} element={<route.component />}
              />;
            })}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;