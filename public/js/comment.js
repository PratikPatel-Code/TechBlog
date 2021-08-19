const newFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector(".new-comment").value.trim();
  const blog_id = document
    .querySelector(".btn-comment")
    .getAttribute("data-id");

  console.log(event.target.getAttribute("data-id"));
  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ comment, blog_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace(`/blog/${blog_id}`);
    } else {
      alert("Error!!!");
    }
  }
};

document
  .querySelector(".btn-comment")
  .addEventListener("click", newFormHandler);
