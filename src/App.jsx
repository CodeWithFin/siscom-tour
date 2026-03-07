import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import TourCards from './components/TourCards';
import WhyTour from './components/WhyTour';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white relative">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Marquee />
      <TourCards />
      <WhyTour />
      <BookingForm />
      <Footer />
    </div>
  );
}
