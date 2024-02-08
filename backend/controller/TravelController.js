import express from "express";
import TravelModel from "../model/TripModel.js";
import connectToDatabase from "../db.js";

const router = express.Router();

let db;
(async function () {
  try {
    db = await connectToDatabase();
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
})();

const insertTravelBooking = async (traveldata) => {
  const insertQuery = `
    INSERT INTO traveltable (
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
      whereDidYouFindUs
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    traveldata.getFullName(),
    traveldata.getPhoneNumber(),
    traveldata.getEmailAddress(),
    traveldata.getSelectTrip(),
    traveldata.getApproxDate(),
    traveldata.getTripLength(),
    traveldata.getNumberOfAdults(),
    traveldata.getNumberOfChildren(),
    traveldata.getTourType(),
    traveldata.getHotelType(),
    traveldata.getEstimatedBudget(),
    traveldata.getGuideLanguage(),
    traveldata.getMoreInfo(),
    traveldata.getWhereDidYouFindUs(),
  ];

  return new Promise((resolve, reject) => {
    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        reject({ Error: "Insertion error" });
      } else {
        console.log("Data inserted successfully");
        resolve({ Status: "Success" });
      }
    });
  });
};

router.post("/inserttrip", async (req, res) => {
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

  const travelBooking = new TravelModel(
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
    whereDidYouFindUs
  );

  try {
    const insertResponse = await insertTravelBooking(travelBooking);
    res.json(insertResponse);
  } catch (error) {
    console.error("An error occurred during insertion:", error);
    res.json(error);
  }
});
router.get("/gettrip", (re, res) => {
  const sqlSelect = "SELECT * FROM travel";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
    console.log(result);
  });
});
router.get("/getreview", (re, res) => {
  const sqlSelect = "SELECT * FROM review";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

router.get("/getphoto", (req, res) => {
  const sqlSelect = "SELECT * FROM photos";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length > 0) {
        res.json(result); // Send the array of photo objects
      } else {
        res.status(404).json({ error: "No photos found" });
      }
    }
  });
});

router.get("/gettrip", (re, res) => {
  const sqlSelect = "SELECT * FROM traveltable";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
    console.log(result);
  });
});
export default router;
