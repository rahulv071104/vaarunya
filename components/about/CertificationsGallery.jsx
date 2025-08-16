"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from'@/components/AppIcon';
import Image from'@/components/AppImage';
import slide1 from '@/certifications/APEDA.png';
import slide2 from '@/certifications/Startup India.png';
import slide3 from '@/certifications/Spice Board.jpg';
import slide4 from '@/certifications/Tea_Board_of_India.png';
import slide5 from '@/certifications/Coffee_Board_of_India.jpg';
import slide6 from '@/certifications/Cashew.jpg';
import slide7 from '@/certifications/council-for-leather-exports.jpg';
import slide8 from '@/certifications/fssai.png';
import slide9 from '@/certifications/MPEDA.png';
import slide10 from '@/certifications/MPEDA.png';
import slide11 from '@/certifications/MPEDA.png';
import slide12 from '@/certifications/MPEDA.png';
import slide13 from '@/certifications/federation-of-indian-export-organisations.png';
import slide14 from '@/certifications/FICCI.png';
import slide15 from '@/certifications/MSME.png';
import slide16 from '@/certifications/GST.png';
import slide17 from '@/certifications/ISO.png';
import slide18 from '@/certifications/Org Food.png';



const CertificationsGallery = () => {
  const [selectedCertification, setSelectedCertification] = useState(null);

  const certifications = [
    {
      id: 1,
      title: "ISO 9001:2015",
      category: "Quality Management",
      issuer: "International Organization for Standardization",
      validUntil: "2025-12-31",
      description: "Quality Management Systems certification ensuring consistent quality in all our processes and services.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      benefits: [
        "Consistent quality management processes",
        "Continuous improvement framework",
        "Customer satisfaction focus",
        "Risk-based thinking approach"
      ],
      scope: "Covers all aspects of our international trade operations including sourcing, quality control, and customer service.",
      icon: "Award"
      
    },
    {
      id: 2,
      title: "FIEO Membership",
      category: "Export Excellence",
      issuer: "Federation of Indian Export Organisations",
      validUntil: "2024-12-31",
      description: "Membership in India\'s premier export promotion organization, recognizing our contribution to international trade.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      benefits: [
        "Access to export promotion schemes",
        "Government policy advocacy",
        "International trade facilitation",
        "Export excellence recognition"
      ],
      scope: "Validates our standing as a reliable export house with proven track record in international markets.",
      icon: "Globe"
    },
    {
      id: 3,
      title: "Export Excellence Award",
      category: "Industry Recognition",
      issuer: "Ministry of Commerce & Industry, India",
      validUntil: "Lifetime Achievement",
      description: "Government recognition for outstanding performance in export trade and contribution to India\'s export growth.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      benefits: [
        "Government recognition and support",
        "Priority in export promotion schemes",
        "Enhanced credibility with partners",
        "Access to exclusive trade missions"
      ],
      scope: "Recognizes our significant contribution to India\'s export performance and international trade relations.",
      icon: "Trophy"
    },
    {
      id: 4,
      title: "Sustainable Trade Certification",
      category: "Environmental Compliance",
      issuer: "Global Sustainability Council",
      validUntil: "2025-06-30",
      description: "Certification for implementing sustainable practices in international trade operations and supply chain management.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      benefits: [
        "Environmental impact reduction",
        "Sustainable supply chain practices",
        "Carbon footprint optimization",
        "Green logistics implementation"
      ],
      scope: "Covers our commitment to environmental responsibility and sustainable business practices across all operations.",
      icon: "Leaf"
    },
    {
      id: 5,
      title: "Trade Finance Accreditation",
      category: "Financial Compliance",
      issuer: "International Trade Finance Association",
      validUntil: "2024-09-30",
      description: "Accreditation for expertise in international trade finance, letters of credit, and payment security systems.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      benefits: [
        "Secure payment processing",
        "Letters of credit expertise",
        "Risk mitigation strategies",
        "Financial compliance assurance"
      ],
      scope: "Validates our expertise in managing complex international payment systems and trade finance instruments.",
      icon: "CreditCard"
    },
    {
      id: 6,
      title: "Digital Trade Platform Certification",
      category: "Technology Excellence",
      issuer: "International Digital Trade Council",
      validUntil: "2025-03-31",
      description: "Certification for implementing advanced digital technologies in trade processes and customer service delivery.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      benefits: [
        "Advanced digital trade processes",
        "Real-time tracking and monitoring",
        "Automated compliance checking",
        "Enhanced customer experience"
      ],
      scope: "Recognizes our investment in cutting-edge technology to streamline international trade operations.",
      icon: "Smartphone"
    }
  ];

  const categories = [...new Set(certifications.map(cert => cert.category))];

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-montserrat font-medium mb-6">
            <Icon name="Shield" size={16} className="mr-2" />
            Certifications & Accreditations
          </div>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-secondary-dark mb-6">
            Trusted by Industry Standards
          </h2>
          <p className="text-xl text-secondary-light max-w-3xl mx-auto">
            Our certifications demonstrate our commitment to excellence, compliance, and continuous improvement in all aspects of international trade.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="card-elevated p-6 cursor-pointer hover:shadow-hover transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCertification(cert)}
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name={cert.icon} size={16} className="text-white" />
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-accent text-secondary text-xs rounded-full mb-2">
                  {cert.category}
                </span>
                <h3 className="text-lg font-montserrat font-semibold text-secondary-dark mb-1">
                  {cert.title}
                </h3>
                <p className="text-sm text-secondary-light">
                  {cert.issuer}
                </p>
              </div>

              <p className="text-secondary-light text-sm mb-4 line-clamp-3">
                {cert.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-xs text-secondary-light">
                  Valid until: {new Date(cert.validUntil).toLocaleDateString()}
                </div>
                <button className="text-primary hover:text-primary-dark transition-colors duration-300">
                  <Icon name="ExternalLink" size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification Modal */}
        {selectedCertification && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <Image
                    src={selectedCertification.image}
                    alt={selectedCertification.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <button
                    onClick={() => setSelectedCertification(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                  >
                    <Icon name="X" size={16} />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <Icon name={selectedCertification.icon} size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-montserrat font-bold text-white">
                          {selectedCertification.title}
                        </h3>
                        <p className="text-white/80">
                          {selectedCertification.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-montserrat font-semibold text-secondary-dark">
                          Issued by: {selectedCertification.issuer}
                        </h4>
                        <p className="text-sm text-secondary-light">
                          Valid until: {new Date(selectedCertification.validUntil).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-secondary-light">
                      {selectedCertification.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-montserrat font-semibold text-secondary-dark mb-3">
                      Scope & Coverage
                    </h4>
                    <p className="text-secondary-light">
                      {selectedCertification.scope}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-montserrat font-semibold text-secondary-dark mb-3">
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {selectedCertification.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <Icon name="Check" size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary-light">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificationsGallery;