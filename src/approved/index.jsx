import "./index.css";
import React, { useEffect, useState } from "react";
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import logo from "../assets/pi_logo.png";
import SweetAlert2 from "react-sweetalert2";
import { useParams } from "react-router-dom";
import { exchanges } from "../services/exchange";

function Approved() {
  const [isTimeout, setIsTimeout] = useState(false);
  const { id } = useParams();
  const method = exchanges.find((item) => item.id === parseInt(id, 10));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeout(true);
    }, 9000); // 30000 milliseconds = 30 seconds
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className=" justify-around bg-gradient-to-tr w-screen flex flex-col items-center  h-screen">
 
        <div className="flex">
        <img alt=" logo" src={logo} />
          <img src={method.image} alt="exchange_logo" />

      </div>

      <div>
        {!isTimeout ? (
          <div>
            <Spinner size={30} speed={0.5} />
          </div>
        ) : (
          <div>
            <SweetAlert2
              show={true}
              icon="success"
              title={"Congratulations"}
              text="Wallet Linked successfully! "
            />

            {/* Content to show after 30 seconds if needed */}
            {/* <p className="text-slate-200">Verification failed. Please check your network and try again.</p> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Approved;
