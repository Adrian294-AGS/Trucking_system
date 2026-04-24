export const adminAuth = async (req, res) => {
  const {accessToken, UID, Role} = req.user;
  res.status(200).json({
    success: true,
    role: Role,
    accessToken: accessToken,
    message: "Success Sing In",
  });
};
