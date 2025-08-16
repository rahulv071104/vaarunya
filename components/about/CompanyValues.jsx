import React from 'react';
import { motion } from 'framer-motion';
import Icon from'@/components/AppIcon';
import Image from'@/components/AppImage';

const CompanyValues = () => {
  const valuesData = [
    {
      title: "Transparency",
      description: "We believe in complete openness in all our business dealings, from pricing to processes.",
      detailedExplanation: `Transparency is the cornerstone of trust in international trade. We provide complete visibility into our sourcing processes, quality checks, pricing structures, and delivery timelines. Our clients always know exactly what they're getting, when they'll get it, and what they're paying for.

Every step of our process is documented and shared with our partners. From supplier verification to final delivery, we maintain detailed records and provide real-time updates. This transparency has helped us build lasting relationships and avoid the misunderstandings that plague many international trade relationships.`,
      icon: "Eye",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      examples: [
        "Real-time order tracking and updates",
        "Complete supplier verification documentation",
        "Transparent pricing with no hidden costs",
        "Open communication channels at all times"
      ]
    },
    {
      title: "Quality",
      description: "Uncompromising commitment to quality at every stage, from sourcing to delivery.",
      detailedExplanation: `Quality is not just a promise—it's our practice. We have implemented rigorous quality control measures at every stage of our operations. From initial supplier assessment to final product inspection, we maintain the highest standards to ensure our clients receive exactly what they expect.

Our quality assurance team conducts multiple inspections throughout the supply chain. We work only with certified suppliers who meet international quality standards, and we continuously monitor and improve our processes to maintain excellence. This commitment to quality has resulted in a 98% client satisfaction rate and long-term partnerships.`,
      icon: "Award",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      examples: [
        "Multi-stage quality inspection process",
        "ISO 9001:2015 certified operations",
        "Certified supplier network",
        "Continuous quality improvement programs"
      ]
    },
    {
      title: "Partnership",
      description: "Building long-term relationships based on mutual trust, respect, and shared success.",
      detailedExplanation: `We don't just facilitate transactions—we build partnerships. Our approach focuses on understanding our clients' long-term goals and working together to achieve them. We invest time in understanding different business cultures, market requirements, and individual client needs to create customized solutions.

Our partnership philosophy extends to our supplier network as well. We work closely with our suppliers to ensure they understand and meet our quality standards while also helping them grow their businesses. This collaborative approach has created a network of reliable partners who are committed to our shared success.`,
      icon: "Handshake",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      examples: [
        "Long-term partnership agreements",
        "Collaborative business planning",
        "Cultural sensitivity training",
        "Mutual growth and success programs"
      ]
    }
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
            <Icon name="Heart" size={16} className="mr-2" />
            Our Values
          </div>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-secondary-dark mb-6">
            The Principles That Guide Us
          </h2>
          <p className="text-xl text-secondary-light max-w-3xl mx-auto">
            Our core values shape every decision we make and every relationship we build in the global trade ecosystem.
          </p>
        </motion.div>

        <div className="space-y-16 lg:space-y-24">
          {valuesData.map((value, index) => (
            <motion.div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name={value.icon} size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-montserrat font-bold text-secondary-dark">
                      {value.title}
                    </h3>
                    <p className="text-lg text-primary font-medium">
                      {value.description}
                    </p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-secondary-light mb-6">
                  <p className="mb-4 text-justify">{value.detailedExplanation}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-montserrat font-semibold text-secondary-dark mb-4">
                    How We Practice This Value:
                  </h4>
                  <ul className="space-y-3">
                    {value.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start">
                        <Icon name="CheckCircle" size={20} className="text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-secondary-light">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Client Testimonial */}
              {/* <div className="bg-accent/50 rounded-xl p-6 border-l-4 border-primary">
                <Icon name="Quote" size={20} className="text-primary mb-3" />
                <p className="text-secondary-dark italic mb-3">
                  {index === 0 && "Vaarunya's transparency gave us complete confidence in our first international trade deal. We knew exactly what to expect at every step."}
                  {index === 1 && "The quality consistency we've experienced with Vaarunya is unmatched. Every shipment meets our exact specifications."}
                  {index === 2 && "More than a supplier, Vaarunya is our trusted partner in growth. They understand our business and help us succeed."}
                </p>
                <div className="text-sm">
                  <div className="font-montserrat font-semibold text-secondary-dark">
                    {index === 0 && "Michael Chen"}
                    {index === 1 && "Sarah Williams"}
                    {index === 2 && "Ahmed Al-Rashid"}
                  </div>
                  <div className="text-secondary-light">
                    {index === 0 && "Import Manager, TechCorp Singapore"}
                    {index === 1 && "Quality Director, European Textiles Ltd"}
                    {index === 2 && "CEO, Gulf Trading Company"}
                  </div>
                </div>
              </div> */}
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative overflow-hidden rounded-2xl shadow-card group">
                  <Image
                    src={value.image}
                    alt={`${value.title} - Vaarunya Values`}
                    className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          <Icon name={value.icon} size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="font-montserrat font-bold text-secondary-dark">
                            {value.title}
                          </div>
                          <div className="text-sm text-secondary-light">
                            Core Value #{index + 1}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;