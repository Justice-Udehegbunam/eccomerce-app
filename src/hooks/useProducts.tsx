import { useContext } from "react";

import produtsContext from "../context/ProductProvider";

import { UseProductContextType } from "../context/ProductProvider";

export const useProduts = (): UseProductContextType => {
  return useContext(produtsContext);
};
