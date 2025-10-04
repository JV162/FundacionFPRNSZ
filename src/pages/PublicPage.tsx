import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Impact from '../components/Impact';
import DonationForm from '../components/DonationForm';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const PublicPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Impact />
      <DonationForm />
      <Contact />
      <Footer />
    </div>
  );
};

export default PublicPage;