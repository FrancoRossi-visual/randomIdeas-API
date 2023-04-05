const express = require('express');
const router = express.Router();

const ideas = [
  {
    id: 1,
    text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older that your milk is getting',
    tag: 'Invention',
    username: 'SteveRogers',
    date: '2022-02-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-04-02',
  },
];

// get all ideas
router.get('', (request, response) => {
  response.json({ success: true, data: ideas });
});

// get single idea by id
router.get('/:id', (request, response) => {
  const idea = ideas.find((idea) => idea.id === +request.params.id);

  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }

  response.json({ success: true, data: idea });
});

// delete an idea
router.delete('/:id', (request, response) => {
  const idea = ideas.find((idea) => idea.id === +request.params.id);

  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }

  ideas.splice(ideas.indexOf(idea), 1);

  response.json({ success: true, data: 'done' });
});

// Add an idea
router.post('/', (request, response) => {
  const idea = {
    id: ideas.length + 1,
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username,
    date: new Date().toISOString().slice(0, 10),
  };

  ideas.push(idea);

  response.json({ success: true, data: idea });
});

// update an idea
router.put('/:id', (request, response) => {
  const idea = ideas.find((idea) => idea.id === +request.params.id);

  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: 'Resource not found' });
  }

  idea.text = request.body.text || idea.text;
  idea.tag = request.body.tag || idea.tag;

  response.json({ success: true, data: idea });
});

module.exports = router;
