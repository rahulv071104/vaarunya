import React, { useState, useEffect } from 'react';
import Icon from '@/components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    inquiry_type: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    product_categories: [],
    order_volume: '',
    delivery_region: '',
    communication_frequency: '',
    message: '',
    preferred_contact: 'email',
    urgency: 'normal'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

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

  useEffect(() => {
    if (window.location.hash === '#contact-form') {
      const element = document.getElementById('contact-form');
      if (element) {
        element.scrollIntoView({ behavior: 'instant' });
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'product_categories') {
        setFormData(prev => ({
          ...prev,
          product_categories: checked
            ? [...prev.product_categories, value]
            : prev.product_categories.filter(cat => cat !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setApiError(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.inquiry_type) newErrors.inquiry_type = 'Please select an inquiry type';
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (formData.inquiry_type === 'new-business') {
      if (formData.product_categories.length === 0) {
        newErrors.product_categories = 'Please select at least one product category';
      }
      if (!formData.order_volume) newErrors.order_volume = 'Please select expected order volume';
      if (!formData.delivery_region) newErrors.delivery_region = 'Please select delivery region';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError(null);

    const submissionData = {
      ...formData,
      product_categories: formData.inquiry_type === 'new-business' ? 
        formData.product_categories : [],
      order_volume: formData.inquiry_type === 'new-business' ? 
        formData.order_volume : 'Not applicable',
      delivery_region: formData.inquiry_type === 'new-business' ? 
        formData.delivery_region : 'Not applicable',
      communication_frequency: formData.communication_frequency || 'As Needed'
    };

    try {
      const response = await fetch('/api/contact_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit inquiry');
      }

      setSubmitSuccess(true);
      setFormData({
        inquiry_type: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        product_categories: [],
        order_volume: '',
        delivery_region: '',
        communication_frequency: '',
        message: '',
        preferred_contact: 'email',
        urgency: 'normal'
      });
    } catch (error) {
      setApiError(error.message);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSuccessMessage = () => (
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

  const renderForm = () => (
    <div className="card-elevated p-8" id="contact-form">
      <form onSubmit={handleSubmit} className="space-y-6">
        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{apiError}</span>
          </div>
        )}
        <div>
          <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-3">
            Type of Inquiry *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inquiryTypes.map((type) => (
              <label
                key={type.value}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  formData.inquiry_type === type.value
                    ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="inquiry_type"
                  value={type.value}
                  checked={formData.inquiry_type === type.value}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <Icon name={type.icon} size={20} className="text-primary mr-3" />
                <span className="text-sm font-medium text-secondary">{type.label}</span>
              </label>
            ))}
          </div>
          {errors.inquiry_type && (
            <p className="mt-1 text-sm text-red-600">{errors.inquiry_type}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                errors.first_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {errors.first_name && (
              <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                errors.last_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            {errors.last_name && (
              <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
            )}
          </div>
        </div>

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

        {formData.inquiry_type === 'new-business' && (
          <>
            <div>
              <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-3">
                Product Categories of Interest *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {productCategories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      name="product_categories"
                      value={category}
                      checked={formData.product_categories.includes(category)}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-secondary">{category}</span>
                  </label>
                ))}
              </div>
              {errors.product_categories && (
                <p className="mt-1 text-sm text-red-600">{errors.product_categories}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
                  Expected Order Volume *
                </label>
                <select
                  name="order_volume"
                  value={formData.order_volume}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                    errors.order_volume ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select order volume</option>
                  {orderVolumes.map((volume) => (
                    <option key={volume} value={volume}>{volume}</option>
                  ))}
                </select>
                {errors.order_volume && (
                  <p className="mt-1 text-sm text-red-600">{errors.order_volume}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
                  Target Delivery Region *
                </label>
                <select
                  name="delivery_region"
                  value={formData.delivery_region}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                    errors.delivery_region ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select delivery region</option>
                  {deliveryRegions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.delivery_region && (
                  <p className="mt-1 text-sm text-red-600">{errors.delivery_region}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
                Preferred Communication Frequency
              </label>
              <select
                name="communication_frequency"
                value={formData.communication_frequency}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-montserrat font-semibold text-secondary-dark mb-2">
              Preferred Contact Method
            </label>
            <select
              name="preferred_contact"
              value={formData.preferred_contact}
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
              <option value="urgent">Urgent (2-4 hours)</option>
              <option value="high">High (6-8 hours)</option>
              <option value="normal">Normal (Within 24 hours)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 font-montserrat font-bold text-lg rounded-lg transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark hover:shadow-hover hover:-translate-y-0.5'
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

  return submitSuccess ? renderSuccessMessage() : renderForm();
};

export default ContactForm;