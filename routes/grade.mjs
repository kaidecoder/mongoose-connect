import express from "express"
const app = express()
const router = express.Router()

import Grade from "../models/grade.mjs"

// create a single grade entry
router.post("/", async(req, res) => {
  try {
      const newDoc = new Grade(req.body);
      const result = await newDoc.save();
      res.status(200).send(result);
  } catch (error) {
      console.error(error);
      res.status(400).send('Bad Request');
  }
});

// Get a single grade entry
router.get("/:id", async(req, res) => {
  let result = await Grade.findById(req.params.id);

  if (!result) res.status(404).send('Not found');
  else res.status(200).send(result);
});


// Add a score to a grade entry(??)
router.patch("/:id/add", async (req, res) => {
  let query = req.params.id;
  let result = await Grade.findByIdAndUpdate(query, 
      {$push: {scores: req.body}},
  {new: true});
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
})

// Remove a score from a grade entry(what's different from below?)
router.delete('/:id/delete', async(req, res) => {
  try {
    const id = req.params.id;
    const grade = await Grade.findByIdAndDelete(id, req.body, { new: true });
    console.log(grade);

    res.json({ grade });
  } catch (error) {}
})

// Delete a single grade entry
router.delete('/:id/delete', async(req, res) => {
  let query = req.params.id
  let result = await Grade.findByIdAndDelete(query);

  if (!result) res.send("Nor found").status(404);
  else res.send(result).status(200);
});


// Get a students grade data
router.get("/learner/:id", async (req, res) => {
  let query = req.params.id
  let result = await Grade.findById(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a students grade data
router.delete("/learner/:id", async (req, res) => {
  let query = req.params.id
  let result = await Grade.findByIdAndDelete(query);

  if(!result) res.send('Not Found').status(404);
  else res.send(result).status(200);
});


// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  // let collection = await db.collection('grades');
  let query = req.params.id
  let result = await Grade.findById(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Update a class id
router.patch('/class/:id', async (req, res) => {
  let query = req.params.id
  let result = await Grade.updateMany(query, {
      $set: { class_id: req.body.class_id },
  });

  if (!result) res.send('Not found').status(404);
  else res.send(result).status(200);
});


// Delete a learner's grade data
router.delete('/learner/:id', async (req, res) => {
  let query = req.params.id
  let result = await Grade.deleteOne(query);

  if(!result) res.send('Not Found').status(404);
  else res.send(result).status(200);
})



export default router