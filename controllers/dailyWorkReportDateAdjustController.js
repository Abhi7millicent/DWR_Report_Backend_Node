import dailyWorkReportDateAdjustSchema from "../models/dailyWorkReportDateAdjust.js";


  // Get all daily work report date adjustments
  export const getAll = async (req, res) => {
    try {
      const adjustments = await dailyWorkReportDateAdjustSchema.findAll();
      res.status(200).json({data: adjustments});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a specific daily work report date adjustment by ID
  export const getById = async (req, res) => {
    const { id } = req.params;
    try {
      const adjustment = await dailyWorkReportDateAdjustSchema.findByPk(id);
      if (adjustment) {
        res.status(200).json({data: adjustment});
      } else {
        res.status(404).json({ message: 'Adjustment not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const getByEmployeeId = async (employeeId) => {
    try {
      const adjustment = await dailyWorkReportDateAdjustSchema.findAll({
        where: {
            employeeId: employeeId,
            deleteFlag: false,
        }
      });
      if (adjustment) {
        return adjustment.date;
      } else {
        return null;
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new daily work report date adjustment
  export const create = async (req, res) => {
    const { employeeId, date, status, deleteFlag } = req.body;
    try {
      const newAdjustment = await dailyWorkReportDateAdjustSchema.create({
        employeeId,
        date,
        status,
        deleteFlag,
      });
      res.status(200).json({data: newAdjustment});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update an existing daily work report date adjustment
  export const update = async (req, res) => {
    const { id } = req.params;
    const { employeeId, date, status, deleteFlag } = req.body;
    try {
      const adjustment = await dailyWorkReportDateAdjustSchema.findByPk(id);
      if (adjustment) {
        await adjustment.update({
          employeeId,
          date,
          status,
          deleteFlag,
        });
        res.status(200).json({data: adjustment});
      } else {
        res.status(404).json({ message: 'Adjustment not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  


