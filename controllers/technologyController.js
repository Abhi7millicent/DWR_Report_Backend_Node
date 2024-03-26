// controllers/technologyController.js
import Technology from '../models/technologyMaster.js';

// Create a new technology
export const createTechnology = async (req, res) => {
  try {
    const technology = await Technology.create(req.body);
    res.status(201).json(technology);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all technologies
export const getTechnologies = async (req, res) => {
  try {
    const technologies = await Technology.findAll();
    res.json(technologies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get technology by ID
export const getTechnologyById = async (req, res) => {
  try {
    const technology = await Technology.findByPk(req.params.id);
    if (!technology) {
      res.status(404).json({ message: 'Technology not found' });
      return;
    }
    res.json(technology);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update technology by ID
export const updateTechnology = async (req, res) => {
  try {
    const [updatedRows] = await Technology.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows === 0) {
      res.status(404).json({ message: 'Technology not found' });
      return;
    }
    res.json({ message: 'Technology updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete technology by ID
export const updateDeleteFlag = async (req, res) => {
      const { id } = req.params;
      try {
        const technologyId = await Technology.findByPk(id);
        if (technologyId) {
            technologyId.deleteFlag = true;
            await technologyId.save();
            res.json({ message: 'Delete flag updated successfully' });
        } else {
            res.status(404).json({ message: 'Employee project role not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };
