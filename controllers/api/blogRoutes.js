// Standard require
const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

// New Blog
router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update Blog
router.put("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: "NO POST FOUND!!!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    console.log(req);
    res.status(500).json(err);
  }
});

// Delete Blog
router.delete("/:id", withAuth, async (req, res) => {
  console.log(`Deleting id: ${req.params.id}`);
  try {
    const blogData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: "POST NOT FOUND!!!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
