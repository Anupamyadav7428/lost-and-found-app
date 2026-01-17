import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
const ClaimDetail =() => {
    const [loading, setLoading] = useState(false);
    const [claim, setClaim] = useState(null);
    const { id } = useParams();
    const handleApprove = async () => {
        const res = await api.patch(`/claim/approve/${id}`);
        setClaim(prev => ({
            ...prev,
            status: "approved"
        }));
        toast.success(res.data.message);
    }

    const handleReject = async () => {
        const res = await api.patch(`/claim/reject/${id}`);
        setClaim(prev => ({
            ...prev,
            status: "rejected"
        }));
        toast.success(res.data.message);
    }

    useEffect(() => {
        const fetchClaim = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/claim/${id}`);
            setClaim(res.data.claim);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    fetchClaim();
    }, [id, ]);

    if (!claim) return <p>Loading...</p>;

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-8 ">
            <img src={claim.itemId.imageUrl} className="rounded mb-3 object-contain" />
            <h2 className="text-xl font-bold">{claim.itemId.title}</h2>
            <p className="text-gray-600">
                Claimed by: {claim.claimerId.name} || email: {claim.claimerId.email}

            </p>

            {claim.status === "pending" && (
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={handleApprove}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Approve
                    </button>
                    <button
                        onClick={handleReject}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Reject
                    </button>
                </div>
            )}

            {claim.status !== "pending" && (
                <p className="mt-4 font-semibold">
                    Status: {claim.status.toUpperCase()}
                </p>
            )}
        </div>
    );
};

export default ClaimDetail;