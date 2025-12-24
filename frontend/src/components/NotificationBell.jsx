import useNotification from "../context/useNotification";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const NotificationBell = () => {
    const { notification, markAsRead } = useNotification();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleNotificationClick = async (n) => {
        // e.preventDefault();
        setLoading(true);
        if (!n || !n.refrenceId) {
            console.log("no refrence id");
            return;
        }
        try {
            setLoading(true);
            await markAsRead(n._id)
            navigate(`/claims/${n.refrenceId}`);

        }
        catch (error) {
            console.error("Navigation error:", error);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    const unreadCount = (notification).filter(n => !n.isRead).length;
    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="relative">
                {unreadCount > 0 ? (
                    <div>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                            {unreadCount}
                        </span>
                        <FaBell />
                    </div>

                ) : <FaBell />}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded">
                    {notification.length === 0 ? (
                        <p className="p-3 text-sm">No notifications</p>
                    ) : (
                        notification.map((n) => (
                            <div
                                key={n._id}
                                // onClick={() => handleNotificationClick(n)}
                                className={`p-3 text-sm cursor-pointer border-b 
                ${n.isRead ? "bg-gray-50" : "bg-blue-50 font-medium"}`}
                            >
                                <p>{n.message}</p>
                                {/* {!n.isRead && n.isClaimId

                                } */}
                                {
                                    <button
                                    onClick={() => handleNotificationClick(n)}
                                    className="bg-blue-600 text-white px-4 my-2 py-2 rounded"
                                    >
                                        View Item
                                    </button>
                                }

                                <p className="text-xs text-gray-400">
                                    {new Date(n.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}


export default NotificationBell;