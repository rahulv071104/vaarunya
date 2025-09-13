import React, { useState } from 'react';
import Icon from '@/components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqCategories = [
    {
      category: 'Getting Started',
      icon: 'Play',
      faqs: [
        {
          question: 'How do I place my first order?',
          answer: `Getting started is simple:
1. Contact us through any channel (phone, email, WhatsApp, or web form)
2. Share your product requirements and specifications
3. Receive detailed quotation within 24 hours
4. Review samples if needed (we can arrange sample shipments)
5. Confirm order with 30% advance payment
6. We handle all documentation and shipping
7. Receive your goods with full tracking support

Our team guides you through every step of your first international trade experience.`
        },
        {
          question: 'Do you provide product samples?',
          answer: `Yes, we provide samples for most products:
• Free samples: Available for products under $50 value
• Paid samples: For higher-value items, sample cost is deducted from your first order
• Sample shipping: Usually 3-7 days via DHL/FedEx
• Sample validity: Prices quoted with samples are valid for 30 days

Samples help ensure you're completely satisfied with quality before placing larger orders.`
        }
      ]
    },
    {
      category: 'Payment & Pricing',
      icon: 'CreditCard',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: `We accept multiple secure payment methods:
• Bank Wire Transfer (T/T) - Most common for international trade
• Letter of Credit (L/C) - For larger orders and new clients
• PayPal - For smaller orders and samples

Payment terms are typically 30% advance, 70% before shipment, but we're flexible based on order size and client relationship.`
        },
        {
          question: 'How do you determine pricing?',
          answer: `Our pricing is based on several factors:
• Product specifications and quality grade
• Order quantity (volume discounts available)
    *Bronze Category - Clients with 5+ imports in a year are eligible for basic discounts.
    *Sliver Category - Clients with 10+ imports in a year are eligible for higher discounts.
    *Gold Category - Clients with 15+ imports in a year are eligible for premium discounts.
• Port of origin and destination
• Current market conditions
• Seasonal availability

We provide detailed quotations breaking down all costs including:
- Product cost per unit
- Packaging and labeling
- Quality inspection fees
- Export documentation
- Shipping and insurance
- Any applicable taxes or duties

Prices are valid for 15-30 days depending on market volatility.`
        },
        {
          question: 'Do you offer volume discounts?',
          answer: `Yes, we offer attractive volume discounts:
• Bronze Category - Clients with 5+ imports in a year are eligible for basic discounts.
• Sliver Category - Clients with 10+ imports in a year are eligible for higher discounts.
• Gold Category - Clients with 15+ imports in a year are eligible for premium discounts.

Additional benefits for large orders:
- Priority production scheduling
- Dedicated Representative
- Flexible payment terms
- Free quality inspections
- Reduced shipping costs through consolidated shipments`
        }
      ]
    },
    {
      category: 'Shipping & Logistics',icon: 'Truck',
      faqs: [
        {
          question: 'What shipping options are available?',
          answer: `We offer comprehensive shipping solutions:
• Sea Freight: Most economical for large orders
• Air Freight: Faster delivery for urgent orders
• Express Courier: DHL/FedEx for samples and small orders
• Land Transport: For neighboring countries via road/rail

Shipping terms available:
- FOB (Free on Board) - You arrange shipping
- CIF (Cost, Insurance, Freight) - We handle everything to your port

We work with trusted logistics partners worldwide to ensure safe, timely delivery.`
        },
        {
          question: 'How do you handle customs and documentation?',
          answer: `We handle all export documentation and procedures:
• Commercial Invoice and Packing List
• Certificate of Origin
• Export License (when required)
• Phytosanitary Certificate (for agricultural products)
• Quality Certificates and Test Reports
• Insurance Documents
• Bill of Lading/Airway Bill

Our documentation team ensures:
- 100% accuracy to prevent customs delays
- Compliance with destination country requirements
- Digital copies provided immediately
- Original documents couriered separately
- 24/7 support for any customs queries

We also provide guidance on import procedures and can recommend trusted customs brokers in your country.`
        },
       
      ]
    },
    {
      category: 'Quality & Compliance',icon: 'Shield',
      faqs: [
        {
          question: 'What quality assurance measures do you have?',
          answer: `We maintain strict quality standards:
• Pre-production samples for approval
• In-process quality monitoring
• Pre-shipment inspection by third-party agencies
• Quality certificates from accredited laboratories
• Photo/video documentation of goods before shipping
• Compliance with international standards (ISO, FDA, CE, etc.)

Our quality team:
- Visits supplier facilities regularly
- Conducts random quality audits
- Maintains supplier scorecards
- Implements corrective action plans
- Provides detailed quality reports

We guarantee that all products meet specified quality standards or we'll replace them at no cost.`
        },
        {
          question: 'Do you provide certificates and test reports?',
          answer: `Yes, we provide comprehensive documentation:
• Certificate of Analysis (COA) for all products
• Third-party lab test reports
• Organic/Fair Trade certificates (when applicable)
• FDA/FSSAI registration certificates
• ISO certification documents
• Phytosanitary certificates for agricultural products
• Material Safety Data Sheets (MSDS) for chemicals

All certificates are:
- From internationally recognized laboratories
- Valid and current
- Specific to your shipment batch
- Available in digital format immediately
- Original copies included with shipment

We maintain relationships with certified testing laboratories worldwide to ensure compliance with your local regulations.`
        },
        
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenFAQ(openFAQ === key ? null : key);
  };

  return (
    <section className="pt-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-secondary-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-secondary-light max-w-2xl mx-auto">
            Get instant answers to common questions about our services, processes, and policies. 
            Can't find what you're looking for? Contact us directly.
          </p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="card-elevated p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Icon name={category.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-montserrat font-bold text-secondary-dark">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const isOpen = openFAQ === `${categoryIndex}-${faqIndex}`;
                  return (
                    <div key={faqIndex} className="border border-border-light rounded-lg">
                      <button
                        onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/50 transition-all duration-300 rounded-lg"
                      >
                        <span className="font-montserrat font-semibold text-secondary-dark pr-4">
                          {faq.question}
                        </span>
                        <Icon 
                          name={isOpen ? "ChevronUp" : "ChevronDown"} 
                          size={20} 
                          className="text-primary flex-shrink-0 transition-transform duration-300" 
                        />
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="px-6 pb-4">
                          <div className="text-secondary-light whitespace-pre-line leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}



      </div>

                  <section className="py-16  mt-12 bg-gradient-to-r from-primary to-primary-dark ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Icon name="HelpCircle" size={48} className="text-white mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-montserrat font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                           Our trade experts are available 24/7 to provide personalized assistance. 
              Get detailed answers specific to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919876543210" className="inline-flex items-center px-6 py-3 bg-white text-primary font-montserrat font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300">
                <Icon name="Phone" size={20} className="mr-2" />
                Call Expert Now
              </a>
               <a href="https://wa.me/919876543210" className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-montserrat font-semibold rounded-lg hover:bg-green-700 transition-all duration-300">
               
                <Icon name="MessageCircle" size={20} className="mr-2" />
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default FAQSection;
