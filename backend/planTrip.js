import express from "express";
import multer from "multer";
import mysql from "mysql";
const router = express.Router();


const db = mysql.createPool({
  host: "localhost",
  user: "anup",
  password: "15akc#",
  database: "byway",
});


// Handle MySQL errors
db.on('error', (err) => {
  console.error('MySQL error:', err);
  // You might want to handle the error here, such as attempting to reconnect
});


router.get("/getreview", (re, res) => {
  const sqlSelect = "SELECT * FROM review";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

// Add this route to fetch photos
router.get('/getphoto', (req, res) => {
  const sqlSelect = 'SELECT * FROM photos';

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.length > 0) {
        res.json(result); // Send the array of photo objects
      } else {
        res.status(404).json({ error: 'No photos found' });
      }
    }
  });
});




router.post("/inserttrip", (req, res) => {
  const {
    fullName,
    phoneNumber,
    emailAddress,
    selectTrip,
    approxDate,
    tripLength,
    numberOfAdults,
    numberOfChildren,
    tourType,
    hotelType,
    estimatedBudget,
    guideLanguage,
    moreInfo,
    
    whereDidYouFindUs,
  } = req.body;
  const sqlInsert =
    "INSERT INTO travel(fullName, phoneNumber,emailAddress,selectTrip,approxDate,tripLength,numberOfAdults,numberOfChildren,tourType,hotelType,estimatedBudget,guideLanguage,moreInfo,whereDidYouFindUs) VALUES (?)";
  const values = [
    fullName,
    phoneNumber,
    emailAddress,
    selectTrip,
    approxDate,
    tripLength,
    numberOfAdults,
    numberOfChildren,
    tourType,
    hotelType,
    estimatedBudget,
    guideLanguage,
    moreInfo,
    
    whereDidYouFindUs,
  ];
  db.query(sqlInsert, [values], (err, result) => {
    console.log(err);
  });
});

router.post("/insertreview", (req, res) => {
  const { fullName,  date, title,reviewDetails } = req.body;

  const sqlInsert =
    "INSERT INTO review(fullName,  date, title,reviewDetails) VALUES (?)";
  const values = [fullName, date, title,reviewDetails];
  db.query(sqlInsert, [values], (err, result) => {
    console.log(err);
  });
});

router.delete("/api/delete/:id", async (req, res) => {
  const submissionId = req.params.id;
  const sqlDelete = "DELETE FROM travel WHERE id=?";

  try {
    const result = await db.query(sqlDelete, submissionId);
    console.log(result);
    res.json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




const storage = multer.memoryStorage(); // You can adjust this storage strategy based on your requirements
const upload = multer({ storage: storage });

router.post('/uploadphoto', upload.array('photos', 3), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new Error('No files uploaded.');
    }

    // Assuming you have a column named 'photoUrl' in your 'photos' table
    const image = req.files.map((file) => file.buffer);

    // Insert the file information into the 'photos' table
    const sqlInsert = 'INSERT INTO photos (image) VALUES (?)';
await db.query(sqlInsert, [image]);


    res.json({ success: true });
  } catch (error) {
    console.error('Error handling file upload:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.delete("/deletephoto/:id", (req, res) => {
  const id = req.params.id;
  const deleteQuery = "DELETE FROM photos WHERE id = ?";

  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.log("Deletion error:", err);
      return res.json("Deletion error");
    }
    return res.json({ Status: "Success" });
  });
});


export default router;
