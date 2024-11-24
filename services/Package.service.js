const User = require("../models/User.model");
const Package = require("../models/Package.model");
const Reservation = require("../models/Reservation.model");
const bcrypt = require("bcryptjs");

// User Service Functions
async function createPackage (req, res, next) {
    try {
      console.log(req.body); // Debugging: Log the incoming body
      const { name, description, price_per_day, location, max_people, start_date } = req.body;
  
    //   if (!name || !price_per_day || !location || !max_people || !start_date) {
    //     return res.status(400).json({ message: 'All fields are required' });
    //   }
  
      const newPackage = new Package({
        name,
        description,
        price_per_day,
        location,
        max_people,
        start_date,
      });
  
      const savedPackage = await newPackage.save();
  
    //   if (req.files && req.files.length > 0) {
        // const imagePromises = req.files.map((file) => {
        //   const image = new PackageImage({
        //     package_id: savedPackage._id,
        //     filename: file.filename,
        //     filepath: ip + file.filename,
        //   });
        //   return image.save();
        // });
        // await Promise.all(imagePromises);
    //   }
  
      res.status(201).json({ message: 'Package created successfully!' });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ message: 'Error creating package' });
    }
  };
  

async function updatePackage({ id, prix_days, location, nb_person, start, description }) {
    try {
        const updatedPackageCount = await Package.update(
            { prix_days, location, nb_person, start, description },
            { where: { _id: id } }
        );

        if (updatedPackageCount[0] === 0) {
            throw new Error("Package not found!");
        }
    } catch (err) {
        console.error("Error updating package:", err);
        throw new Error("An error occurred while updating package");
    }
}

async function deletePackage({ id }) {
    try {
        const deletedPackageCount = await Package.destroy({ where: { _id: id } });

        if (deletedPackageCount === 0) {
            throw new Error("Package not found!");
        }
    } catch (err) {
        console.error("Error deleting package:", err);
        throw new Error("An error occurred while deleting package");
    }
}

async function getPackages() {
    try {
        const packages = await Package.findAll();
        return packages;
    } catch (err) {
        console.error("Error getting packages:", err);
        throw new Error("An error occurred while getting packages");
    }
}

module.exports = {
    createPackage,
    updatePackage,
    deletePackage,
    getPackages,
};