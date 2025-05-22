document.addEventListener("DOMContentLoaded", function () {
  const reviewForm = document.getElementById("reviewForm");
  const reviewList = document.getElementById("reviewList");

  loadReviews();

  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const reviewText = document.getElementById("reviewText").value;
    const rating = document.querySelector('input[name="rating"]:checked')?.value || 0;

    const newReview = {
      id: Date.now(),
      user: username,
      text: reviewText,
      rating: rating,
      date: new Date().toLocaleString()
    };

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    reviewForm.reset();
    loadReviews();
  });

  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviewList.innerHTML = "";

    reviews.forEach((review) => {
      const reviewElement = document.createElement("div");
      reviewElement.classList.add("border", "border-light", "p-3", "mb-3", "rounded");

      let starRating = '';
      for (let i = 0; i < 5; i++) {
        starRating += i < review.rating ? "&#9733; " : "&#9734; ";
      }

      reviewElement.innerHTML = `
        <h5>${review.user}</h5>
        <div class="star-rating">${starRating}</div>
        <p>${review.text}</p>
        <small class="text-muted">Posted on: ${review.date}</small><br>
        <button class="btn btn-sm btn-danger" onclick="deleteReview(${review.id})">Delete</button>
      `;

      reviewList.appendChild(reviewElement);
    });
  }

  // 🔒 Delete with password check
  window.deleteReview = function (id) {
    const password = prompt("Enter password to delete this review:");
    const correctPassword = "Spongebob96#"; // 🔑 Set your password here

    if (password === correctPassword) {
      let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      reviews = reviews.filter(review => review.id !== id);
      localStorage.setItem("reviews", JSON.stringify(reviews));
      loadReviews();
    } else {
      alert("Incorrect password. Review not deleted.");
    }
  };
});
