const ItemCard = ({ item }) => {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 block">
            <img
                src={item.imageUrl}
                alt={item.title}
                className="h-48 w-full object-cover rounded-lg"
            />
            <div className="mt-3">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>

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
                {item.status==="claimed"?<button disabled className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                    Veiw
                </button>: <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                    Claim
                </button>}
            </div>
        </div>
    );
}


export default ItemCard;