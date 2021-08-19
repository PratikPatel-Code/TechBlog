// Create
const newFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#post-name").value.trim();
  const contents = document.querySelector("#post-desc").value.trim();
  if (title && contents) {
    const response = await fetch(`/api/blogs`, {
      method: "POST",
      body: JSON.stringify({ title, contents }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Error!!!");
    }
  }
};

// Delete
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id") && event.target.id === "del-btn") {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Error!!!");
    }
  }
};

// Update
const updateButtonHandler = async (event) => {
  if (
    event.target.hasAttribute("data-id") &&
    event.target.id === "update-btn"
  ) {
    const id = event.target.getAttribute("data-id");
    const title = document.querySelector(`#title-${id}`).value.trim();
    const contents = document.querySelector(`#blog-${id}`).value.trim();
    const response = await fetch(`api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, contents }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Error");
    }
  }
};

// Document selectors to create, delete, and update
document.querySelector("#btnNew").addEventListener("click", newFormHandler);

document
  .querySelector(".delete-list")
  .addEventListener("click", delButtonHandler);

document
  .querySelector(".post-list")
  .addEventListener("click", updateButtonHandler);
