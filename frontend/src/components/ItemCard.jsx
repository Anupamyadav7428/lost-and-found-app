import useAuth from "../context/useAuth";
import { sendClaimRequest, approveClaim, rejectClaim } from "../api/claim";
import toast from "react-hot-toast";
const ItemCard = ({ item }) => {
    const { user } = useAuth();
    const handleClaim = async (e) => {
        // if (item.postedBy._id === user._id) return null;
        e.preventDefault();
        if (!user) {
            toast.error("Please login first");
            return;
        }
        // if (item.postedBy._id == user._id) {
        //     toast.error("You can not claim your own item");
        //     return;
        // }
        try {

            const res = await sendClaimRequest(item._id);
            console.log(res.data);
            toast.success(res.data.message);
        }
        catch (err) {
            toast.error(err.response?.data?.message || "Claim Failed");
        }
    }

    return (
        <div className="bg-white border-2 rounded-xl shadow hover:shadow-lg transition p-4 block">
            <img
                src={item.imageUrl}
                alt={item.title}
                className="h-48 w-full object-contain rounded-lg "
            />
            <div className="mt-3">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-sm, text-gray-500">{item.description}</p>

                <span
                    className={`inline-block mt-2 px-3 py-1 text-xs rounded-full 
                            ${item.status === "lost"
                            ? "bg-red-100 text-red-600"
                            : item.status === "found"
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-200 text-gray-600"
                        }`}
                >
                {item.status.toUpperCase()}
                </span>
                {item.status === "claimed" ? <button disabled className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                    claimed
                </button> : <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700" onClick={handleClaim}>
                    {item.status==="claimed"?"Already Claimed": "Claim"}
                </button>}
            </div>
        </div>
    );
}


export default ItemCard;