import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/AppIcon"; // Assuming this is a custom component in your Next.js project

const CantFindYourProduct = () => {
  return (
 <div className="text-center mt-16">
      <div className="bg-gradient-to-r from-primary/5 to-accent rounded-2xl p-8 lg:p-12">
        <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-secondary-dark mb-4">
          Can't Find What You're Looking For?
        </h3>
        <p className="text-secondary-light mb-8 max-w-2xl mx-auto">
          Our product catalog extends far beyond what's shown here. We can
          source virtually any product from India with our extensive supplier
          network.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/categories"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-montserrat font-semibold rounded-lg hover:bg-primary-dark hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
          >
            <Icon name="Search" size={20} className="mr-2" />
            Browse All Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-montserrat font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
          >
            <Icon name="MessageSquare" size={20} className="mr-2" />
           Contact Us
          </Link>
        </div>
      </div>
    </div> 
  )
}

export default CantFindYourProduct