import { useContext } from "react";
import ItemContext from "../context/item.context";
import ItemCard from "../components/ItemCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";


const Home = () => {
  const navigate = useNavigate();
  const {user}=useAuth();
  const { items, loading, fetchItems, filters, setFilters } =
    useContext(ItemContext);

  const handleStatusFilter = (status) => {
    setFilters(prev => ({ ...prev, status }));
    fetchItems({ status });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, keyword: value }));
    fetchItems({ keyword: value });
  };

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <button onClick={() => handleStatusFilter("")}>All</button>
        <button onClick={() => handleStatusFilter("lost")}>Lost</button>
        <button onClick={() => handleStatusFilter("found")}>Found</button>
        <button onClick={() => handleStatusFilter("claimed")}>Claimed</button>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search item..."
          onChange={handleSearch}
          className="border p-2 mb-4 w-3/4"
        />
        {/* {console.log(isLogedIn)} */}
        {user &&(<div className="flex items-center gap-2">
          <button className="bg-black p-1 rounded-full flex items-center justify-center" onClick={() => navigate("/create-item")}>
            <IoIosAddCircleOutline className="text-white" size={20} />
          </button>
          <p className="text-sm font-medium mb-2">Add item</p>
        </div>)}
      </div>

      {/* Items */}
      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {items.map(item => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
