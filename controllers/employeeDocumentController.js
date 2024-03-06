import { DocumentSchema } from "../models/employeeDocument.js";

export const postEmployeeDocument = async (req, res) => {
  const document = new DocumentSchema({
    employeeId: req.body.employeeId,
    documentType: req.body.documentType,
    description: req.body.description,
  });

  if (req.file) {
    document.uploadFilePath = req.file.path;
  }

  document
    .save()
    .then((response) => {
      res.json({ message: "Uploaded successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
};

export const getEmployeeDocument = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const documentUpload = await DocumentSchema.find({
      employeeId,
      deleteFlag: false,
    });
    res.status(200).json({ data: documentUpload });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
export const putEmployeeDocument = async (req, res) => {
  try {
    const id = req.params.id;
    const documentUpload = await DocumentSchema.findOneAndUpdate(
      { _id: id },
      { deleteFlag: true },
      { new: true }
    );

    res.status(200).json({ data: documentUpload });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
