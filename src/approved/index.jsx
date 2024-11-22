import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { currencies } from "../services/currencies";
import { useExchange } from "../context/ExchangeContext";
import logo from "../assets/pi_logo.png";

const Approved = () => {
  const navigate = useNavigate();
  const { selectedExchange } = useExchange(); // Get the selected exchange from the context
  const [baseCurrency, setBaseCurrency] = useState(currencies[0]); // Set default base currency as USD

  const handleCurrencyClick = (code) => {
    const selectedCurrency = currencies.find(
      (currency) => currency.code === code
    );
    setBaseCurrency(selectedCurrency); // Update base currency when a new one is selected
    navigate(`/swap/${code}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      {/* Header showing base currency and selected exchange details */}
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800"></h1>
        <div className="flex items-center justify-center">
          <img src={logo} alt={baseCurrency.name} className="w-12 h-12 mr-4" />
          <span className="text-xl font-semibold text-gray-700">
            ${baseCurrency.rate.toFixed(2)}
          </span>
        </div>
        <div>
          {selectedExchange && (
            <div className="flex flex-col items-center mt-6">
              <img
                src={selectedExchange.image}
                alt={selectedExchange.label}
                className="w-12 h-12 object-cover rounded-full shadow-md"
              />
              <span className="text-lg text-gray-800 mt-2">
                {selectedExchange.label}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Currency selection grid */}
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Select a Currency
        </h2>
        <div className="flex flex-col gap-4">
          {currencies.map((currency) => (
            <Link
              key={currency.code}
              to={`/swap/${currency.code}`}
              className="bg-slate-100 hover:bg-indigo-200 text-indigo-800 font-semibold py-3 px-5 rounded-md text-center flex items-center"
              onClick={() => handleCurrencyClick(currency.code)} // Update base currency on click
            >
              <img
                src={currency.image}
                alt={currency.name}
                className="w-8 h-8 mr-3" // Adjust image size and margin
              />
              {currency.name} ({currency.code})
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Approved;
