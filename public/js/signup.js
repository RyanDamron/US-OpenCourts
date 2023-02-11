const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstname = document.querySelector("#first_name").value.trim();
  const lastname = document.querySelector("#last_name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const username = document.querySelector("#user-name").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password && email && firstname && lastname) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload("");
    } else {
      alert("failed to sign up");
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
