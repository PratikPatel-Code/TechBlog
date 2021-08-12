// All requires.
const router = require("express").Router();
const { blogPost, user, comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to get data into homepage template
router.get("/", async (req, res) => {
  try {
    const blogData = await blogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: comment,
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Blog routes
router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await blogPost.findByPk(req.params.id, {
      include: [
        {
          model: user,
          attributes: ["name"],
        },
        {
          model: comment,
          include: [
            {
              model: user,
            },
          ],
        },
      ],
    });
    const blog = blogData.get({ plain: true });
    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Session ID of the user
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await user.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: blogPost }, { model: comment }],
    });
    const user = userData.get({ plain: true });
    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// If the user is already logged in
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

module.exports = router;
