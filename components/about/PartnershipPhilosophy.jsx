import React from 'react';
import { motion } from 'framer-motion';
import Icon from'@/components/AppIcon';
import Image from'@/components/AppImage';

const PartnershipPhilosophy = () => {
  const philosophyPrinciples = [
    {
      title: "Long-term Thinking",
      description: "We build relationships for decades, not just transactions for today.",
      details: `Our approach to partnerships is fundamentally different from traditional trading relationships. We invest time in understanding our partners' long-term goals, market challenges, and growth aspirations. This long-term perspective allows us to provide strategic value beyond just product supply.

We work with our partners to develop multi-year roadmaps, helping them navigate market changes and capitalize on emerging opportunities. Our success is measured not just by individual transactions, but by the sustained growth and success of our partnership network.`,
      icon: "Calendar",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Mutual Growth",
      description: "Success is shared - when our partners grow, we grow together.",
      details: `We believe that the best partnerships are those where all parties benefit and grow together. Our business model is designed to align our success with our partners'success, creating win-win scenarios that strengthen over time. We actively support our partners' growth through market insights, product development collaboration, and strategic introductions. Our network effect means that as we help one partner succeed, we create opportunities for others, building a thriving ecosystem of mutual support.`,
      icon: "TrendingUp",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Cultural Respect",
      description: "Understanding and respecting diverse business cultures creates stronger bonds.",
      details: `International trade is fundamentally about connecting different cultures and business practices. We invest heavily in cultural understanding, ensuring our team is equipped to navigate the nuances of different markets and business customs.

Our multicultural team and cultural training programs ensure that we can communicate effectively and respectfully with partners from any background. This cultural sensitivity has been key to building trust and avoiding misunderstandings that often plague international business relationships.`,
      icon: "Users",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Transparent Communication",
      description: "Open, honest communication builds trust and prevents misunderstandings.",
      details: `We believe that transparency is the foundation of trust in international business. Our communication philosophy is based on proactive, honest, and comprehensive information sharing at every stage of our partnerships.

We maintain open channels of communication, provide regular updates, and address challenges head-on before they become problems. Our partners always know where they stand, what to expect, and how we're working to deliver on our commitments.`,
      icon: "MessageCircle",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const partnershipStats = [
    { number: "95%", label: "Partner Retention Rate", description: "Long-term partnerships built on trust" },
    { number: "8.5", label: "Average Partnership Duration", description: "Years of sustained collaboration" },
    { number: "350+", label: "Active Partnerships", description: "Growing network of trusted partners" },
    { number: "50+", label: "Countries Connected", description: "Global reach through partnerships" }
  ];

  const testimonials = [
    {
      quote: "Vaarunya doesn\'t just supply products; they understand our business and help us grow. Their long-term approach has been instrumental in our expansion into Asian markets.",
      author: "Maria Rodriguez",
      position: "CEO, European Imports Ltd",
      company: "Spain",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "The cultural sensitivity and understanding that Vaarunya brings to our partnership has been remarkable. They truly bridge the gap between different business cultures.",
      author: "Ahmed Al-Mansouri",
      position: "Director, Gulf Trading Co",
      company: "UAE",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "What sets Vaarunya apart is their commitment to mutual growth. They\'ve helped us identify new opportunities and supported our expansion every step of the way.",
      author: "Jennifer Chen",
      position: "Procurement Manager, TechCorp",
      company: "Singapore",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-montserrat font-medium mb-6">
            <Icon name="Handshake" size={16} className="mr-2" />
            Partnership Philosophy
          </div>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-secondary-dark mb-6">
            Building Relationships, Not Just Transactions
          </h2>
          <p className="text-xl text-secondary-light max-w-3xl mx-auto">
            Our partnership philosophy goes beyond traditional trading relationships to create lasting bonds built on trust, mutual respect, and shared success.
          </p>
        </motion.div>

    {/* Partnership Stats
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-20">
      {partnershipStats.map((stat, index) => (
        <motion.div
          key={index}
          className="card-elevated p-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl lg:text-4xl font-montserrat font-bold text-primary mb-2">
            {stat.number}
          </div>
          <div className="font-montserrat font-semibold text-secondary-dark mb-2">
            {stat.label}
          </div>
          <div className="text-sm text-secondary-light">
            {stat.description}
          </div>
        </motion.div>
      ))}
    </div> */}

        {/* Philosophy Principles */}
        <div className="space-y-16 lg:space-y-24 mb-16 lg:mb-20">
          {philosophyPrinciples.map((principle, index) => (
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
                    <Icon name={principle.icon} size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-secondary-dark">
                      {principle.title}
                    </h3>
                    <p className="text-lg text-primary font-medium">
                      {principle.description}
                    </p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-secondary-light">
                  <p className="mb-4 text-justify">{principle.details}</p>
                </div>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative overflow-hidden rounded-2xl shadow-card">
                  <Image
                    src={principle.image}
                    alt={principle.title}
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          <Icon name={principle.icon} size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="font-montserrat font-bold text-secondary-dark">
                            {principle.title}
                          </div>
                          <div className="text-sm text-secondary-light">
                            Partnership Principle
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

    {/* Partner Testimonials
    <motion.div
      className="mb-16 lg:mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-12">
        <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-secondary-dark mb-4">
          What Our Partners Say
        </h3>
        <p className="text-lg text-secondary-light">
          Hear from partners who have experienced our philosophy in action
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="card-elevated p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Icon name="Quote" size={24} className="text-primary mb-4" />
            <p className="text-secondary-dark italic mb-6">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-full">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-montserrat font-semibold text-secondary-dark">
                  {testimonial.author}
                </div>
                <div className="text-sm text-secondary-light">
                  {testimonial.position}
                </div>
                <div className="text-sm text-primary">
                  {testimonial.company}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div> */}

    {/* Partnership CTA
    <motion.div
      className="card-elevated p-8 lg:p-12 text-center bg-gradient-to-r from-primary/5 to-primary/10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Icon name="Handshake" size={48} className="text-primary mx-auto mb-6" />
      <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-secondary-dark mb-4">
        Ready to Build a Partnership?
      </h3>
      <p className="text-lg text-secondary-light mb-8 max-w-2xl mx-auto">
        Experience our partnership philosophy firsthand. Let's discuss how we can grow together in the global marketplace.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="/get-quote-intelligent-conversion-portal"
          className="btn-primary inline-flex items-center"
        >
          <Icon name="MessageSquare" size={20} className="mr-2" />
          Start Partnership Discussion
        </a>
        <a
          href="/contact-global-accessibility-hub"
          className="btn-secondary inline-flex items-center"
        >
          <Icon name="Calendar" size={20} className="mr-2" />
          Schedule Consultation
        </a>
      </div>
    </motion.div> */}
      </div>
    </section>
  );
};

export default PartnershipPhilosophy;