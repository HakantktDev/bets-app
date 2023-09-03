import React, { useEffect } from "react";
import { useSelectedBetsContext } from "./context/SelectedBetsContext";

const BetsCart = () => {
  const { selectedBets } = useSelectedBetsContext();

  const priceCalculator = (selectedBets) => {
    if (selectedBets.length === 0) {
      return 0;
    } else {
      const total = selectedBets.reduce((acc, bet) => acc * bet.value, 1);
      const parts = String(total).split(".");
      const beforeDecimal = parts[0];
      const afterDecimal = parts.length > 1 ? parts[1].slice(0, 2) : "";
      const result = `${beforeDecimal}.${afterDecimal}`;
      return result;
    }
  };

  useEffect(() => {
    priceCalculator(selectedBets);
  }, [selectedBets]);

  return (
    <>
      <div className="bucket-bottom-right">
        {selectedBets &&
          selectedBets.map((bet, index) => (
            <div className="flex-start" key={index}>
              <div className="bucket-item-detail">
                {bet?.data?.OCG?.["1"].MBS} Kod: {bet?.data?.C} Maç: {bet?.data?.N} <span>Oran: {bet?.value}</span>
              </div>
            </div>
          ))}
        <div className="bucket-item-price">
          Toplam Tutar: <span>{priceCalculator(selectedBets)} TL</span>
        </div>
      </div>
    </>
  );
};
export default BetsCart;
