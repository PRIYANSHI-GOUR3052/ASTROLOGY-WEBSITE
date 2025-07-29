'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Lock, CheckCircle, X } from 'lucide-react';
import axios from 'axios';

interface PaymentModalProps {
  bookingId: number;
  astrologer: {
    id: number;
    firstName: string;
    lastName: string;
    pricePerChat: number;
  };
  onPaymentSuccess: () => void;
  onClose: () => void;
}

export default function PaymentModal({ 
  bookingId, 
  astrologer, 
  onPaymentSuccess, 
  onClose 
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Check for invalid booking ID when modal opens
  useEffect(() => {
    if (!bookingId || bookingId === 0) {
      setError('Invalid booking ID. Please try booking again.');
    } else {
      setError('');
    }
  }, [bookingId]);

  const [paymentMethod, setPaymentMethod] = useState('mock');

  const handlePayment = async () => {
    setIsProcessing(true);
    setError('');

    try {
      // Validate booking ID
      if (!bookingId || bookingId === 0) {
        setError('Invalid booking ID. Please try booking again.');
        return;
      }

      // Get user from localStorage
      const user = localStorage.getItem('user');
      if (!user) {
        setError('User not authenticated');
        return;
      }

      const userData = JSON.parse(user);
      console.log('User data from localStorage:', userData);
      
      const clientId = userData.id || userData.userId;
      console.log('Extracted clientId:', clientId);

      const paymentData = {
        bookingId,
        amount: astrologer.pricePerChat,
        paymentMethod,
        clientId
      };

      console.log('Sending payment data:', paymentData);

      const response = await axios.post('/api/user/payment', paymentData);

      console.log('Payment response:', response.data);

      if (response.data.success) {
        onPaymentSuccess();
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Payment error details:', error);
      console.error('Payment error response:', error.response?.data);
      setError(error.response?.data?.error || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-96 overflow-y-scroll bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-full">
              <CreditCard className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Complete Payment</h3>
              <p className="text-sm text-gray-500">Unlock chat and video call access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Astrologer Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">
              Session with {astrologer.firstName} {astrologer.lastName}
            </h4>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Chat & Video Call Access</span>
              <span className="font-medium">₹{astrologer.pricePerChat}</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">Real-time chat messaging</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">HD video calling</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">Voice calling</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">Secure end-to-end communication</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mock"
                  checked={paymentMethod === 'mock'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-indigo-600"
                />
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium">Mock Payment (Demo)</span>
                </div>
              </label>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">Secure Payment</h4>
                <p className="text-sm text-blue-700">
                  This is a demo payment. In production, this would integrate with secure payment gateways like Stripe or Razorpay.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between py-4 border-t">
            <span className="text-lg font-semibold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-indigo-600">₹{astrologer.pricePerChat}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={isProcessing || !bookingId || bookingId === 0}
              className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Pay Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 