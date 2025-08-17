"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/AppIcon';
import FoundingStory from '@/components/about/FoundingStory';
import CompanyTimeline from '@/components/about/CompanyTimeline';
import LeadershipTeam from '@/components/about/LeadershipTeam';
import GlobalNetwork from '@/components/about/GlobalNetwork';
import CompanyValues from '@/components/about/CompanyValues';
import QualityAssurance from '@/components/about/QualityAssurance';
import CertificationsGallery from '@/components/about/CertificationsGallery';
import PartnershipPhilosophy from '@/components/about/PartnershipPhilosophy';
import CompanyProfile from '@/components/about/CompanyProfile';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
  if (window.location.hash === '#certifications-gallery') {
    const element = document.getElementById('certifications-gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'instant' });
    }
  }
}, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-24 pb-16 lg:pb-20 bg-gradient-to-br from-accent to-surface overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-montserrat font-medium mb-6">
              <Icon name="Building2" size={16} className="mr-2" />
              Our Story
            </div>
            <h1 className="text-4xl lg:text-6xl font-montserrat font-bold text-secondary-dark mb-6">
              Building Trust Through
              <span className="text-gradient block">Transparent Trade</span>
            </h1>
            <p className="text-xl lg:text-2xl text-secondary-light font-inter leading-relaxed mb-8">
              From humble beginnings to global partnerships, discover how Vaarunya transforms international trade through transparency, quality, and unwavering commitment to our partners.
            </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
          href="/get-quote-intelligent-conversion-portal"
          className="btn-primary inline-flex items-center"
          >
          <Icon name="MessageSquare" size={20} className="mr-2" />
          Start Partnership
          </Link>
          <Link
          href="/contact-global-accessibility-hub"
          className="btn-secondary inline-flex items-center"
          >
          <Icon name="Users" size={20} className="mr-2" />
          Meet Our Team
          </Link>
      </div>
          </motion.div>
        </div>
      </section>

      {/* Founding Story */}
      <FoundingStory />

{/* Company Timeline
<CompanyTimeline /> */}

      {/* Leadership Team */}
      <LeadershipTeam />

{/* Global Network
<GlobalNetwork /> */}

      {/* Company Values */}
      <CompanyValues />

{/* Quality Assurance
<QualityAssurance /> */}

      {/* Partnership Philosophy */}
      <PartnershipPhilosophy />

{/* Company Profile Download
<CompanyProfile /> */}
      {/* Certifications Gallery */}
   <section id="certifications-gallery">
  <CertificationsGallery />
</section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-white mb-6">
              Ready to Build a Partnership?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses who trust Vaarunya for their international trade needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-montserrat font-semibold rounded-lg hover:bg-accent hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                <Icon name="ArrowRight" size={20} className="mr-2" />
                Get Started Today
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-montserrat font-semibold rounded-lg hover:bg-white hover:text-primary transition-all duration-300"
              >
                <Icon name="Package" size={20} className="mr-2" />
                Explore Products
              </Link>
            </div>
            
          </motion.div>
        </div>
      </section>
    </div>
  );
}