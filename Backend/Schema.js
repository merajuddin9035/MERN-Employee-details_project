const mongoose = require('mongoose');

// Define the schema
const employeeSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    email: String,
    phone: String,
    address: String
});

// Create and export the model
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
