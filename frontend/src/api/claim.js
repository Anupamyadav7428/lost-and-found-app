import api from "./axios"


const sendClaimRequest= async(itemId)=>{
    const res= await api.put(`/items/claim/${itemId}`);
    // const errorData=await res.json();
    console.log(res);
    return res;

}
const approveClaim=async(claimId)=>{
    const res= await api.patch(`/claim/approve/${claimId}`);
    console.log(res);
    return res;
    
}
const rejectClaim =async(claimId)=>{
    const res= await api.patch(`/claim/reject/${claimId}`);
    console.log(res);
    return res;
    
}


export {sendClaimRequest, approveClaim, rejectClaim};