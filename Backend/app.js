const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./Schema');
const cors = require('cors');



const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb+srv://mohammedmerajuddin9035:Meraj123@employeesdetails.txslr.mongodb.net/?retryWrites=true&w=majority&appName=EmployeesDetails', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Failed to connect to MongoDB', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Create (POST) - Add a new employee
app.post('/api/employees', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).send(newEmployee);
    } catch (error) {
        res.status(400).send({ error: 'Failed to insert data', details: error.message });
    }
});

app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve data', details: error.message });
    }
});

app.get('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }
        res.status(200).send(employee);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve data', details: error.message });
    }
});

app.put('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }
        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send({ error: 'Failed to update data', details: error.message });
    }
});

app.delete('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }
        res.status(200).send({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete data', details: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
