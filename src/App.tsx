import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/hooks/use-theme";
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import NewMedia from '@/pages/NewMedia';
import EditMedia from '@/pages/EditMedia';
import Predict from '@/pages/Predict';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewMedia />} />
            <Route path="/edit/:id" element={<EditMedia />} />
            <Route path="/predict" element={<Predict />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;