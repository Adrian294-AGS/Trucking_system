export const adminAuth = async (req, res) => {
  res.status(200).json({
    success: true,
    role: isEmailExist.role,
    message: "Success Sing In",
  });
};
