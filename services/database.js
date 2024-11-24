const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        // Use environment variable for MongoDB URI
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDatabase;
