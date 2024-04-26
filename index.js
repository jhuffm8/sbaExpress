const express = require('express');
const app = express();
const port = 3200;
const students = require('./data/students');
const exp = require('constants');


app.use(express.json());
app
    .get('/students' , (req, res) => {
    res.json(students) 
    })
    .get('/students/:id', (req, res) => {
        const student = students.filter(s => s.id == req.params.id);
        for( const key in student){
            res.send(student[key].name);
        }
      
    })
    .post('/students', (req, res) => {
        const student = {
            id: students[students.length - 1].id + 1,
            name: req.body.name,
            email: req.body.email
        }
        students.push(student);
        res.json(`Added ${req.body.name} successfully`)
    })





app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});