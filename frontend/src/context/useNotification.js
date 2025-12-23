import { useContext } from "react";
import NotificationContext from "./notification.context";

const useNotification=()=>useContext(NotificationContext);
export default useNotification;