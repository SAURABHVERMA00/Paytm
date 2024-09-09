import React from "react";
import { useNavigate } from "react-router-dom";
const BottomWarning = ({ label, buttonText, to }) => {
    const navigate = useNavigate();   
  const handleNavigation = () => {
    navigate(to);
  };
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>{label}</div>
        <button type="button"  className="pointer underline pl-1 cursor-pointer" onClick={handleNavigation}> 
        {buttonText} 

        </button>
    </div>
  );
};

export default BottomWarning;
