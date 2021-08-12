// Standard Requires
const router = require('express').Router();
const { comment } = require('../../models');
const withAuth = require('../../utils/auth');

// TODO: Add the logic to post the comment to the correct blog post. 
router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newComment = await comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;