"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/AppIcon'; // Adjust path based on your project structure

const WhyChooseSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const features = [
    {
      id: 1,
      title: "Innovation in Export",
      icon: "Globe2",
      shortDescription: "We redefine global trade through demand-linked procurement, export-grade quality, real-time tracking, and integrated logistics delivering faster, smarter, and more reliable exports with precision and value.",
      fullDescription: `Our global network spans across 50+ countries with established partnerships, local market expertise, and cultural understanding. We've built strong relationships with suppliers, logistics partners, and regulatory bodies worldwide, ensuring smooth operations regardless of destination. Our network includes dedicated representatives in key markets who understand local business practices, regulations, and customer preferences.`,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: [
        { label: "Countries", value: "50+" },
        { label: "Partners", value: "200+" },
        { label: "Time Zones", value: "12" }
      ]
    },
    {
      id: 2,
      title: "Premium Quality Products",
      icon: "ShieldCheck",
      shortDescription: "From aromatic spices to seafood, rice, pulses, fruits, and premium leather-explore our curated range of export-quality products with international certifications.",
      fullDescription: `Our comprehensive quality assurance program includes multiple checkpoints from source to destination. Every product undergoes rigorous testing, documentation, and certification processes. We maintain ISO 9001:2015 standards and work with accredited third-party laboratories for quality verification. Our quality team conducts regular supplier audits and maintains detailed traceability records for complete transparency.`,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: [
        { label: "Quality Checks", value: "7-Stage" },
        { label: "Certifications", value: "15+" },
        { label: "Success Rate", value: "99.8%" }
      ]
    },
    {
      id: 3,
      title: "Transparent Sourcing",
      icon: "Users",
      shortDescription: "Direct sourcing from certified MSMEs, SHGs, and organic farms ensures authenticity, traceability, and dependable supply consistency, giving clients confidence in every transaction.",
      fullDescription: `We serve as a cultural bridge between international markets, understanding the nuances of business practices across different regions. Our multilingual team is trained in international business etiquette, negotiation styles, and communication preferences. We facilitate smooth interactions by adapting our approach to match cultural expectations while maintaining transparency and professionalism throughout the process.`,
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: [
        { label: "Languages", value: "12+" },
        { label: "Cultural Training", value: "Ongoing" },
        { label: "Client Satisfaction", value: "98%" }
      ]
    },
        {
      id: 4,
      title: "Competitive & Transparent Pricing",
      icon: "DollarSign",
      shortDescription: "From source to shipment, benefit from transparent, competitive pricing, powered by direct procurement and efficient trade practices with zero middlemen.",
      fullDescription: `Our global network spans across 50+ countries with established partnerships, local market expertise, and cultural understanding. We've built strong relationships with suppliers, logistics partners, and regulatory bodies worldwide, ensuring smooth operations regardless of destination. Our network includes dedicated representatives in key markets who understand local business practices, regulations, and customer preferences.`,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: [
        { label: "Countries", value: "50+" },
        { label: "Partners", value: "200+" },
        { label: "Time Zones", value: "12" }
      ]
    },
  ];

  const toggleExpanded = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-secondary-dark mb-6">
          Why Choose Vaarunya?
        </h2>
        <p className="text-lg text-secondary-light max-w-3xl mx-auto leading-relaxed">
          We don't just facilitate trade—we build lasting partnerships that transcend borders, 
          cultures, and expectations. Here's what sets us apart in the global marketplace.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`bg-white rounded-2xl shadow-card hover:shadow-hover transition-all duration-500 overflow-hidden ${
              expandedCard === feature.id ? 'lg:col-span-3' : ''
            }`}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center">
                  <Icon name={feature.icon} size={32} className="text-primary" />
                </div>
                  <div>
                    <h3 className="text-xl font-montserrat font-bold text-secondary-dark mb-2">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              {/* <button
                onClick={() => toggleExpanded(feature.id)}
                className="p-2 text-secondary-light hover:text-primary transition-colors duration-300"
                aria-label={expandedCard === feature.id ? "Collapse" : "Expand"}
              >
                <Icon 
                  name={expandedCard === feature.id ? "ChevronUp" : "ChevronDown"} 
                  size={24} 
                />
              </button> */}
              </div>

              <p className="text-secondary-light mb-6 leading-relaxed">
                {feature.shortDescription}
              </p>

              {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-4 mb-6">
              {feature.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-montserrat font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-secondary-light">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div> */}

              {/* Expanded Content */}
              {expandedCard === feature.id && (
                <div className="border-t border-border-light pt-6 animation-fade-in">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-montserrat font-semibold text-secondary-dark mb-4">
                        Detailed Overview
                      </h4>
                      <p className="text-secondary-light leading-relaxed mb-6 text-justify">
                        {feature.fullDescription}
                      </p>
                      <Link
                        href="/about-trust-building-corporate-story"
                        className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors duration-300"
                      >
                        Learn More About Our Approach
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Link>
                    </div>
                    <div className="rounded-xl overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={800}
                        height={400}
                        className="w-full h-64 object-cover"
                        priority={false}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-primary/5 to-accent rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-secondary-dark mb-4">
            Ready to Experience the Difference?
          </h3>
          <p className="text-secondary-light mb-8 max-w-2xl mx-auto">
            Join global buyers who trust Vaarunya for transparent sourcing and consistent quality—meeting your international trade needs with end-to-end export excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-montserrat font-semibold rounded-lg hover:bg-primary-dark hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <Icon name="MessageSquare" size={20} className="mr-2" />
              Get Your Quote
            </Link>
            <Link
              href="/process-transparency-center"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-montserrat font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Icon name="Eye" size={20} className="mr-2" />
              See Our Process
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSection;