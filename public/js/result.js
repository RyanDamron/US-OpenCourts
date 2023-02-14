const signupFormHandler = async (event) => {
  event.preventDefault();

  const search = document.querySelector("#result").value.trim();

  if (search) {
    const response = await fetch("/api/court/searchedresult", {
      method: "POST",
      body: JSON.stringify({ search }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("search found");
      document.location.replace("/result");
    } else {
      alert("serach not found");
    }
  }
};

// const favBtn = document.getElementById('favorite');
//   const renderFav = favBtn.parentElement.parentElement.parentElement.parentElement.textContent;
//   favBtn.addEventListener('click', function () {
//     console.log('favorite' + renderFav);
//   });
// const renderFav = favBtn.parentNode.innerHTML;
// const favBtn = document.getElementById('favorite');

// favBtn.addEventListener('click', function(){
//     console.log('favorite');
//   });
 


// document
//   .querySelector(".search-form")
//   .addEventListener("submit", signupFormHandler);

