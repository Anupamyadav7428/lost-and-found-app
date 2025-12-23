import { useEffect, useState } from "react";
import NotificationContext from "./notification.context";
import api from "../api/axios";
import useAuth from "./useAuth";

const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState([]);
    const [loading, setLoading] = useState(false);

    // const { isLoggedIn } = isAuth();
    const {isLoggedIn}=useAuth();

    const fetchNotification = async () => {

        try {
            setLoading(true);
            const res = await api.get("/user/notification/");
            console.log(res.data.notifications);
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


    return (<NotificationContext.Provider value={{ notification, loading, fetchNotification, markAsRead }}>{children}</NotificationContext.Provider>);
}

export default NotificationProvider;