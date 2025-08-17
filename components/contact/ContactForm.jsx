import React, { useState, useEffect } from 'react';
import Icon from '@/components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    inquiryType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    productCategories: [],
    orderVolume: '',
    deliveryRegion: '',
    communicationFrequency: '',
    message: '',
    preferredContact: 'email',
    urgency: 'normal'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const inquiryTypes = [
    { value: 'new-business', label: 'New Business Inquiry', icon: 'Plus' },
    { value: 'existing-client', label: 'Existing Client Support', icon: 'Users' },
    { value: 'partnership', label: 'Partnership Opportunities', icon: 'Handshake' },
    { value: 'general', label: 'General Information', icon: 'Info' }
  ];

  const productCategories = [
    'Agricultural Products', 'Textiles & Garments', 'Spices & Seasonings',
    'Handicrafts & Artifacts', 'Chemicals & Pharmaceuticals', 'Electronics & Components',
    'Machinery & Equipment', 'Automotive Parts', 'Food & Beverages', 'Other'
  ];

  const orderVolumes = [
    'Less than $10,000', '$10,000 - $50,000', '$50,000 - $100,000',
    '$100,000 - $500,000', '$500,000 - $1,000,000', 'More than $1,000,000'
  ];

  const deliveryRegions = [
    'North America', 'South America', 'Europe', 'Asia Pacific',
    'Middle East', 'Africa', 'Multiple Regions'
  ];

  const communicationFrequencies = [
    'Daily Updates', 'Weekly Reports', 'Bi-weekly Check-ins',
    'Monthly Summaries', 'As Needed', 'Milestone Based'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'productCategories') {
        setFormData(prev => ({
          ...prev,
          productCategories: checked
            ? [...prev.productCategories, value]
            : prev.productCategories.filter(cat => cat !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    // Conditional validation based on inquiry type
    if (formData.inquiryType === 'new-business') {
      if (formData.productCategories.length === 0) {
        newErrors.productCategories = 'Please select at least one product category';
      }
      if (!formData.orderVolume) newErrors.orderVolume = 'Please select expected order volume';
      if (!formData.deliveryRegion) newErrors.deliveryRegion = 'Please select delivery region';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      setFormData({
        inquiryType: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        productCategories: [],
        orderVolume: '',
        deliveryRegion: '',
        communicationFrequency: '',
        message: '',
        preferredContact: 'email',
        urgency: 'normal'
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="card-elevated p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-montserrat font-bold text-secondary-dark mb-4">
          Thank You for Reaching Out!
        </h3>
        <p className="text-secondary-light mb-6">
          We've received your inquiry and will respond within our committed timeframe. 
          Check your email for a confirmation with next steps.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="btn-secondary"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }
  useEffect(() => {
      if (window.location.hash === '#contact-form') {
        const element = document.getElementById('contact-form');
        if (element) {
          element.scrollIntoView({ behavior: 'instant' });
        }
      }
    }, []);
 
  return (
    <div className="card-elevated p-8" id='contact-form'>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Inquiry Type Selection */}
        <div>
          <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-3">
            Type of Inquiry *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inquiryTypes.map((type) => (
              <label
                key={type.value}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  formData.inquiryType === type.value
                    ? 'border-primary bg-primary/5' :'border-gray-200 hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="inquiryType"
                  value={type.value}
                  checked={formData.inquiryType === type.value}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <Icon name={type.icon} size={20} className="text-primary mr-3" />
                <span className="text-sm font-medium text-secondary">{type.label}</span>
              </label>
            ))}
          </div>
          {errors.inquiryType && (
            <p className="mt-1 text-sm text-red-600">{errors.inquiryType}</p>
          )}
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your.email@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
              Company Name *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your Company Ltd."
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
              Country *
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="United States"
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country}</p>
            )}
          </div>
        </div>

        {/* Conditional Fields for New Business Inquiry */}
        {formData.inquiryType === 'new-business' && (
          <>
            {/* Product Categories */}
            <div>
              <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-3">
                Product Categories of Interest *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {productCategories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      name="productCategories"
                      value={category}
                      checked={formData.productCategories.includes(category)}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-secondary">{category}</span>
                  </label>
                ))}
              </div>
              {errors.productCategories && (
                <p className="mt-1 text-sm text-red-600">{errors.productCategories}</p>
              )}
            </div>

            {/* Order Volume and Delivery Region */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
                  Expected Order Volume *
                </label>
                <select
                  name="orderVolume"
                  value={formData.orderVolume}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                    errors.orderVolume ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select order volume</option>
                  {orderVolumes.map((volume) => (
                    <option key={volume} value={volume}>{volume}</option>
                  ))}
                </select>
                {errors.orderVolume && (
                  <p className="mt-1 text-sm text-red-600">{errors.orderVolume}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
                  Target Delivery Region *
                </label>
                <select
                  name="deliveryRegion"
                  value={formData.deliveryRegion}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                    errors.deliveryRegion ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select delivery region</option>
                  {deliveryRegions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.deliveryRegion && (
                  <p className="mt-1 text-sm text-red-600">{errors.deliveryRegion}</p>
                )}
              </div>
            </div>

            {/* Communication Frequency */}
            <div>
              <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
                Preferred Communication Frequency
              </label>
              <select
                name="communicationFrequency"
                value={formData.communicationFrequency}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              >
                <option value="">Select frequency</option>
                {communicationFrequencies.map((frequency) => (
                  <option key={frequency} value={frequency}>{frequency}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Message */}
        <div>
          <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 resize-none ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell us about your requirements, timeline, and any specific questions you have..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
              Preferred Contact Method
            </label>
            <select
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
            >
              <option value="email">Email</option>
              <option value="phone">Phone Call</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="video">Video Call</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
              Urgency Level
            </label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
            >
              <option value="normal">Urgent (2-4 hours)</option>
              <option value="high">High (6-8 hours)</option>
              <option value="urgent">Normal (Within 24 hours)</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 font-montserrat font-bold text-lg rounded-lg transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' :'bg-primary text-white hover:bg-primary-dark hover:shadow-hover hover:-translate-y-0.5'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Icon name="Loader2" size={20} className="animate-spin mr-2" />
              Submitting...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Icon name="Send" size={20} className="mr-2" />
              Send Inquiry
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;