// src/components/Home/HomePage.jsx
import React from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Hero from './Hero';
import ServicesPreview from './ServicesPreview';
import About from './About';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Location from './Location';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.home}>
      <Header />
      <main>
        <Hero />
        <ServicesPreview />
        <About />
        <Gallery />
        <Testimonials />
        <Location />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;