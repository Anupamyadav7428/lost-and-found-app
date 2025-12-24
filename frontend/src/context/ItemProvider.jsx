import { useEffect, useState } from "react";
import ItemContext from "./item.context";
import api from "../api/axios";
import toast from "react-hot-toast";

const ItemProvider = ({ children }) => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [filters, setFilters] = useState({
        category: "",
        status: "",
        keyword: ""
    });

    const fetchItems = async (customFilters = {}) => {

        try {
            setLoading(true);
            const res = await api.get(`/items/`, { params: { page, limit, ...filters, ...customFilters } });
            console.log(res);
            setItems(res.data.items);
            if (!res.data.items || res.data.items.length === 0) {
                toast("No items found", { icon: "📭" });
            }
        }
        catch (err) {
            console.error("Failed to fetch items", err);
            toast.error(
                err?.response?.data?.message || "Failed to fetch items"
            );
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchItems();
    }, [page]);
    return <ItemContext.Provider value={{ loading, setLoading, items, setItems, fetchItems, page, setPage, filters, setFilters }}>{children}</ItemContext.Provider>
}

export default ItemProvider;