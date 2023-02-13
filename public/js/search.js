const signupFormHandler = async (event) => {
  event.preventDefault();

  const search = document.querySelector("#search").value.trim();

  if (search) {
    window.location.href = (`/result/?city=${search}`)
    // const response = await fetch("/api/court/searchedresult", {
    //   method: "POST",
    //   body: JSON.stringify({ search }),
    //   headers: { "Content-Type": "application/json" },
    // });

    // if (response.ok) {
    //   alert("search found");
    //   document.location.replace("/result");
    // } else {
    //   alert("serach not found");
    // }
  }
};

document
  .querySelector(".search-form")
  .addEventListener("submit", signupFormHandler);
