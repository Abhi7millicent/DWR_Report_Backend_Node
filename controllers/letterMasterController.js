import letterMaster from "../models/letterMaster.js";

export const addletterType = async (req, res) => {
  try {
    const { letterType } = req.body;
    const existingLetter = await letterMaster.findOne({where:{ letterType: letterType, deleteFlag: false }});
  
        if (existingLetter) {
            // If role with the same name already exists and deleteFlag is false, return a message
            return res.status(400).json({ error: "Document already exists" });
        }
    const letter = await letterMaster.create({ letterType });
    res.status(200).json({ data: letter });
  } catch (error) {
    console.error("Error adding letter:", error);
    res.status(500).json({ error: "Error adding letter" });
  }
};

export const getletterType = async (req, res) => {
  try {
    const letter = await letterMaster.findAll();
    res.status(200).json({ data: letter });
  } catch (error) {
    console.error("Error getting letter:", error);
    res.status(500).json({ error: "Error getting letter" });
  }
};
