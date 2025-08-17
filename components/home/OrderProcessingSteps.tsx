'use client'

import React, { useEffect } from 'react';
import {
  ArrowRight,
  ArrowDown,
  ShoppingCart,
  FileText,
  CheckCircle,
  Package,
  Truck,
  MapPin
} from 'lucide-react';

const OrderProcessingSteps = () => {
  const processingSteps = [
    {
      step: 1,
      icon: ShoppingCart,
      title: 'Receiving Customer Order',
      description:
        'We carefully review and analyze your product requirements, specifications, and delivery expectations.',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50'
    },
    {
      step: 2,
      icon: FileText,
      title: 'Quotation',
      description:
        'Detailed quotation with competitive pricing, terms, and delivery timeline is prepared and shared.',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50'
    },
    {
      step: 3,
      icon: CheckCircle,
      title: 'Order Confirmation & Contract Signing',
      description:
        'Upon agreement, we formalize the partnership with comprehensive contracts and order confirmation.',
      color: 'bg-green-500',
      lightColor: 'bg-green-50'
    },
    {
      step: 4,
      icon: Package,
      title: 'Purchasing & Packaging Inspection',
      description:
        'Quality sourcing from trusted suppliers followed by rigorous packaging and quality inspection.',
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50'
    },
    {
      step: 5,
      icon: Truck,
      title: 'Shipping & Customs Clearance',
      description:
        'Professional handling of shipping logistics and customs documentation for smooth transit.',
      color: 'bg-red-500',
      lightColor: 'bg-red-50'
    },
    {
      step: 6,
      icon: MapPin,
      title: 'Final Delivery to Customer',
      description:
        'Timely delivery to your destination with complete tracking and delivery confirmation.',
      color: 'bg-teal-500',
      lightColor: 'bg-teal-50'
    }
  ];

    useEffect(() => {
    if (window.location.hash === '#order-processing-steps') {
      const element = document.getElementById('order-processing-steps');
      if (element) {
        element.scrollIntoView({ behavior: 'instant' });
      }
    }
  }, []);
  

  return (
    <div className="" id="order-processing-steps">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-secondary mb-6">
          Order Processing Journey
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Experience our streamlined 6-step process that ensures quality,
          transparency, and timely fulfillment of your export requirements.
        </p>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-8">
            {processingSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100 h-[300px] flex flex-col">
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                  <div className="absolute -top-0 -right-0 z-10">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-0 transition-transform duration-500">
                      <span className="text-white font-bold text-lg">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="w-16 h-16 bg-[#fae7bd] bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#fae7bd] group-hover:bg-opacity-20 transition-all duration-300">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600  leading-relaxed group-hover:text-gray-700 transition-colors duration-300 flex-grow">
                      {step.description}
                    </p>
                  </div>

                  <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary opacity-30"></div>

            <div className="space-y-12">
              {processingSteps.map((step, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-primary">
                      <span className="text-xs font-bold text-primary">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <div className="ml-6 flex-1">
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1 border border-gray-100 min-h-[200px] flex flex-col">
                      <h3 className="text-xl font-bold text-secondary mb-3 hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed flex-grow">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessingSteps;