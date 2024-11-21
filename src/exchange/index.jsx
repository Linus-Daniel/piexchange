import React from 'react';
import { Link } from 'react-router-dom';
import pilogo from "../assets/pi_logo.png";
import { exchanges } from '../services/exchange';
import { useExchange } from '../context/ExchangeContext';

function Exchange() {
  const { selectExchange } = useExchange(); // Get the selectExchange function from context

  const handleSelectExchange = (exchange) => {
    selectExchange(exchange); // Select the exchange and update the context
  };

  return (
    <main className="bg-gray-100 min-h-screen py-10">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <img src={pilogo} alt="Pi Logo" className="w-20 h-20" />
          <h3 className="text-lg font-semibold mt-3 text-gray-800">
            Welcome to the Pi Browser
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-8 items-center justify-center w-full max-w-xl p-5 rounded-lg">
          {exchanges.map((item) => (
            <Link
              key={item.id}
              to={"/approved"}
              className="flex items-center gap-2 flex-col text-center cursor-pointer"
              onClick={() => handleSelectExchange(item)} // Select the exchange on click
            >
              <div className="border border-black rounded-lg overflow-clip w-16 h-16">
                <img
                  src={item.image}
                  alt={`${item.label} logo`}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-purple-700 text-sm font-medium">{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Exchange;
