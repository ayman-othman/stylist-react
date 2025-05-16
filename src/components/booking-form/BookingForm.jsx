import { useState } from "react";

const BookingForm = ({
  formik,
  showPaymentForm,
  paymentFormik,
  paymentMethod,
  onPaymentMethodChange,
  bookingSuccess,
}) => {
  if (bookingSuccess) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 bg-white rounded-lg shadow-md text-center">
        <div className="text-green-600 mb-4">
          Booking confirmed! You'll be redirected to the homepage shortly.
        </div>
      </div>
    );
  }

  if (showPaymentForm) {
    return (
      <div
        id="booking-form"
        className="max-w-2xl mx-auto my-16 p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>

        <form onSubmit={paymentFormik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Select Payment Method *
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => onPaymentMethodChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Choose payment method</option>
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {paymentMethod === "credit_card" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentFormik.values.cardNumber}
                  onChange={paymentFormik.handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentFormik.values.expiryDate}
                    onChange={paymentFormik.handleChange}
                    placeholder="MM/YY"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentFormik.values.cvv}
                    onChange={paymentFormik.handleChange}
                    placeholder="123"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === "bank_transfer" && (
            <div className="mb-4">
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="mb-2">
                  Please transfer to the following bank account:
                </p>
                <div className="space-y-1">
                  <p>
                    <strong>Bank Name:</strong> Example Bank
                  </p>
                  <p>
                    <strong>Account Name:</strong> Styled Fashion Services
                  </p>
                  <p>
                    <strong>Account Number:</strong> 1234567890
                  </p>
                  <p>
                    <strong>Sort Code:</strong> 12-34-56
                  </p>
                </div>
              </div>

              <label className="block text-sm font-medium mb-1">
                Transfer Reference Number *
              </label>
              <input
                type="text"
                name="transferReference"
                value={paymentFormik.values.transferReference}
                onChange={paymentFormik.handleChange}
                placeholder="Enter your transfer reference"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                PayPal Email *
              </label>
              <input
                type="email"
                name="paypalEmail"
                value={paymentFormik.values.paypalEmail}
                onChange={paymentFormik.handleChange}
                placeholder="your@email.com"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                You will be redirected to PayPal to complete your payment.
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Pay Now
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      id="booking-form"
      className="max-w-2xl mx-auto my-16 p-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Book an Appointment
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Select Package *
          </label>
          <select
            name="package"
            onChange={formik.handleChange}
            value={formik.values.package}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Choose a package</option>
            <option value="basic">Basic Package (1 hour - $100)</option>
            <option value="premium">Premium Package (2 hours - $150)</option>
          </select>
          {formik.errors.package && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.package}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date *</label>
            <input
              type="date"
              name="date"
              onChange={formik.handleChange}
              value={formik.values.date}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {formik.errors.date && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.date}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time *</label>
            <input
              type="time"
              name="time"
              onChange={formik.handleChange}
              value={formik.values.time}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {formik.errors.time && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.time}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Details</label>
          <textarea
            name="details"
            onChange={formik.handleChange}
            value={formik.values.details}
            placeholder="Describe what type of styling service you need..."
            className="w-full p-2 border border-gray-300 rounded h-24"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
