import React from "react";

const IntroItem = ({ icon, label, value }) => {
  let formattedValue = value;

  // Check if value is a valid date string
  if (value && !isNaN(Date.parse(value))) {
    const date = new Date(value);
    const options = { day: "numeric", month: "long", year: "numeric" };
    formattedValue = date.toLocaleDateString(undefined, options);
  }

  return (
    value && (
      <div className="flex items-center gap-1.5">
        <img src={icon} alt={`${label} Icon`} className="w-10 h-10" />
        <div className="">{label}</div>
        <div className="font-semibold">{formattedValue}</div>
      </div>
    )
  );
};

export default IntroItem;
