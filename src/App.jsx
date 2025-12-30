import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Founder from './components/sections/Founder';
import Legalitas from './components/sections/Legalitas';
import Services from './components/sections/Services';
import FeaturedProduct from './components/sections/FeaturedProduct';
import Portfolio from './components/sections/Portfolio';
import Workflow from './components/sections/Workflow';
import Testimonials from './components/sections/Testimonials';
import Blog from './components/sections/Blog';
import FAQ from './components/sections/FAQ';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <FeaturedProduct />
      <Portfolio />
      <Workflow />
      <Testimonials />
      <About />
      <Founder />
      <Legalitas />
      <Blog />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

