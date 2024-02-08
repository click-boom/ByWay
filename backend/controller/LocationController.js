import express from "express";
import LocationModel from "../model/LocationModel.js";
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

const insertLocation = async (locationData) => {
  const checkQuery = `
    SELECT * FROM locationtable 
    WHERE longitude = ? AND latitude = ?
  `;

  const insertQuery = `
    INSERT INTO locationtable (
      location_name,
      longitude,
      latitude
    ) VALUES (?, ?, ?)
  `;

  const values = [
    locationData.getLocation_name(),
    locationData.getLongitude(),
    locationData.getLatitude(),
  ];

  return new Promise((resolve, reject) => {
    // First, check if the coordinates already exist
    db.query(
      checkQuery,
      [locationData.getLongitude(), locationData.getLatitude()],
      (err, result) => {
        if (err) {
          console.error("Error checking data:", err);
          reject({ Error: "Checking error" });
        } else if (result.length > 0) {
          console.log("Coordinates already exist");
          reject({ Status: "Coordinates already exist" });
        } else {
          // If the coordinates do not exist, insert the new location
          db.query(insertQuery, values, (err, result) => {
            if (err) {
              console.error("Error inserting data:", err);
              reject({ Error: "Insertion error" });
            } else {
              console.log("Data inserted successfully");
              resolve({ Status: "Location Added Successfully" });
            }
          });
        }
      }
    );
  });
};

router.post("/saveLocation", async (req, res) => {
  const { location_name, longitude, latitude } = req.body;

  const locationData = new LocationModel(location_name, longitude, latitude);

  try {
    const insertResponse = await insertLocation(locationData);
    console.log("Insert response:", insertResponse);
    res.json(insertResponse);
  } catch (error) {
    console.error("An error occurred during insertion:", error);
    res.json(error);
  }
});

router.get("/fetchAvailableLocations", (req, res) => {
  const query = "SELECT location_id, location_name FROM locationtable";
  db.query(query, (err, locations) => {
    if (err) {
      console.error("Error fetching locations:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(locations);
    }
  });
});

router.get("/getCoordinates", (req, res) => {
  const sql = "SELECT longitude, latitude FROM locationtable";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).json({ error: "Error fetching locations." });
    } else {
      console.log("Locations fetched from MySQL:");
      res.json(results);
    }
  });
});
router.get("/fetchLocationName/:location_id", (req, res) => {
  const locationId = req.params.location_id;
  const query = "SELECT location_name FROM locationtable WHERE location_id = ?";
  db.query(query, [locationId], (err, result) => {
    if (err) {
      console.error("Error fetching location name:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const locationName = result[0] ? result[0].location_name : null;
      res.json({ locationName });
    }
  });
});
export default router;
