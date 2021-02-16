import React from "react";

const PricingComp = () => {
  return (
    <div id="pricing">
      <div className="pricing">
        <div className="pricing-wrapper">
          <div className="grid grid-3">
            <div className="grid-item">
              <div className="grid-item-heading bg-secondary text-center py-3">
                <h6 className="m-0">Basic plan</h6>
              </div>
              <div className="text-content text-center mt-3">
                <p className="thin">
                  Eu tristique quis dignissim lorem. Consectetur iaculis vitae
                  odio pulvinar.
                </p>
                <p>Monthly Price</p>
              </div>
              <h2 className="text-center">FREE</h2>
            </div>
            {pricingList.map((item, i) => (
              <div className="grid-item" key={i}>
                <div className="grid-item-heading bg-secondary text-center py-3">
                  <h6 className="m-0">{item.plan}</h6>
                </div>
                <div className="text-content text-center mt-3">
                  <p className="thin">{item.desc}</p>
                  <p>Monthly Price</p>
                </div>
                <h2 className="text-center grid-item-amount">
                  N{item.price}
                  <span> / Mo</span>
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingComp;

const pricingList = [
  {
    plan: "Student",
    desc: `Eu tristique quis dignissim lorem. Consectetur iaculis vitae odio pulvinar.`,
    price: 1800,
  },
  {
    plan: "Pro",
    desc: `Eu tristique quis dignissim lorem. Consectetur iaculis vitae odio pulvinar.`,
    price: 3500,
  },
];
