import leaveMaster from "../models/leaveMaster.js";

export const addleaveType = async (req, res) => {
    try {
        const { name } = req.body;
        const leave = await leaveMaster.create({ name });
        res.status(200).json({data: leave});
      } catch (error) {
        console.error("Error adding leave:", error);
        res.status(500).json({ error: "Error adding leave" });
      }
};

export const getleaveType = async (req, res) => {
    try {
        const leave = await leaveMaster.findAll();
        res.json(200).json({data: leave});
      } catch (error) {
        console.error("Error getting leave:", error);
        res.status(500).json({ error: "Error getting leave" });
      }
};