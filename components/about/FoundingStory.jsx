import React from 'react';
import { motion } from 'framer-motion';
import Icon from'@/components/AppIcon';
import Image from'@/components/AppImage';

const FoundingStory = () => {
  const storyData = {
    title: "Our Journey Began with a Vision",
    subtitle: "Making International Trade Accessible and Transparent",
    story: `While working closely with rural entrepreneurs and small-scale manufacturers, our founder Mithilesh Varma witnessed a critical gap despite having world-class potential, local producers were constrained by outdated systems, fragmented sourcing, and a lack of trust in the export process. These challenges inspired a bold question: What if global trade could truly serve those at the grassroots? Vaarunya was born from this idea to connect rural India to global markets through ethical sourcing, structured compliance, and value-led partnerships.
    Vaarunya is not just an export house, it is a purpose-driven bridge connecting rural strength to global markets. With transparent sourcing and global-standard quality systems at its core, every shipment we deliver reflects our commitment to trusted partnerships, operational excellence, and meaningful global connections. Staying true to the vision that shaped our foundation, we continue to redefine trade as a force for empowerment, efficiency, and lasting impact, where every shipment carries the spirit of responsible trade and inclusive growth.`,
    founderQuote: "We don\'t just facilitate transactions; we build bridges between cultures, create lasting relationships, and turn the complexity of global trade into opportunities for growth.",
    founderName: "Mithilesh Varma Rudraraju",
    founderTitle: "Founder & CEO, Vaarunya Global Exim",
    stats: [
      { number: "2015", label: "Founded" },
      { number: "500+", label: "Global Partners" },
      { number: "50+", label: "Countries Served" },
      { number: "98%", label: "Client Retention" }
    ]
  };

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-montserrat font-medium mb-6">
              <Icon name="Lightbulb" size={16} className="mr-2" />
              {storyData.subtitle}
            </div>
            <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-secondary-dark mb-6">
              {storyData.title}
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-light mb-8">
              <p className="mb-4 text-justify">{storyData.story}</p>
            </div>

        {/* Stats
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {storyData.stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl lg:text-3xl font-montserrat font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-secondary-light font-inter">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div> */}
          </motion.div>

          {/* Image & Quote */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Vaarunya Global Exim Founder"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Founder Quote */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-card">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Icon name="Quote" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-secondary-dark font-inter italic mb-3">
                    "{storyData.founderQuote}"
                  </p>
                  <div>
                    <div className="font-montserrat font-semibold text-secondary-dark">
                      {storyData.founderName}
                    </div>
                    <div className="text-sm text-secondary-light">
                      {storyData.founderTitle}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FoundingStory;