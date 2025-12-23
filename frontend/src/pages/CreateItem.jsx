import { useState } from "react";

const CreateItem = () => {
    const [loading, setLoading]=useState();

    const handleChange=()=>{

    }
    const handleSubmit=(e)=>{
        e.preventDefalut();

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
            >
                <h2 className="text-xl font-bold text-center">Upload Item</h2>

                <input
                    name="title"
                    placeholder="Item title"
                    className="input"
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="input"
                    onChange={handleChange}
                    required
                />

                <select
                    name="category"
                    className="input"
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    <option>Wallet</option>
                    <option>Phone</option>
                    <option>Charger</option>
                    <option>Bag</option>
                    <option>Other</option>
                </select>

                <select
                    name="status"
                    className="input"
                    onChange={handleChange}
                >
                    <option value="found">Found</option>
                    <option value="lost">Lost</option>
                </select>

                <input
                    name="latitude"
                    placeholder="Latitude"
                    className="input"
                    onChange={handleChange}
                    required
                />

                <input
                    name="longitude"
                    placeholder="Longitude"
                    className="input"
                    onChange={handleChange}
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />

                <button
                    disabled={loading}
                    className="w-full bg-black text-white py-2 rounded"
                >
                    {loading ? "Uploading..." : "Submit"}
                </button>
            </form>
        </div>


    );
};

export default CreateItem;