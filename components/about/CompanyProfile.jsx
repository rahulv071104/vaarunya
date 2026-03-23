"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from'@/components/AppIcon';

const CompanyProfile = () => {
  const [downloadStarted, setDownloadStarted] = useState(false);

  const profileSections = [
    {
      title: "Company Overview",
      description: "Comprehensive introduction to Vaarunya Global Exim, our mission, vision, and core values.",
      icon: "Building2",
      pages: 4
    },
    {
      title: "Leadership Team",
      description: "Detailed profiles of our leadership team, their expertise, and industry experience.",
      icon: "Users",
      pages: 6
    },
    {
      title: "Global Network",
      description: "Our worldwide presence, regional offices, and partner network across 50+ countries.",
      icon: "Globe",
      pages: 8
    },
    {
      title: "Product Portfolio",
      description: "Complete catalog of our product categories, sourcing capabilities, and quality standards.",
      icon: "Package",
      pages: 12
    },
    {
      title: "Quality Assurance",
      description: "Detailed overview of our quality processes, certifications, and compliance standards.",
      icon: "Award",
      pages: 6
    },
    {
      title: "Success Stories",
      description: "Case studies and testimonials from our global partners and successful collaborations.",
      icon: "Trophy",
      pages: 8
    },
    {
      title: "Financial Information",
      description: "Company financial highlights, growth trajectory, and investment in infrastructure.",
      icon: "TrendingUp",
      pages: 4
    },
    {
      title: "Contact Information",
      description: "Complete contact details for all regional offices and key personnel.",
      icon: "Phone",
      pages: 2
    }
  ];

  const downloadOptions = [
    {
      title: "Complete Company Profile",
      description: "Full comprehensive profile with all sections included",
      size: "15.2 MB",
      pages: 50,
      format: "PDF",
      icon: "FileText"
    },
    {
      title: "Executive Summary",
      description: "Condensed overview highlighting key capabilities and achievements",
      size: "3.8 MB",
      pages: 12,
      format: "PDF",
      icon: "File"
    },
    {
      title: "Product Catalog",
      description: "Detailed product portfolio with specifications and quality standards",
      size: "8.5 MB",
      pages: 24,
      format: "PDF",
      icon: "Package"
    },
    {
      title: "Capability Statement",
      description: "One-page overview of core capabilities and competitive advantages",
      size: "1.2 MB",
      pages: 2,
      format: "PDF",
      icon: "FileCheck"
    }
  ];

  const handleDownload = (documentType) => {
    setDownloadStarted(true);
    // Simulate download process
    setTimeout(() => {
      setDownloadStarted(false);
      // In a real application, this would trigger the actual download
      console.log(`Downloading ${documentType}...`);
    }, 2000);
  };

  const companyHighlights = [
    { label: "Years of Experience", value: "9+", icon: "Calendar" },
    { label: "Global Partners", value: "350+", icon: "Handshake" },
    { label: "Countries Served", value: "50+", icon: "Globe" },
    { label: "Product Categories", value: "25+", icon: "Package" },
    { label: "Quality Certifications", value: "12", icon: "Award" },
    { label: "Annual Trade Volume", value: "$50M+", icon: "TrendingUp" }
  ];

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
            <Icon name="Download" size={16} className="mr-2" />
            Company Resources
          </div>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-secondary-dark mb-6">
            Download Our Company Profile
          </h2>
          <p className="text-xl text-secondary-light max-w-3xl mx-auto">
            Get comprehensive information about Vaarunya Global Exim, our capabilities, and how we can support your international trade needs.
          </p>
        </motion.div>

        {/* Company Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-12 lg:mb-16">
          {companyHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="card-elevated p-4 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={highlight.icon} size={20} className="text-primary" />
              </div>
              <div className="text-lg lg:text-xl font-montserrat font-bold text-primary mb-1">
                {highlight.value}
              </div>
              <div className="text-xs text-secondary-light">
                {highlight.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Profile Contents */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="card-elevated p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-montserrat font-bold text-secondary-dark mb-6">
                What's Included in Our Company Profile
              </h3>
              <div className="space-y-4">
                {profileSections.map((section, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-accent/50 transition-colors duration-300">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={section.icon} size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-montserrat font-semibold text-secondary-dark mb-1">
                        {section.title}
                      </h4>
                      <p className="text-sm text-secondary-light mb-2">
                        {section.description}
                      </p>
                      <div className="text-xs text-primary">
                        {section.pages} pages
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Download Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="card-elevated p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-montserrat font-bold text-secondary-dark mb-6">
                Choose Your Download
              </h3>
              <div className="space-y-4">
                {downloadOptions.map((option, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={option.icon} size={20} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-montserrat font-semibold text-secondary-dark mb-1">
                            {option.title}
                          </h4>
                          <p className="text-sm text-secondary-light mb-2">
                            {option.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-secondary-light">
                            <span>{option.pages} pages</span>
                            <span>{option.size}</span>
                            <span>{option.format}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(option.title)}
                      disabled={downloadStarted}
                      className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloadStarted ? (
                        <>
                          <Icon name="Loader" size={16} className="mr-2 animate-spin" />
                          Preparing Download...
                        </>
                      ) : (
                        <>
                          <Icon name="Download" size={16} className="mr-2" />
                          Download {option.format}
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Contact for Custom Information */}
              <div className="mt-8 p-4 bg-accent/50 rounded-lg border-l-4 border-primary">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="font-montserrat font-semibold text-secondary-dark mb-2">
                      Need Custom Information?
                    </h4>
                    <p className="text-sm text-secondary-light mb-3">
                      Looking for specific information not covered in our standard profiles? Our team can prepare customized documentation tailored to your requirements.
                    </p>
                    <a
                      href="/contact-global-accessibility-hub"
                      className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm transition-colors duration-300"
                    >
                      <Icon name="MessageSquare" size={16} className="mr-2" />
                      Request Custom Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Resources */}
        <motion.div
          className="mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="card-elevated p-6 lg:p-8 bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="text-center">
              <Icon name="FileText" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl lg:text-2xl font-montserrat font-bold text-secondary-dark mb-4">
                Additional Resources Available
              </h3>
              <p className="text-secondary-light mb-6 max-w-2xl mx-auto">
                Beyond our company profile, we offer additional resources including market reports, compliance guides, and industry insights to support your international trade decisions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact-global-accessibility-hub"
                  className="btn-primary inline-flex items-center"
                >
                  <Icon name="Mail" size={20} className="mr-2" />
                  Request Additional Resources
                </a>
                <a
                  href="/contact#contact-form"
                  className="btn-secondary inline-flex items-center"
                >
                  <Icon name="MessageSquare" size={20} className="mr-2" />
                  Discuss Your Needs
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyProfile;