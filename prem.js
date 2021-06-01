const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
];

app.get("/", (req, res) => {
  res.send("Welcome to learning academy");
});

app.get("/api/courses", (req, res) => {
  res.status(200).send(courses);
});
//getting a single course
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.ide === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  res.status(200).send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (result.error) {
    //400 Bad request

    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.status(201).send(course);
});

app.put("/api/courses/:id", (req, res) => {
  //Look up the course
  //If not existitng ,return 404
  const course = courses.find((c) => c.ide === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  //validate
  //if invalid return 400 -Bad request

  const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);
  if (result.error) {
    //400 Bad request

    res.status(400).send(result.error.details[0].message);
    return;
  }

  //update course
  course.name = req.body.name;
  res.status(200).send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.ide === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  //delete the course
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.status(204).send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(2).required(),
  };
  return Joi.validate(course, schema);
}

// environment variable
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
