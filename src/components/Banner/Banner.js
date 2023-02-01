import React from "react";

function Banner({variant, isVisible, children}) {
  if (!isVisible) return;
  return (
    <div className={`${variant} banner`}>
      {children}
    </div>
  );
}

export default Banner;
