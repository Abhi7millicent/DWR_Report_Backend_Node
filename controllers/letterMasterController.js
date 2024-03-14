import letterMaster from "../models/letterMaster.js";

export const addletterType = async (req, res) => {
    try {
        const { name } = req.body;
        const letter = await letterMaster.create({ name });
        res.status(200).json({data: letter});
      } catch (error) {
        console.error("Error adding letter:", error);
        res.status(500).json({ error: "Error adding letter" });
      }
};

export const getletterType = async (req, res) => {
    try {
        const letter = await letterMaster.findAll();
        res.json(200).json({data: letter});
      } catch (error) {
        console.error("Error getting letter:", error);
        res.status(500).json({ error: "Error getting letter" });
      }
};