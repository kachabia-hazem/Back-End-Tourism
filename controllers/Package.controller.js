const Package = require('../models/Package.model');
const PackageImage = require('../models/packageImage.model');
const ip = "http://localhost:3000/uploads/package/";

exports.createPackage = async (req, res, next) => {
  try {
    const { name, description, price_per_day, location, max_people, start_date } = req.body;

    // Create and save the package
    const newPackage = new Package({
      name,
      description,
      price_per_day,
      location,
      max_people,
      start_date,
    });

    const savedPackage = await newPackage.save();

    // Check if `req.files` exists and contains files
   
    if (req.files) {
      // Save images related to the package
      const imagePromises = req.files.map((file) => {
        console.log(req.filename);
        const image = new PackageImage({
          package_id: savedPackage._id,
          filename: file.filename,
          filepath: ip + file.filename,
        });
        return image.save();
      });

      // Wait for all image save operations to complete
      await Promise.all(imagePromises);
    }

    // Respond with success
    res.status(201).json({ message: 'Package created successfully!' });
  } catch (err) {
    console.error(err);

    // Respond with error
    res.status(500).json({ message: 'Error creating package', error: err.message });
  }
};


exports.getAllPackages = async (req, res, next) => {
  try {
    const packages = await Package.find();
    const packagesWithImages = await Promise.all(
      packages.map(async (packageItem) => {
        const images = await PackageImage.find({ package_id: packageItem._id });
        return { ...packageItem._doc, images };
      })
    );
    res.status(200).json({ message: "Success", data: packagesWithImages });
  } catch (err) {
    next(err);
  }
};

exports.getPackageById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const packageItem = await Package.findById(id);
    if (!packageItem) {
      res.status(404).json({ message: 'Package not found' });
      return;
    }

    const images = await PackageImage.find({ package_id: id });
    res.status(200).json({ message: "Success", data: { ...packageItem._doc, images } });
  } catch (err) {
    next(err);
  }
};

exports.updatePackage = async (req, res, next) => {
  try {
    const { id, name, description, price_per_day, location, max_people, start_date } = req.body;

    const packageItem = await Package.findById(id);
    if (!packageItem) {
      res.status(404).json({ message: 'Package not found' });
      return;
    }

    packageItem.name = name;
    packageItem.description = description;
    packageItem.price_per_day = price_per_day;
    packageItem.location = location;
    packageItem.max_people = max_people;
    packageItem.start_date = start_date;

    await packageItem.save();

    if (req.files && req.files.length > 0) {
      await PackageImage.deleteMany({ package_id: id });
      const imagePromises = req.files.map((file) => {
        const image = new PackageImage({
          package_id: id,
          filename: file.filename,
          filepath: ip + file.filename,
        });
        return image.save();
      });
      await Promise.all(imagePromises);
    }

    res.status(200).json({ message: 'Package updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating package' });
  }
};

exports.deletePackage = async (req, res, next) => {
  try {
    await PackageService.deletePackage(req.params.id);
    res.status(200).json({ message: 'Package deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting package' });
  }
};
