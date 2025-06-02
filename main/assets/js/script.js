let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
let editIndex = null;

document.getElementById("blogForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) return;

  if (editIndex !== null) {
    blogs[editIndex] = { title, content };
    editIndex = null;
  } else {
    blogs.push({ title, content });
  }

  saveBlogs();
  document.getElementById("blogForm").reset();
  renderBlogs();
});

document.getElementById("clearAll").addEventListener("click", function () {
  if (confirm("Are you sure you want to delete all blogs?")) {
    blogs = [];
    saveBlogs();
    renderBlogs();
  }
});

function saveBlogs() {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

function renderBlogs() {
  const blogList = document.getElementById("blogList");
  const noBlogs = document.getElementById("noBlogs");

  blogList.innerHTML = "";

  if (blogs.length === 0) {
    noBlogs.style.display = "block";
    return;
  }

  noBlogs.style.display = "none";

  blogs.forEach((blog, index) => {
    const blogItem = document.createElement("div");
    blogItem.className = "list-group-item";

    blogItem.innerHTML = `
      <h5>${blog.title}</h5>
      <p>${blog.content}</p>
      <button class="btn btn-primary btn-sm me-2" onclick="editBlog(${index})">Edit</button>
      <button class="btn btn-danger btn-sm" onclick="deleteBlog(${index})">Delete</button>
    `;

    blogList.appendChild(blogItem);
  });
}

function editBlog(index) {
  const blog = blogs[index];
  document.getElementById("title").value = blog.title;
  document.getElementById("content").value = blog.content;
  editIndex = index;
  document.getElementById("title").focus();
}

function deleteBlog(index) {
  blogs.splice(index, 1);
  saveBlogs();
  renderBlogs();
}

renderBlogs();
