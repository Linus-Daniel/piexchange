import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { currencies } from "../services/currencies";
import piImage from "../assets/pi_logo.png"; // Replace with your Pi image path
import { useExchange } from "../context/ExchangeContext";
const SwapScreen = () => {
  const { code, id } = useParams(); // Extract 'id' from route params
  const navigate = useNavigate();
  const currency = currencies.find((cur) => cur.code === code);
  const [piAmount, setPiAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencyAddress, setCurrencyAddress] = useState(""); // State for address input
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const { selectedExchange } = useExchange(); // Get selected exchange from context
  console.log(selectedExchange)

  if (!currency) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-xl font-bold text-red-500">Currency not found</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleAmountChange = (e) => {
    const input = e.target.value;
    setPiAmount(input);
    if (!isNaN(input) && input !== "") {
      setConvertedAmount((input * currency.rate).toFixed(6));
    } else {
      setConvertedAmount(0);
    }
  };

  const handleSwapClick = () => {
    if (currencyAddress) {
      setShowModal(true); // Show confirmation modal
    } else {
      alert("Please enter the currency address.");
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    // Proceed to payment page with the exchange ID from route params
    navigate(`/payment/${id}`); // Use 'id' from route params
  };

  const handleModalCancel = () => {
    setShowModal(false); // Close the modal if canceled
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Swap Pi to {currency.name} ({currency.code})
        </h1>

        {/* Pi Amount Input */}
        <div className="mb-4 flex flex-col items-center">
          <div className="flex items-center my-2">
            <img src={piImage} alt="Pi Currency" className="w-10 h-10" />
            <label htmlFor="piAmount" className="block text-gray-700 font-semibold">
              Enter Amount (Pi):
            </label>
          </div>
          <input
            id="piAmount"
            type="number"
            value={piAmount}
            onChange={handleAmountChange}
            placeholder="Enter Pi amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Currency Address Input */}
        <div className="mb-4 flex flex-col items-center">
          <label
            htmlFor="currencyAddress"
            className="block text-gray-700 font-semibold"
          >
            Enter {currency.name} ({currency.code}) Address:
          </label>
          <input
            id="currencyAddress"
            type="text"
            value={currencyAddress}
            onChange={(e) => setCurrencyAddress(e.target.value)}
            placeholder={`Enter ${currency.name} address`}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Converted Amount */}
        <div className="text-center bg-gray-50 py-4 rounded-lg">
          <h3 className="text-gray-600 text-lg font-semibold mb-2">Converted Amount:</h3>
          <div className="flex items-center justify-center">
            <img
              src={currency.image}
              alt={currency.name}
              className="w-8 h-8 mr-2"
            />
            <p className="text-2xl font-bold text-indigo-600">
              {convertedAmount} {currency.code}
            </p>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwapClick}
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg"
        >
          Swap
        </button>
      </div>

      {/* Modal for address confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg mx-5 w-full max-w-md">
            <h3 className="text-xl font-bold text-center mb-4">Confirm Address</h3>
            <p className="text-gray-700 text-center mb-6">
              Are you sure this is the correct address for {currency.name} ({currency.code})?
            </p>
            <p className="text-center font-semibold text-indigo-600">{currencyAddress}</p>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleModalCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <Link
               to={`/payment/${selectedExchange.id}`}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </Link >
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapScreen;
