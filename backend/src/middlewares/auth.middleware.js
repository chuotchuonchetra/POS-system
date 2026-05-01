const jwt = require('jsonwebtoken');
const authMiddleware = (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const roleMiddleware = (role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            return res.status(403).json({
                message: `Acccess denied. Required: ${role.join(', ')}`,
                success:false     
            })
        }
        next();
    }
}

module.exports = {
    authMiddleware,
    roleMiddleware
}