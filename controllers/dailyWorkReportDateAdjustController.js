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
        res.status(404).json({ message: 'Adjustment not found1' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const getDateByEmployeeId = async (req, res) => {
    try {
        const employeeId = parseInt(req.params.employeeId); // Convert to integer
        const adjustment = await dailyWorkReportDateAdjustSchema.findAll({
            where: {
                employeeId: employeeId,
                deleteFlag: false,
                status: "Pending"
            }
        });
        if (adjustment.length > 0) { // Check if adjustment exists
            // Assuming adjustment is an array of objects, you might need to loop through each object to get dates
            const dates = adjustment.map(entry => entry.date);
            res.status(200).json({ data: dates });
        } else {
            res.status(404).json({ message: "No adjustments found for the employee" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const updateStatusByEmployeeIdAndDate = async (employeeId, date) => {
  try {
      const adjustment = await dailyWorkReportDateAdjustSchema.findOne({
          where: {
              employeeId: employeeId,
              date: date,
              deleteFlag: false,
          }
      });

      if (adjustment) {
          await adjustment.update({ status: 'Completed' });
      } else {
          // If the record doesn't exist, you may choose to create it or just return a message.
          // Here, we'll just log a message.
          console.log("Record not found for the given employeeId and date.");
      }
  } catch (error) {
      // Catch any errors that occur during the process
      console.error(error.message);
  }
}



  // Create a new daily work report date adjustment
  export const create = async (req, res) => {
    const { employeeId, date } = req.body;
    try {
        // Check if the date already exists for the given employeeId
        const existingAdjustment = await dailyWorkReportDateAdjustSchema.findOne({ where: {
            employeeId : employeeId,
            date: date,
            status: "Pending",
        }
        });

        if (existingAdjustment) {
            // If the date already exists, return an error response
            return res.status(400).json({ error: "Upload Date already exists for this employee." });
        }

        // If the date does not exist, create a new adjustment
        const newAdjustment = await dailyWorkReportDateAdjustSchema.create({
            employeeId,
            date,
        });
        res.status(200).json({ data: newAdjustment });
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

  


