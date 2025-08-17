import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from'@/components/AppIcon';
import Image from'next/image';
import slide1 from '@/founders/mithilesh.jpeg';
import slide2 from '@/founders/sri ram.jpeg';
import slide3 from '@/founders/suraya.jpeg';


const LeadershipTeam = () => {
  const [activeLeader, setActiveLeader] = useState(0);

  const teamData = [
    {
      name: "Rudraraju Mithilesh Varma",
      position: "Founder & CEO",
      experience: "15+ Years",
      image: slide1,
      bio: `Rudraraju Mithilesh Varma is the Founder and Chief Executive Officer of Vaarunya Global EXIM, the driving force behind its vision to redefine India’s presence in global trade through an integrated, ethical, and impact-oriented export ecosystem that connects rural India directly to international markets. As a first-generation entrepreneur, He brings a bold and future-focused vision rooted in strategic foresight, strengthened by data-driven leadership, refined through operational excellence, and backed by deep expertise in agriculture, leather, and FMCG exports.
      With an unwavering commitment to transparency, innovation, and rural empowerment, Mithilesh has architected Vaarunya’s brand-led and compliance-driven model, bridging the gap between grassroots producers and international markets. His leadership is distinguished by a systems-thinking mindset, data-driven strategy, and the ability to build high-trust global partnerships.`,
      philosophy: "True leadership is not about commanding growth-it’s about cultivating ecosystems where trust, impact, and innovation thrive from the grassroots to the globe.",
      certifications: ["MBA - International Business", "FIEO Certified", "Export-Import Management"],
      specialties: ["Strategic Planning", "International Relations", "Trade Policy"]
    },
    {
      name: "Surya Teja Veeramachaneni",
      position: "Co-Founder and Chairman",
      experience: "12+ Years",
      image: slide3,
      bio: `Surya Teja Veeramachineni is the Co-Founder and Chairman of Vaarunya Global EXIM, providing visionary leadership and shaping the company’s strategic direction, governance, and long-term positioning. With a deep-rooted belief in sustainable growth and inclusive value creation, Surya Teja plays a key role in shaping Vaarunya’s long-term strategy, governance, and global positioning.
      He brings a sharp entrepreneurial mindset and a strong focus on innovation, risk management, and stakeholder alignment ensuring the company remains resilient, future-focused, and impact-driven. As Chairman, Surya Teja champions Vaarunya’s mission of building a transparent, ethical, and high-performing export ecosystem that benefits both grassroots producers and global trade partners.
      His leadership continues to inspire the company’s pursuit of excellence, responsibility, and long-term impact.`,
      philosophy: "Business is not just about profit; it's about building relationships that create value for everyone involved.",
      certifications: ["M.Sc. Supply Chain Management", "Six Sigma Black Belt", "PMP Certified"],
      specialties: ["Operations Management", "Quality Assurance", "Process Optimization"]
    },
    {
      name: "Kusampudi Venkata Sriram Varma",
      position: "Co-Founder and Managing Director",
      experience: "10+ Years",
      image: slide2, 
      bio: `Kusampudi Venkata Sriram Varma is the Co-Founder and Managing Director of Vaarunya Global EXIM, playing a pivotal role in steering the company’s operational excellence and strategic growth. With a strong background in export management and business development, Sriram brings a pragmatic and results-driven approach to driving Vaarunya’s mission of transparent, quality-led exports that empower grassroots producers.
      His expertise spans supply chain optimization, compliance adherence, and building sustainable partnerships across agriculture, leather, and FMCG sectors. Sriram’s leadership is marked by his commitment to operational rigor, innovation, and fostering a culture of accountability ensuring that Vaarunya delivers consistent value to its global clients and Indian partners alike.`,
      philosophy: "Success is not just achieving milestones, but creating a culture where purpose drives performance, and values guide every decision.",
      certifications: ["International Commerce Degree", "Cultural Studies Certification", "Trade Finance Specialist"],
      specialties: ["Market Expansion", "Cross-cultural Communication", "Partnership Development"]
    },

  ];
  useEffect(() => {
      if (window.location.hash === '#leadership-team') {
        const element = document.getElementById('order-processing-steps');
        if (element) {
          element.scrollIntoView({ behavior: 'instant' });
        }
      }
    }, []);

  return (
    <section className="py-16 lg:py-20 bg-background" id='leadership-team'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-montserrat font-medium mb-6">
            <Icon name="Users" size={16} className="mr-2" />
            Leadership Team
          </div>
          <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-secondary-dark mb-6">
            Meet the Minds Behind Our Success
          </h2>
          <p className="text-xl text-secondary-light max-w-3xl mx-auto">
            Our leadership team combines decades of international trade expertise with a shared commitment to ethical business practices.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Team Grid - Mobile/Tablet */}
          <div className="lg:hidden space-y-8">
            {teamData.map((leader, index) => (
              <motion.div
                key={index}
                className="card-elevated p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-16 h-16 overflow-hidden rounded-full">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-montserrat font-semibold text-secondary-dark">
                      {leader.name}
                    </h3>
                    <p className="text-primary font-medium">{leader.position}</p>
                  {/* <p className="text-sm text-secondary-light">{leader.experience}</p> */}
                  </div>
                </div>
                <p className="text-secondary-light mb-4">{leader.bio}</p>
                <div className="border-l-4 border-primary pl-4 mb-4">
                  <p className="text-secondary-dark italic">"{leader.philosophy}"</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {leader.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-accent text-secondary text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Selection - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {teamData.map((leader, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveLeader(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    activeLeader === index
                      ? 'bg-primary text-white shadow-card'
                      : 'bg-surface hover:bg-accent text-secondary-dark'
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full flex-shrink-0">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold">
                        {leader.name}
                      </h3>
                      <p className={`text-sm ${
                        activeLeader === index ? 'text-white/80' : 'text-secondary-light'
                      }`}>
                        {leader.position}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Leader Details - Desktop */}
          <div className="hidden lg:block lg:col-span-2">
            <motion.div
              key={activeLeader}
              className="card-elevated p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start space-x-6 mb-6">
                <div className="relative w-24 h-24 overflow-hidden rounded-xl flex-shrink-0">
                  <Image
                    src={teamData[activeLeader].image}
                    alt={teamData[activeLeader].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-montserrat font-bold text-secondary-dark mb-2">
                    {teamData[activeLeader].name}
                  </h3>
                  <p className="text-primary font-semibold text-lg mb-1">
                    {teamData[activeLeader].position}
                  </p>
                {/* <p className="text-secondary-light">
                  {teamData[activeLeader].experience} Experience
                </p> */}
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-secondary-light mb-6">
                <p className="mb-4 text-justify">{teamData[activeLeader].bio}</p>
              </div>

              <div className="border-l-4 border-primary pl-6 mb-6">
                <Icon name="Quote" size={20} className="text-primary mb-2" />
                <p className="text-secondary-dark italic text-lg">
                  "{teamData[activeLeader].philosophy}"
                </p>
              </div>

            {/* <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-montserrat font-semibold text-secondary-dark mb-3">
                  Certifications
                </h4>
                <ul className="space-y-2">
                  {teamData[activeLeader].certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center text-secondary-light">
                      <Icon name="Award" size={16} className="text-primary mr-2 flex-shrink-0" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-montserrat font-semibold text-secondary-dark mb-3">
                  Specialties
                </h4>
                <div className="flex flex-wrap gap-2">
                  {teamData[activeLeader].specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-accent text-secondary text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div> */}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;