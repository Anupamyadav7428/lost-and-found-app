const errorHandler=(err, req, res, next)=>{
    console.log("Error: ", err);

    return res.status(500).json({
        success: false,
        message: err.message || "Server Error"
    });

};


export default errorHandler;