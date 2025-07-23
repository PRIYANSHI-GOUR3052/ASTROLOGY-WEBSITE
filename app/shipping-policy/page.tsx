"use client";
import { motion } from 'framer-motion';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#23244a] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Shipping Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive information about our shipping procedures, delivery timelines, and customer service standards.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Shipping Methods */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#23244a] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Shipping Methods
            </h2>
            <div className="space-y-4 text-justify">
              <p className="text-gray-700 leading-relaxed">
                We offer multiple shipping options to accommodate your delivery preferences and requirements. All shipments are handled through our trusted logistics partners to ensure secure and timely delivery of your orders.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-[#23244a] mb-2">Standard Delivery</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Standard delivery typically takes 5-7 business days. Orders are processed within 24 hours and shipped via our standard courier service. Tracking information is provided upon shipment confirmation.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-[#23244a] mb-2">Express Delivery</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Express delivery ensures your order reaches you within 2-3 business days. This service is available for most locations and includes priority processing and handling.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-[#23244a] mb-2">Same Day Delivery</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Available in select metropolitan areas for orders placed before 12:00 PM. This premium service guarantees delivery on the same day for urgent requirements.
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-[#23244a] mb-2">International Shipping</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We provide international shipping to select countries. Delivery timelines vary by destination and typically range from 7-15 business days.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Delivery Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg border border-gray-200 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#23244a] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Delivery Timeline
            </h2>
            <div className="space-y-4 text-justify">
              <p className="text-gray-700 leading-relaxed">
                Our delivery timeline is designed to provide transparency and reliability in our shipping process. We understand the importance of timely delivery and strive to meet or exceed our stated delivery commitments.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <h3 className="font-semibold text-[#23244a] mb-4">Processing and Shipping Schedule</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-700 font-medium">Order Processing</p>
                      <p className="text-gray-600 text-sm">All orders are processed within 24 hours of placement during business days (Monday to Friday).</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-700 font-medium">Shipment Preparation</p>
                      <p className="text-gray-600 text-sm">Orders are carefully packaged and prepared for shipment within 24-48 hours of processing.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-700 font-medium">Tracking Information</p>
                      <p className="text-gray-600 text-sm">Tracking details are provided via email and SMS within 2 hours of shipment dispatch.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-700 font-medium">Delivery Confirmation</p>
                      <p className="text-gray-600 text-sm">Delivery confirmation is sent upon successful completion of the delivery process.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Shipping Costs */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg border border-gray-200 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#23244a] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Shipping Costs
            </h2>
            <div className="space-y-4 text-justify">
              <p className="text-gray-700 leading-relaxed">
                Our shipping costs are structured to provide value while ensuring reliable delivery services. We offer competitive rates and free shipping options for qualifying orders to enhance your shopping experience.
              </p>
              
              <div className="overflow-x-auto mt-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-[#23244a]">Service Type</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-[#23244a]">Delivery Time</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-[#23244a]">Cost</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-[#23244a]">Free Shipping Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Standard Delivery</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">5-7 business days</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">₹99</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Orders above ₹999</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Express Delivery</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">2-3 business days</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">₹199</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Orders above ₹1,999</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Same Day Delivery</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Same day</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">₹299</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Not applicable</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">International Shipping</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">7-15 business days</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">₹599</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Orders above ₹2,999</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* Delivery Areas */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg border border-gray-200 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#23244a] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Delivery Areas
            </h2>
            <div className="space-y-4 text-justify">
              <p className="text-gray-700 leading-relaxed">
                We provide comprehensive delivery coverage across India and select international destinations. Our delivery network is continuously expanding to serve more customers and ensure accessibility to our products and services.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-[#23244a] mb-3">Domestic Delivery</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>All major cities and metropolitan areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Tier 2 and Tier 3 cities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Rural areas with postal service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Union territories and special regions</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#23244a] mb-3">International Delivery</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>United States and Canada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>United Kingdom and European Union</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Australia and New Zealand</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Middle East and Southeast Asia</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Delivery Exceptions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-lg border border-gray-200 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#23244a] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Delivery Exceptions
            </h2>
            <div className="space-y-4 text-justify">
              <p className="text-gray-700 leading-relaxed">
                While we strive to maintain consistent delivery standards, certain circumstances may affect our delivery timeline. We are committed to transparent communication and will keep you informed of any delays or issues that may arise during the delivery process.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <h3 className="font-semibold text-[#23244a] mb-2">Common Delivery Exceptions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Public holidays and weekends may extend delivery timelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Adverse weather conditions affecting transportation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Remote locations requiring additional delivery time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Customs clearance delays for international shipments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Incorrect or incomplete delivery addresses</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Customer Support */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg border border-gray-200 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#23244a] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Customer Support
            </h2>
            <div className="space-y-4 text-justify">
              <p className="text-gray-700 leading-relaxed">
                Our customer support team is dedicated to assisting you with any shipping-related inquiries or concerns. We provide multiple channels for support to ensure you receive timely and effective assistance whenever needed.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-[#23244a] mb-2">Contact Information</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> shipping@astrologywebsite.com</p>
                    <p><strong>Phone:</strong> +91-98765-43210</p>
                    <p><strong>WhatsApp:</strong> +91-98765-43210</p>
                    <p><strong>Support Hours:</strong> 9:00 AM - 8:00 PM (IST)</p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-[#23244a] mb-2">Support Services</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Order tracking assistance</li>
                    <li>• Delivery status updates</li>
                    <li>• Address modification requests</li>
                    <li>• Delivery issue resolution</li>
                    <li>• Return and refund guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-600 text-sm leading-relaxed">
              These shipping policies are subject to change without prior notice. We recommend reviewing this information periodically to stay updated with our current shipping procedures and policies. For the most current information, please contact our customer support team.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              Last updated: December 2024
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 