import { uploadFileToFirebaseStorage } from "../middleware/documentUpload.js";
import DocumentSchema from "../models/employeeDocument.js";

export const postEmployeeDocument = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = await uploadFileToFirebaseStorage(file);

    // Assuming you have defined DocumentSchema elsewhere
    const document = await DocumentSchema.create({
      employeeId: req.body.employeeId,
      documentType: req.body.documentType,
      description: req.body.description,
      uploadFilePath: filePath,
    });

    res.json({ message: "Uploaded successfully", document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getEmployeeDocument = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const documentUpload = await DocumentSchema.findAll({
      where: {
        employeeId: employeeId,
        deleteFlag: false,
      },
    });
    res
      .status(200)
      .json({ message: "Document list data", data: documentUpload });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
// export const putEmployeeDocument = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const documentUpload = await DocumentSchema.update(
//       {
//         where: { id: id },
//         returning: true, // Ensure Sequelize returns the updated document
//       },
//       { deleteFlag: true }
//     );

//     res.status(200).json({ data: documentUpload });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Server Error" });
//   }
// };
export const putEmployeeDocument = async (req, res) => {
  try {
    const id = req.params.id;

    // Update the document with the specified id to set deleteFlag to true
    const [rowsAffected, documentUpload] = await DocumentSchema.update(
      { deleteFlag: true },
      {
        where: { id: id },
        returning: true, // Ensure Sequelize returns the updated document
      }
    );

    // Check if the document was found and updated
    if (rowsAffected === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Document not found" });
    }

    // Respond with the updated document
    res.status(200).json({
      data: documentUpload[0],
      message: "Document delete successfully",
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
