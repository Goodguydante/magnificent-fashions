document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.querySelector(".gallery-container");
  const imagesPerPage = 50; // Number of images to display per page
  const totalImages = 200;  // Total number of images to be displayed (can be dynamic based on API data)
  let currentPage = 1;      // Start at the first page

  // Function to load images dynamically
  function loadImages(page = 1) {
      galleryContainer.innerHTML = ""; // Clear existing images
      const startIndex = (page - 1) * imagesPerPage;
      const endIndex = Math.min(startIndex + imagesPerPage, totalImages);

      for (let i = startIndex; i < endIndex; i++) {
          const imgElement = document.createElement("img");
          imgElement.src = `https://source.unsplash.com/random/250x250?sig=${i}`;
          imgElement.alt = `Model Image ${i + 1}`;
          galleryContainer.appendChild(imgElement);
      }
  }

  // Function to handle page navigation
  function goToPage(page) {
      currentPage = page;
      loadImages(page); // Load the images for the new page
      updatePaginationButtons(); // Update the pagination UI
  }

  // Update the "Previous" and "Next" button states based on current page
  function updatePaginationButtons() {
      const prevButton = document.querySelector(".prev");
      const nextButton = document.querySelector(".next");

      // Disable the "Previous" button if on the first page
      prevButton.disabled = currentPage === 1;

      // Disable the "Next" button if on the last page
      nextButton.disabled = currentPage === Math.ceil(totalImages / imagesPerPage);
  }

  // Event listener for the "Next" button
  document.querySelector(".next").addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage < Math.ceil(totalImages / imagesPerPage)) {
          goToPage(currentPage + 1); // Go to the next page
      }
  });

  // Event listener for the "Previous" button
  document.querySelector(".prev").addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage > 1) {
          goToPage(currentPage - 1); // Go to the previous page
      }
  });

  // Initial load of images
  loadImages(currentPage);
  updatePaginationButtons();
});
