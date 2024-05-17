import { Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import Layout from './layouts/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Spinner from './components/Spinner';

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/validate-token', {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.message) return null;
        if (!res.ok) throw new Error(res.message);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path='/'
              element={
                <Layout>
                  <p>Home Page</p>
                </Layout>
              }
            />

            <Route path='/search' element={<Layout>Search Page</Layout>} />

            <Route
              path='/register'
              element={
                <Layout>
                  {!authUser ? <Register /> : <Navigate to='/' />}
                </Layout>
              }
            />

            <Route
              path='/login'
              element={
                <Layout>{!authUser ? <Login /> : <Navigate to='/' />}</Layout>
              }
            />

            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Suspense>
      </Router>

      <Toaster />
    </>
  );
};

export default App;
