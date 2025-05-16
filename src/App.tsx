import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/hooks/use-theme";
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import NewMedia from '@/pages/NewMedia';
import EditMedia from '@/pages/EditMedia';
import Predict from '@/pages/Predict';
import { MediaList } from './components/MediaList';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/media" element={<MediaList />} />
            <Route path="/new" element={<NewMedia />} />
            <Route path="/edit/:id" element={<EditMedia />} />
            <Route path="/predict" element={<Predict />} />
          </Routes>
        </Layout>
      </Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Media Management</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <MediaList />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;