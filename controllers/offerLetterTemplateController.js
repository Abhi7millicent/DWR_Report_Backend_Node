import offerLetterTemplateSchema from '../models/offerLetterTemplate.js';

export const offerLetterController = async (req, res) => {
    try {
      const firstOfferLetter = await offerLetterTemplateSchema.findOne({ 
        where: { deleteFlag: false },
        order: [['id', 'ASC']], // Fetch the first row based on the 'id' in ascending order
      });

      if (!firstOfferLetter) {
        return res.status(404).json({ message: 'No offer letter found' });
      }

      res.json(firstOfferLetter);
    } catch (error) {
      console.error('Error fetching offer letter:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  