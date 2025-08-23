"use client";
import { motion } from 'framer-motion';

export default function ReturnPolicyPage() {
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
            Return Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive information about our return procedures, refund policies, and customer satisfaction guarantees.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Return Guidelines */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#23244a] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Return Guidelines
            </h2>
            <div className="space-y-4 text-justify">
              <p className="text-gray-700 leading-relaxed">
                We strive to ensure your complete satisfaction with our products and services. Our return policy is designed to provide transparency and ease in the return process while maintaining the integrity of our spiritual and astrological products.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-[#23244a] mb-2">Return Window</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Most products can be returned within 30 days of delivery. Items must be in original condition, unused, and with all original packaging and accessories intact.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-[#23244a] mb-2">Condition Requirements</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Products must be in their original, unopened condition. Items that have been used, damaged, or altered cannot be accepted for return.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-[#23244a] mb-2">Return Authorization</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    All returns require prior authorization from our customer service team. Contact us within the return window to initiate the process.
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-[#23244a] mb-2">Return Shipping</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Customers are responsible for return shipping costs unless the return is due to our error or defective products.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Return Process */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg border border-gray-200 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#23244a] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Return Process
            </h2>
            <div className="space-y-4 text-justify">
              <p className="text-gray-700 leading-relaxed">
                Our return process is designed to be simple and efficient. We guide you through each step to ensure a smooth return experience and timely resolution of your request.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <h3 className="font-semibold text-[#23244a] mb-4">Step-by-Step Return Process</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-700 font-medium">Contact Customer Service</p>
                      <p className="text-gray-600 text-sm">Reach out to our support team within 30 days of delivery to initiate your return request.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-700 font-medium">Return Authorization</p>
                      <p className="text-gray-600 text-sm">We review your request and provide return authorization if the item is eligible for return.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-700 font-medium">Package and Ship</p>
                      <p className="text-gray-600 text-sm">Securely package the item with all original materials and ship to our designated address.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-700 font-medium">Refund Processing</p>
                      <p className="text-gray-600 text-sm">Once received and inspected, we process your refund within 5-7 business days.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Return Categories */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg border border-gray-200 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#23244a] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Return Categories
            </h2>
            <div className="space-y-4 text-justify">
              <p className="text-gray-700 leading-relaxed">
                Understanding which products are eligible for return helps ensure a smooth process. We categorize our products based on their nature and return eligibility to provide clear guidelines.
              </p>
              
              <div className="overflow-x-auto mt-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-[#23244a]">Product Category</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-[#23244a]">Return Eligibility</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-[#23244a]">Time Limit</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-[#23244a]">Special Conditions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Gemstones & Crystals</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Eligible</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">30 days</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Unused, original packaging</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Astrological Books</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Eligible</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">30 days</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Unread, no damage</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Personalized Reports</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Non-returnable</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">N/A</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Custom content</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Online Services</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Non-returnable</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">N/A</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600">Digital delivery</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* Refund Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg border border-gray-200 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#23244a] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Refund Information
            </h2>
            <div className="space-y-4 text-justify">
              <p className="text-gray-700 leading-relaxed">
                We process refunds promptly and transparently to ensure you receive your money back in a timely manner. Our refund process is designed to be straightforward and customer-friendly.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-[#23244a] mb-3">Refund Timeline</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Refund processing: 5-7 business days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Bank processing: 3-5 business days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Total timeline: 8-12 business days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Email confirmation sent</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#23244a] mb-3">Refund Methods</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Original payment method</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Credit/Debit card refunds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Digital wallet refunds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Bank transfer options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Return Exceptions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-lg border border-gray-200 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#23244a] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Return Exceptions
            </h2>
            <div className="space-y-4 text-justify">
              <p className="text-gray-700 leading-relaxed">
                While we maintain a customer-friendly return policy, certain circumstances and product types may not be eligible for return. We are committed to clear communication about these exceptions.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <h3 className="font-semibold text-[#23244a] mb-2">Non-Returnable Items</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Personalized astrological reports and consultations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Digital products and downloadable content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Items used in spiritual practices or ceremonies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Products marked as &quot;Final Sale&quot; or &quot;Non-Returnable&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Items without original packaging or accessories</span>
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
                Our customer support team is dedicated to assisting you with any return-related inquiries or concerns. We provide multiple channels for support to ensure you receive timely and effective assistance.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-[#23244a] mb-2">Contact Information</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> support@nakshatragyaan.com</p>
                    <p><strong>Phone:</strong> +91-98765-43210</p>
                    <p><strong>WhatsApp:</strong> +91-98765-43210</p>
                    <p><strong>Support Hours:</strong> 9:00 AM - 8:00 PM (IST)</p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-[#23244a] mb-2">Support Services</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Return authorization requests</li>
                    <li>• Return process guidance</li>
                    <li>• Refund status updates</li>
                    <li>• Return shipping assistance</li>
                    <li>• Product condition assessment</li>
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
              These return policies are subject to change without prior notice. We recommend reviewing this information periodically to stay updated with our current return procedures and policies. For the most current information, please contact our customer support team.
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
