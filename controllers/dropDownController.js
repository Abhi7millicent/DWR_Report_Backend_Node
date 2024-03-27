import dropDownMasterSchema from "../models/dropDown.js";

export const createDropDown = async (req, res) => {
    const { type } = req.params; // Extract the "type" parameter from the URL path
    try {
      const dropDownItem = await dropDownMasterSchema.create({ ...req.body, type }); // Include the "type" in the creation data
      res.status(201).json(dropDownItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Get all drop-down items
export const getAllDropDowns = async (req, res) => {
    const { type } = req.query; // Extract the "type" parameter from the query string
    try {
      let whereClause = { deleteFlag: false }; // Initial where clause with deleteFlag condition
      if (type) {
        whereClause.type = type; // Add type condition if provided
      }
      const dropDownItems = await dropDownMasterSchema.findAll({ where: whereClause });
      res.json(dropDownItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get a drop-down item by ID
export const getDropDownById = async (req, res) => {
  const { id } = req.params;
  try {
    const dropDownItem = await dropDownMasterSchema.findByPk(id);
    if (dropDownItem) {
      res.json(dropDownItem);
    } else {
      res.status(404).json({ message: "Drop-down item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a drop-down item
export const updateDropDown = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await dropDownMasterSchema.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedDropDown = await dropDownMasterSchema.findByPk(id);
      res.json(updatedDropDown);
    } else {
      res.status(404).json({ message: "Drop-down item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a drop-down item (update deleteFlag)
export const deleteDropDown = async (req, res) => {
  const { id } = req.params;
  try {
    const dropDownItem = await dropDownMasterSchema.findByPk(id);
    if (dropDownItem) {
      await dropDownItem.update({ deleteFlag: true });
      res.json({ message: "Drop-down item deleted successfully" });
    } else {
      res.status(404).json({ message: "Drop-down item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
