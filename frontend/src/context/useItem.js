import {useContext } from "react";
import ItemContext from "./item.context";

const useItems=()=>useContext(ItemContext);

export default useItems;