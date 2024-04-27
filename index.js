const express = require('express');
const app = express();
const port = 3200;
const students = require('./data/students');
const exp = require('constants');
const student_grades = require('./data/grades');



app.use(express.json());


//get and post student info
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
    .delete('/students/:id', (req, res, next) => {
        const student = students.find((s,i) => {
            if(s.id == req.params.id){
                students.splice(i, 1);
                return true;
            }
        });

        if(student) res.json(student);
        else next()
    });


app
    .get('/grades', (req, res) => {
        res.json(student_grades)
    })
    .get('/grades/:id', (req, res) => {
        const grade= student_grades.find(i => i.id = req.params.id)
         res.json(grade)
    })
    .patch('/grades/:id' , (req, res) => { // does not add a new subject to student but add a whole new object
        const grade= student_grades.find(i => i.id = req.params.id)
        grade.subject = req.body.subject
        res.send(grade)
    });







app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});