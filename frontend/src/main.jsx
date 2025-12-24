import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthProvider.jsx";
import "./index.css";
import ItemProvider from "./context/ItemProvider.jsx";
import NotificationProvider from "./context/notificationProvider.jsx";
import {Toaster} from "react-hot-toast";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-right" toastOptions={{duration: 3000}}/>
    <ItemProvider>
      <AuthProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </AuthProvider>
    </ItemProvider>
  </React.StrictMode>
);
