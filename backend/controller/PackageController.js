import multer from "multer";
import express from "express";
import PackageModel from "../model/PackageModel.js";
import connectToDatabase from "../db.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let db;
(async function () {
  try {
    db = await connectToDatabase();
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
})();

const insertPackage = async (packageData) => {
  const insertQuery = `
    INSERT INTO packagetable (
      package_title,
      location_id,
      about,
      duration,
      guidance_language,
      whats_included,
      what_to_expect,
      departure_and_return,
      accessibility,
      additional_info,
      price,
      discount,
      image1,
      image2,
      image3,
      image4
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    packageData.getPackage_title(),
    packageData.getLocation_id(),
    packageData.getAbout(),
    packageData.getDuration(),
    packageData.getGuidance_language(),
    packageData.getWhats_included(),
    packageData.getWhat_to_expect(),
    packageData.getDeparture_and_return(),
    packageData.getAccessibility(),
    packageData.getAdditional_info(),
    packageData.getPrice(),
    packageData.getDiscount(),
    packageData.getImage1(),
    packageData.getImage2(),
    packageData.getImage3(),
    packageData.getImage4(),
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

router.post("/insertPackage", upload.array("image", 4), async (req, res) => {
  const {
    title,
    location_id,
    about,
    duration,
    guidance_language,
    whats_included,
    what_to_expect,
    departure_and_return,
    accessibility,
    additional_info,
    price,
    discount,
  } = req.body;

  const images = req.files.map((file) => ({
    originalname: file.originalname,
    buffer: file.buffer,
  }));

  const packageData = new PackageModel(
    null,
    title,
    location_id,
    about,
    duration,
    guidance_language,
    whats_included,
    what_to_expect,
    departure_and_return,
    accessibility,
    additional_info,
    price,
    discount,
    images[0] ? images[0].buffer : null,
    images[1] ? images[1].buffer : null,
    images[2] ? images[2].buffer : null,
    images[3] ? images[3].buffer : null
  );

  try {
    const insertResponse = await insertPackage(packageData);
    res.json(insertResponse);
  } catch (error) {
    console.error("An error occurred during insertion:", error);
    res.json(error);
  }
});

const updatePackage = async (packageData) => {
  const updateQuery = `
    UPDATE packagetable
    SET
      package_title = ?,
      location_id = ?,
      about = ?,
      duration=?,
      guidance_language = ?,
      whats_included = ?,
      what_to_expect = ?,
      departure_and_return = ?,
      accessibility = ?,
      additional_info = ?,
      price = ?,
      discount = ?,
      image1 = COALESCE(?, image1),
      image2 = ?,
      image3 = ?,
      image4 = ?
    WHERE package_id = ?
  `;

  const values = [
    packageData.getPackage_title(),
    packageData.getLocation_id(),
    packageData.getAbout(),
    packageData.getDuration(),
    packageData.getGuidance_language(),
    packageData.getWhats_included(),
    packageData.getWhat_to_expect(),
    packageData.getDeparture_and_return(),
    packageData.getAccessibility(),
    packageData.getAdditional_info(),
    packageData.getPrice(),
    packageData.getDiscount(),
    packageData.getImage1(),
    packageData.getImage2(),
    packageData.getImage3(),
    packageData.getImage4(),
    packageData.getPackage_id(),
  ];

  return new Promise((resolve, reject) => {
    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        reject({ Error: "Update error" });
      } else {
        console.log("Data updated successfully");
        resolve({ Status: "Success" });
      }
    });
  });
};

router.put(
  "/updatePackage/:package_id",
  upload.array("image", 4),
  async (req, res) => {
    const package_id = req.params.package_id;
    const {
      title,
      location_id,
      about,
      duration,
      guidance_language,
      whats_included,
      what_to_expect,
      departure_and_return,
      accessibility,
      additional_info,
      price,
      discount,
    } = req.body;

    const images = req.files.map((file) => ({
      originalname: file.originalname,
      buffer: file.buffer,
    }));

    const packageData = new PackageModel(
      package_id, // Pass package_id to the constructor
      title,
      location_id,
      about,
      duration,
      guidance_language,
      whats_included,
      what_to_expect,
      departure_and_return,
      accessibility,
      additional_info,
      price,
      discount,
      images[0] ? images[0].buffer : null,
      images[1] ? images[1].buffer : null,
      images[2] ? images[2].buffer : null,
      images[3] ? images[3].buffer : null
    );

    try {
      const updateResponse = await updatePackage(packageData);
      res.json(updateResponse);
    } catch (error) {
      console.error("An error occurred during update:", error);
      res.json(error);
    }
  }
);

router.get("/getPackages", (req, res) => {
  const selectQuery = "SELECT * FROM packagetable";

  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ status: "Error", message: "Fetch error" });
    }
    return res.status(200).json({ status: "Success", packages: result });
  });
});

router.get("/getSelectedPackage/:id", (req, res) => {
  const packageId = req.params.id;
  const selectQuery = "SELECT * FROM packagetable WHERE package_id = ?";

  db.query(selectQuery, [packageId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ status: "Error", message: "Fetch error" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "Error", message: "Package not found" });
    }

    return res.status(200).json({ status: "Success", package: result[0] });
  });
});

router.delete("/deletePackages/:id", (req, res) => {
  const id = req.params.id;
  const deleteQuery = "DELETE FROM packagetable WHERE package_id = ?";

  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.log("Deletion error:", err);
      return res.json("Deletion error");
    }
    return res.json({ Status: "Success" });
  });
});

export default router;
