"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/AppIcon';
import Image from 'next/image';
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
  const [showAll, setShowAll] = useState(false); // State to toggle between showing 6 or all certifications

  const certifications = [
    {
      id: 1,
      title: "APEDA",
      category: "Agricultural Export Certification",
      issuer: "Agricultural & Processed Food Products Export Development Authority (APEDA)",
      validUntil: "DD-MM-YYYY",
      description: "Registration-Cum-Membership Certificate (RCMC) with APEDA, the apex body promoting India’s Agri exports globally.",
      image: slide1,
      benefits: [
        "Access to APEDA schemes and subsidies",
        "Participation in global trade fairs",
        "Export market intelligence & training",
        "Government-recognized exporter status"
      ],
      scope: "Covers exports of fruits, vegetables, cereals, dairy, meat, and processed foods under APEDA’s mandate.",
      icon: "Award"
    },
    {
      id: 2,
      title: "Startup India Recognition",
      category: "Government-Recognized Startup",
      issuer: "Department for Promotion of Industry and Internal Trade (DPIIT)",
      validUntil: "DD-MM-YYYY",
      description: "Recognition under Startup India initiative, validating our innovation-driven business model in international trade.",
      image: slide2,
      benefits: [
        "Access to government startup incentives",
        "Tax and compliance benefits",
        "Branding as an innovative enterprise",
        "Eligibility for national and international startup platforms"
      ],
      scope: "Applies to our export-led startup registered as a DPIIT-recognized entity.",
      icon: "Globe"
    },
    {
      id: 3,
      title: "Spices Board of India",
      category: "Export Compliance",
      issuer: "Spices Board, Ministry of Commerce & Industry",
      validUntil: "DD-MM-YYYY",
      description: "Authorized registration with India’s regulatory and export promotion authority for spices and spice products.",
      image: slide3,
      benefits: [
        "Legal eligibility to export spices",
        "Access to quality testing and R&D labs",
        "Buyer-seller meet facilitation",
        "Spices Board assistance in global promotion"
      ],
      scope: "Covers exports of whole, ground, and processed spices under regulatory quality norms.",
      icon: "Trophy"
    },
    {
      id: 4,
      title: "Tea Board of India",
      category: "Export Compliance",
      issuer: "Tea Board, Ministry of Commerce & Industry",
      validUntil: "DD-MM-YYYY",
      description: "Official license to export Indian tea under Tea Board compliance and global promotion framework.",
      image: slide4,
      benefits: [
        "Legal export clearance for tea",
        "Quality and traceability certification",
        "Support for GI-tagged Indian teas",
        "Promotion through Tea Board channels"
      ],
      scope: "Covers exports of CTC, orthodox, green, and specialty teas.",
      icon: "Leaf"
    },
    {
      id: 5,
      title: "Coffee Board of India",
      category: "Export Compliance",
      issuer: "Coffee Board, Ministry of Commerce & Industry",
      validUntil: "DD-MM-YYYY",
      description: "Registered exporter under Coffee Board of India for promoting high-quality Indian coffee globally.",
      image: slide5,
      benefits: [
        "Access to export documentation and guidance",
        "Quality assessment and grading support",
        "Global buyer facilitation",
        "Participation in coffee-specific export programs"
      ],
      scope: "Covers green, roasted, and processed coffee exports.",
      icon: "CreditCard"
    },
    {
      id: 6,
      title: "Cashew Export Promotion Council of India (CEPCI)",
      category: "Export Compliance",
      issuer: "CEPCI, Ministry of Commerce & Industry",
      validUntil: "DD-MM-YYYY",
      description: "Certified member of CEPCI, promoting Indian cashew kernel and value-added products in international markets.",
      image: slide6,
      benefits: [
        "Trade promotion support",
        "Exporter listing in global directories",
        "Access to buyer meets and cashew trade fairs",
        "Export subsidy scheme eligibility"
      ],
      scope: "Covers exports of raw, processed, and flavored cashew products.",
      icon: "Smartphone"
    },
    {
      id: 7,
      title: "Council for Leather Exports (CLE)",
      category: "Export Compliance",
      issuer: "CLE, Ministry of Commerce & Industry",
      validUntil: "DD-MM-YYYY",
      description: "Membership in CLE, India’s apex body for leather and leather goods exporters.",
      image: slide7,
      benefits: [
        "Access to CLE export promotion incentives",
        "Global trade mission participation",
        "Product development and design support",
        "International marketing platforms"
      ],
      scope: "Covers export of raw hides, semi-finished and finished leather, leather garments, footwear, and accessories.",
      icon: "Smartphone"
    },
    {
      id: 8,
      title: "FSSAI Central License",
      category: "Food Safety & Regulatory Compliance",
      issuer: "Food Safety and Standards Authority of India",
      validUntil: "DD-MM-YYYY",
      description: "Mandatory license for food product manufacturing, handling, packaging, and export under India’s food safety law.",
      image: slide8,
      benefits: [
        "Compliance with Indian food safety regulations",
        "Export readiness for global food markets",
        "Enhances buyer trust in food quality and safety",
        "Supports batch-level traceability"
      ],
      scope: "Applies to all food categories including spices, dairy, seafood, meat, beverages, and processed goods.",
      icon: "Smartphone"
    },
    {
      id: 9,
      title: "MPEDA Registration",
      category: "Export Compliance",
      issuer: "Marine Products Export Development Authority (MPEDA)",
      validUntil: "DD-MM-YYYY",
      description: "Authorized exporter of marine products under MPEDA’s quality and export development framework.",
      image: slide9,
      benefits: [
        "Export eligibility for marine products",
        "HACCP and traceability support",
        "Access to global seafood expos",
        "Government subsidy schemes & lab support"
      ],
      scope: "Covers fish, shrimp, crab, mollusks, and frozen seafood exports.",
      icon: "Smartphone"
    },
    {
      id: 10,
      title: "Export Health Certificate (EHC)",
      category: "Food Safety & Regulatory Compliance",
      issuer: "Export Inspection Agency (EIA), Ministry of Commerce & Industry",
      validUntil: "DD-MM-YYYY",
      description: "Mandatory certification for the export of food and seafood products, ensuring they meet health and hygiene regulations of importing countries.",
      image: slide10,
      benefits: [
        "Required for food safety compliance",
        "Avoids detention/rejection at destination ports",
        "Enhances buyer confidence",
        "Recognized by global regulatory bodies"
      ],
      scope: "Covers seafood, meat, dairy, and processed food shipments.",
      icon: "Smartphone"
    },
    {
      id: 11,
      title: "Import-Export Code (IEC)",
      category: "Export Compliance",
      issuer: "Directorate General of Foreign Trade (DGFT)",
      validUntil: "Lifetime (no expiry, unless canceled/surrendered)",
      description: "A unique 10-digit identification number mandatory for all import and export activities in India.",
      image: slide11,
      benefits: [
        "Legal authorization to trade internationally",
        "Required for customs clearance and bank remittances",
        "Enables access to export incentives and schemes"
      ],
      scope: "Applies to all products and international trade operations.",
      icon: "Smartphone"
    },
    {
      id: 12,
      title: "Export Promotion Council (EPC) Registration",
      category: "Export Compliance",
      issuer: "Relevant EPC (Industry-specific)",
      validUntil: "DD-MM-YYYY",
      description: "Membership with sector-specific councils under India’s export promotion framework.",
      image: slide12,
      benefits: [
        "Access to EPC services and subsidies",
        "Buyer-seller meets and global market assistance",
        "Training and trade advisory services"
      ],
      scope: "Applicable based on product category—agri, leather, FMCG, textiles, etc.",
      icon: "Smartphone"
    },
    {
      id: 13,
      title: "Federation of Indian Export Organizations (FIEO)",
      category: "Export Compliance",
      issuer: "FIEO, Ministry of Commerce & Industry",
      validUntil: "DD-MM-YYYY",
      description: "National apex body representing Indian exporters across all sectors.",
      image: slide13,
      benefits: [
        "Trade intelligence and legal assistance",
        "Policy advocacy and buyer networking",
        "Export excellence certification"
      ],
      scope: "Pan-industry export trade recognition and facilitation.",
      icon: "Smartphone"
    },
    {
      id: 14,
      title: "Federation of Indian Chambers of Commerce & Industry (FICCI)",
      category: "Export Compliance",
      issuer: "FICCI",
      validUntil: "DD-MM-YYYY",
      description: "Membership with India’s oldest and most respected industry chamber, connecting businesses to policy and trade networks.",
      image: slide14,
      benefits: [
        "Access to business forums and global investors",
        "Market development and industry research",
        "Credibility in domestic and international trade"
      ],
      scope: "Multi-sector business and export facilitation.",
      icon: "Smartphone"
    },
    {
      id: 15,
      title: "MSME Registration (Udyam)",
      category: "Business Recognition",
      issuer: "Ministry of Micro, Small and Medium Enterprises",
      validUntil: "DD-MM-YYYY",
      description: "Official recognition as a registered MSME under Indian law, enabling access to government schemes.",
      image: slide15,
      benefits: [
        "Priority access to export schemes",
        "Financial aid and subsidy eligibility",
        "Reduced compliance for small businesses"
      ],
      scope: "Applicable to registered manufacturing and service exporters.",
      icon: "Smartphone"
    },
    {
      id: 16,
      title: "Goods & Services Tax (GST) Registration",
      category: "GST – Export Compliance",
      issuer: "CEPCI, Ministry of Commerce & Industry",
      validUntil: "Active unless surrendered",
      description: "Mandatory tax registration for businesses dealing in goods and services in India.",
      image: slide16,
      benefits: [
        "Compliance with tax laws",
        "Input tax credit eligibility",
        "Required for export invoicing"
      ],
      scope: "Covers all domestic and export transactions.",
      icon: "Smartphone"
    },
    {
      id: 17,
      title: "ISO 22000 / FSSC 22000",
      category: "Food Safety & Regulatory Compliance",
      issuer: "International Organization for Standardization",
      validUntil: "DD-MM-YYYY",
      description: "International food safety standard for controlling risks in food production, handling, and supply chain.",
      image: slide17,
      benefits: [
        "Globally recognized food safety assurance",
        "Builds buyer confidence in food safety compliance",
        "Reduces food safety risks in export chain"
      ],
      scope: "Applies to food processors, packagers, warehouses, and exporters.",
      icon: "Smartphone"
    },
    {
      id: 18,
      title: "Organic Food Certification (e.g., NPOP/NOP)",
      category: "Food Safety & Regulatory Compliance",
      issuer: "APEDA-authorized certification body (for NPOP)",
      validUntil: "DD-MM-YYYY",
      description: "Certification for organic farming and export, in compliance with national (NPOP) or international (NOP/EU) organic standards.",
      image: slide18,
      benefits: [
        "Access to premium organic export markets",
        "Compliance with international organic regulations",
        "Consumer trust in clean and ethical sourcing"
      ],
      scope: "Covers organically grown and processed food products.",
      icon: "Smartphone"
    }
  ];

  const categories = [...new Set(certifications.map(cert => cert.category))];

  // Determine which certifications to display based on showAll state
  const displayedCertifications = showAll ? certifications : certifications.slice(0, 6);

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
          {displayedCertifications.map((cert, index) => (
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

        {/* View More Button */}
        {!showAll && certifications.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-montserrat font-medium hover:bg-primary-dark transition-colors duration-300"
            >
              View More
              <Icon name="ChevronDown" size={16} className="ml-2" />
            </button>
          </div>
        )}

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