const signupFormHandler = async (event) => {
  event.preventDefault();

  const search = document.querySelector("#search").value.trim();

  if (search) {
    window.location.href = `/result/?city=${search}`;
  }
};

document
  .querySelector(".search-form")
  .addEventListener("submit", signupFormHandler);
