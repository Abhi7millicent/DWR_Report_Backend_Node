import documentMaster from "../models/documentMaster.js";

export const addDocumentType = async (req, res) => {
    try {
        const { name } = req.body;
        const document = await documentMaster.create({ name });
        res.status(200).json({data: document});
      } catch (error) {
        console.error("Error adding document:", error);
        res.status(500).json({ error: "Error adding document" });
      }
};

export const getDocumentType = async (req, res) => {
    try {
        const document = await documentMaster.findAll();
        res.json(200).json({data: document});
      } catch (error) {
        console.error("Error getting document:", error);
        res.status(500).json({ error: "Error getting document" });
      }
};