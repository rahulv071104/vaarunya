/* ContactPage in Next.js (app/contact/page.tsx) */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/AppIcon';

import ContactForm from '@/components/contact/ContactForm';
import GlobalMap from '@/components/contact/GlobalMap';
import OfficeLocations from '@/components/contact/OfficeLocations';
import FAQSection from '@/components/contact/FAQSection';
import ResponseCommitment from '@/components/contact/ResponseCommitment';

export default function ContactPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  
  const contactMethods = [
    {
      type: "Phone",
      icon: "Phone",
      title: "Call Us Directly",
      details: [
        { region: "India", number: "+91 98765 43210", hours: "9:00 AM - 6:00 PM IST" },
        { region: "USA", number: "+1 555 123 4567", hours: "9:00 AM - 5:00 PM EST" },
        { region: "UAE", number: "+971 50 123 4567", hours: "9:00 AM - 6:00 PM GST" }
      ],
      description: "Speak directly with our trade specialists"
    },
    {
      type: "WhatsApp",
      icon: "MessageCircle",
      title: "WhatsApp Business",
      details: [
        { region: "Global", number: "+91 98765 43210", hours: "24/7 Available" }
      ],
      description: "Instant communication for quick queries"
    },
    {
      type: "Email",
      icon: "Mail",
      title: "Email Support",
      details: [
        { type: "New Business", email: "sales@vaarunya.com", response: "Within 4 hours" },
        { type: "Existing Clients", email: "support@vaarunya.com", response: "Within 2 hours" },
        { type: "Partnerships", email: "partnerships@vaarunya.com", response: "Within 24 hours" }
      ],
      description: "Detailed inquiries and documentation"
    },
    {
      type: "Live Chat",
      icon: "MessageSquare",
      title: "Live Chat Support",
      details: [
        { availability: "Monday - Friday", hours: "9:00 AM - 6:00 PM IST" },
        { availability: "Weekend", hours: "10:00 AM - 4:00 PM IST" }
      ],
      description: "Real-time assistance from our team"
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: "Linkedin", url: "#", color: "text-blue-600" },
    { name: "Twitter", icon: "Twitter", url: "#", color: "text-blue-400" },
    { name: "Facebook", icon: "Facebook", url: "#", color: "text-blue-700" },
    { name: "Instagram", icon: "Instagram", url: "#", color: "text-pink-600" }
  ];

  const quickLinks = [
    { name: "Get Quote", path: "/get-quote-intelligent-conversion-portal", icon: "Calculator" },
    { name: "Our Products", path: "/products", icon: "Package" },
// { name: "Our Process", path: "/process-transparency-center", icon: "GitBranch" },
    { name: "About Us", path: "/about", icon: "Users" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-surface">
      <section className="pt-24 pb-16 bg-gradient-to-r from-secondary-dark to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-montserrat font-bold text-white mb-6">
            Global Accessibility Hub
          </h1>
          <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Connect with Vaarunya across continents. We're here to bridge your business with global opportunities, 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link, i) => (
              <Link key={i} href={link.path} className="inline-flex items-center px-6 py-3 bg-primary text-white font-montserrat font-semibold rounded-lg hover:bg-primary-dark hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300">
                <Icon name={link.icon} size={20} className="mr-2" />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-secondary-dark mb-4">Multiple Ways to Connect</h2>
            <p className="text-lg text-secondary-light max-w-2xl mx-auto">
              Choose your preferred communication method. We're committed to responding promptly across all channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="card-elevated p-6 hover:shadow-hover transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <Icon name={method.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold text-secondary-dark">
                    {method.title}
                  </h3>
                </div>
                <p className="text-secondary-light mb-4">{method.description}</p>
                <div className="space-y-2">
                  {method.details.map((detail, idx) => (
                    <div key={idx} className="text-sm">
                      {'region' in detail && (
                        <div className="flex justify-between">
                          <span className="font-medium text-secondary">{detail.region}:</span>
                          <span className="text-primary font-semibold">{detail.number}</span>
                        </div>
                      )}
                      {'type' in detail && (
                        <div className="flex justify-between">
                          <span className="font-medium text-secondary">{detail.type}:</span>
                          <span className="text-primary font-semibold">{detail.email}</span>
                        </div>
                      )}
                      {'availability' in detail && (
                        <div className="flex justify-between">
                          <span className="font-medium text-secondary">{detail.availability}:</span>
                          <span className="text-secondary-light">{detail.hours}</span>
                        </div>
                      )}
                      {'hours' in detail && !('availability' in detail) && (
                        <div className="text-secondary-light text-center">{detail.hours}</div>
                      )}
                      {'response' in detail && (
                        <div className="text-center text-green-600 font-medium">{detail.response}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* <GlobalMap /> */}

      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-secondary-dark mb-6">Start Your Global Trade Journey</h2>
              <p className="text-lg text-secondary-light mb-8">
                Tell us about your business needs, and we'll connect you with the right solutions. Our intelligent form adapts to your inquiry type for a personalized experience.
              </p>

              <div className="card-elevated p-6 mb-8">
                <h3 className="text-xl font-montserrat font-semibold text-secondary-dark mb-4 flex items-center">
                  <Icon name="Clock" size={20} className="mr-2 text-primary" />
                  Best Time to Reach Us
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-secondary">India</div>
                    <div className="text-primary font-semibold">{currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true })}</div>
                    <div className="text-xs text-secondary-light">9 AM - 6 PM IST</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-secondary">USA</div>
                    <div className="text-primary font-semibold">{currentTime.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: true })}</div>
                    <div className="text-xs text-secondary-light">9 AM - 5 PM EST</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-secondary">UAE</div>
                    <div className="text-primary font-semibold">{currentTime.toLocaleTimeString('en-AE', { timeZone: 'Asia/Dubai', hour12: true })}</div>
                    <div className="text-xs text-secondary-light">9 AM - 6 PM GST</div>
                  </div>
                </div>
              </div>

              <div className="card-elevated p-6">
                <h3 className="text-xl font-montserrat font-semibold text-secondary-dark mb-4">Follow Our Journey</h3>
                <p className="text-secondary-light mb-4">Stay updated with our latest trade activities, market insights, and success stories.</p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.url} className={`w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300 ${social.color}`} aria-label={social.name}>
                      <Icon name={social.icon} size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

{/* <OfficeLocations /> */}
    <ResponseCommitment />
      <FAQSection />

    {/* <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
        <Icon name="AlertCircle" size={48} className="text-white mx-auto mb-4" />
        <h2 className="text-2xl lg:text-3xl font-montserrat font-bold text-white mb-4">Urgent Trade Support</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            For time-sensitive shipments, customs clearance issues, or urgent trade matters, our emergency support team is available 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919876543210" className="inline-flex items-center px-6 py-3 bg-white text-primary font-montserrat font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300">
            <Icon name="Phone" size={20} className="mr-2" />
            Emergency Hotline
            </a>
            <a href="https://wa.me/919876543210" className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-montserrat font-semibold rounded-lg hover:bg-green-700 transition-all duration-300">
            <Icon name="MessageCircle" size={20} className="mr-2" />
            WhatsApp 24/7
            </a>
        </div>
        </div>
    </div>
    </section>

    <section className="py-16 bg-secondary-dark">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-white mb-6">Ready to Expand Globally?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Join thousands of businesses who trust Vaarunya for their international trade needs. Let's build your global success story together.
        </p>
        <Link href="/get-quote-intelligent-conversion-portal" className="inline-flex items-center px-8 py-4 bg-primary text-white font-montserrat font-bold text-lg rounded-lg hover:bg-primary-dark hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300">
        <Icon name="ArrowRight" size={24} className="mr-2" />
        Get Your Custom Quote
        </Link>
    </div>
    </section> */}
    </div>
  );
}