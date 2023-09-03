import React from "react";
import Bets from "./Bets";
import BetsCart from "./BetsCart";
import { SelectedBetsProvider } from "./context/SelectedBetsContext";

const App = () => {
  return (
    <SelectedBetsProvider>
      <Bets />
      <BetsCart />
    </SelectedBetsProvider>
  );
};

export default App;
