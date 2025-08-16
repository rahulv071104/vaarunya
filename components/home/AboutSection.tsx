import { Globe, Award, Users, Truck } from 'lucide-react';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section id="about" className="py-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Us Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-10">
          <div className="space-y-6 text-justify">
            <h2 className="text-4xl font-bold text-secondary mb-6">About Vaarunya</h2>
            <p className="text-md text-gray-700 leading-relaxed">
              Vaarunya Global EXIM Pvt Ltd is a brand-led export house specializing in agriculture, leather, and FMCG commodities including spices, dairy, seafood, processed foods, and raw to finished leather. We source directly from certified MSMEs, SHGs, rural entrepreneurs, and proprietary organic farms ensuring transparent, demand-driven procurement that uplifts grassroots producers.
              Our commitment to quality is embedded at every stage, backed by in-house inspections, batch-level testing, and strict compliance with international packaging standards. This ensures product integrity and reliability in every shipment we deliver.
            </p>
            <p className="text-md text-gray-700 leading-relaxed">
              Driven by an integrated, innovation-led model, Vaarunya seamlessly connects Indian producers with global buyers promoting sustainable trade and consistent excellence across markets.
              At Vaarunya, we don’t just facilitate trade, we build enduring partnerships rooted in trust, transparency, and mutual growth. Our competitive pricing, client-first approach, and dedicated end-to-end support have made us a trusted choice for businesses across continents, making global trade secure, accessible, and rewarding for enterprises of all sizes. 
            </p>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-2.5 bg-primary text-white font-montserrat font-semibold rounded-lg hover:bg-primary-dark hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              Know More
            </Link>
          </div>
          
          <div className="lg:order-first">
            <img
              src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              alt="About Varunaya"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className=" text-center lg:text-left">
          <p className="text-2xl italic text-primary font-medium flex justify-center">
            "Join us as we shape the future of global trade — one successful transaction at a time."
          </p>
        </div>

     
      </div>
    </section>
  );
};

export default AboutSection;