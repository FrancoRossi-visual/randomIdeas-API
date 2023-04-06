const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

function catchError(response, errTxt) {
  response.status(500).json({
    success: false,
    error: errTxt,
  });
}

// get all ideas
router.get('/', async (request, response) => {
  try {
    const ideas = await Idea.find();
    response.json({ success: true, data: ideas });
  } catch (error) {
    catchError(response, 'Something went wrong while trying to GET ideas');
  }
});

// get single idea by id
router.get('/:id', async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id);
    response.json({ success: true, data: idea });
  } catch (error) {
    catchError(response, 'Something went wrong while trying to GET that idea');
  }
});

// delete an idea
router.delete('/:id', async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id);

    // match the user name;
    if (idea.username === request.body.username) {
      await Idea.findByIdAndDelete(request.params.id);
      return response.json({ success: true, data: {} });
    }
    // username doesn't match
    response.status(403).json({
      success: false,
      error: 'you are not authorized to delete this resource >:( ',
    });
  } catch (error) {
    console.log(error);
    catchError(
      response,
      'Something went wrong while trying to DELETE your idea'
    );
  }
});

// Add an idea
router.post('/', async (request, response) => {
  const idea = new Idea({
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username,
  });

  try {
    const savedIdea = await idea.save();
    response.json({ success: true, data: savedIdea });
  } catch (error) {
    catchError(response, 'Something went wrong while trying to POST your idea');
  }
});

// update an idea
router.put('/:id', async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id);

    // match the username
    if (idea.username === request.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        request.params.id,
        {
          $set: {
            text: request.body.text,
            tag: request.body.tag,
          },
        },
        { new: true }
      );
      return response.json({ success: true, data: updatedIdea });
    }
    // username doesn't match
    response.status(403).json({
      success: false,
      error: 'you are not authorized to update this resource >:( ',
    });
  } catch (error) {
    console.log(error);
    catchError(
      response,
      'Something went wrong while trying to update this idea'
    );
  }
});

module.exports = router;
