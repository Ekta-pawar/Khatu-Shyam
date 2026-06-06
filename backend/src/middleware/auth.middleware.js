exports.authMiddleware = async(req , res)=>{
    try{
        const {token} = req.cookies

        if(token){
            res
        }


    }catch(error){
        console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error During Login",
      error: error.message,
    });
    }
}