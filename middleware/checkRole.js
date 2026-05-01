export const checkRole = async (req, res, next) => {
    const {role} = req.user;
    if(role != "Admin"){
        return res.status(403).json({success: false, message: "This page is for authorized administrators only."});
    }
    next();
};