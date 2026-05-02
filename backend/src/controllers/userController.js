import { User } from "../models/user.models.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { profileName } = req.body;

    if (!profileName) {
      return res.status(400).json({ message: "Name is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { profileName },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
