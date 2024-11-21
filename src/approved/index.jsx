import "./index.css";
import React, { useEffect, useState } from "react";
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import logo from "../assets/pi_logo.png";
import SweetAlert2 from "react-sweetalert2";

function Approved() {
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeout(true);
    }, 9000); // 30000 milliseconds = 30 seconds
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className=" justify-around bg-gradient-to-tr w-screen flex flex-col items-center  h-screen from-purple-700 to-purple-900 ">
      <img alt=" logo" src={logo} />
      <div>
        <p className="font-bold text-center text-xl text-yellow-500">
          We have recieved your request. please wait while our team process your
          verification
        </p>
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
