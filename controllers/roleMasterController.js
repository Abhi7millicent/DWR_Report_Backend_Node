import roleMasterSchema from "../models/roleMaster.js";

export const addRole = async (req, res) => {
    try {
        const { name } = req.body;
        const role = await roleMasterSchema.create({ name });
        res.status(200).json({data: role});
      } catch (error) {
        console.error("Error adding role:", error);
        res.status(500).json({ error: "Error adding role" });
      }
};

export const getRole = async (req, res) => {
  try {
      const roles = await roleMasterSchema.findAll();
      res.status(200).json({ data: roles });
  } catch (error) {
      console.error("Error getting roles:", error);
      res.status(500).json({ error: "Error getting roles" });
  }
};