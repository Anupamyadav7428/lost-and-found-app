import { useEffect, useState } from "react";
import NotificationContext from "./notification.context";
import api from "../api/axios";
import useAuth from "./useAuth";
import socket from "../api/socket"

const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState([]);
    const [loading, setLoading] = useState(false);
    

    // const { isLoggedIn } = isAuth();
    const {isLoggedIn, user}=useAuth();

    const fetchNotification = async () => {

        try {
            setLoading(true);
            const res = await api.get("/user/notification/");
            console.log(res.data);
            setNotification(res.data.notifications || []);

        }
        catch (err) {
            console.error("Failed to fetch notifications", err);
        }
        finally {
            setLoading(false);
        }
    }

    const markAsRead = async (id) => {

        try {
            setLoading(true);
            const res = await api.put(`/user/notification/read/${id}`);
            console.log(res);
            setNotification((prev) =>
                prev.map((n) =>
                    n._id === id ? { ...n, isRead: true } : n
                )
            );

        }
        catch (err) {
            console.log("Failed to mark read notification", err);
        }
        finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        console.log(isLoggedIn);
        if(isLoggedIn){
            fetchNotification();
        }
        else{
            setNotification([]);
        }
    }, [isLoggedIn]);
    useEffect(() => {
    if (!isLoggedIn || !user) return;

    socket.auth = { userId: user._id };
    socket.connect();

    socket.emit("join", user._id);

    socket.on("newNotification", (data) => {
      setNotification((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("newNotification");
      socket.disconnect();
    };
  }, [isLoggedIn, user]);


    return (<NotificationContext.Provider value={{ notification, loading, fetchNotification, markAsRead }}>{children}</NotificationContext.Provider>);
}

export default NotificationProvider;