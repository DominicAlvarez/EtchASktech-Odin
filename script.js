document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("grid-container");
  const gridSizeSlider = document.getElementById("gridSizeSlider");
  const gridSizeValue = document.getElementById("gridSizeValue");
  const colorModeButton = document.getElementById("colorMode");
  const eraserButton = document.getElementById("eraser");
  const clearCanvasButton = document.getElementById("clearCanvas");
  const randomColorButton = document.getElementById("randomColor");
  const colorPicker = document.getElementById("colorPicker");
  const ctx = colorPicker.getContext("2d");
  let isMouseDown = false;
  let currentColor = "black"; // Default color
  let randomMode = false;

  function createGrid(size) {
    gridContainer.innerHTML = ""; // Clear the grid
    const gridItemSize = 640 / size; // Calculate the size of each grid item

    for (let i = 0; i < size * size; i++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridItem.style.width = `${gridItemSize}px`;
      gridItem.style.height = `${gridItemSize}px`;
      gridContainer.appendChild(gridItem);
    }

    gridSizeValue.textContent = `${size}x${size}`;
  }

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function drawColorPicker() {
    const gradient = ctx.createLinearGradient(0, 0, colorPicker.width, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.17, "orange");
    gradient.addColorStop(0.34, "yellow");
    gradient.addColorStop(0.51, "green");
    gradient.addColorStop(0.68, "cyan");
    gradient.addColorStop(0.85, "blue");
    gradient.addColorStop(1, "magenta");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, colorPicker.width, colorPicker.height);

    const whiteGradient = ctx.createLinearGradient(0, 0, 0, colorPicker.height);
    whiteGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    whiteGradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
    whiteGradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
    whiteGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctx.fillStyle = whiteGradient;
    ctx.fillRect(0, 0, colorPicker.width, colorPickerC.height);
  }

  function handleMouseDraw(event) {
    if (isMouseDown && event.target.classList.contains("grid-item")) {
      if (randomMode) {
        event.target.style.backgroundColor = getRandomColor();
      } else {
        event.target.style.backgroundColor = currentColor;
      }
    }
  }
  function setupEventListeners() {
    // Event listeners for mouse actions on the grid
    gridContainer.addEventListener("mousedown", function () {
      isMouseDown = true;
    });

    gridContainer.addEventListener("mouseup", function () {
      isMouseDown = false;
    });

    gridContainer.addEventListener("mouseleave", function () {
      isMouseDown = false;
    });

    gridContainer.addEventListener("mousemove", handleMouseDraw);

    gridContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("grid-item")) {
        if (randomMode) {
          event.target.style.backgroundColor = getRandomColor();
        } else {
          event.target.style.backgroundColor = currentColor;
        }
      }
    });

    // Show the color picker when Color Mode button is clicked
    colorModeButton.addEventListener("click", function () {
      colorPicker.style.display = "block";
      drawColorPicker();
    });

    // Handle color selection and hide the color picker on mouse up
    colorPicker.addEventListener("mousedown", function (event) {
      isMouseDown = true;
    });

    colorPicker.addEventListener("mousemove", function (event) {
      if (isMouseDown) {
        const x = event.offsetX;
        const y = event.offsetY;
        const imageData = ctx.getImageData(x, y, 1, 1).data;
        currentColor = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
        colorModeButton.style.backgroundColor = currentColor;
      }
    });

    colorPicker.addEventListener("mouseup", function () {
      isMouseDown = false;
      colorPicker.style.display = "none";
    });

    colorPicker.addEventListener("mouseleave", function () {
      isMouseDown = false;
    });

    // Eraser button functionality
    eraserButton.addEventListener("click", function () {
      currentColor = "white";
      randomMode = false; // Disable random color mode
      colorModeButton.style.backgroundColor = "white"; // Update button color
    });

    // Clear Canvas button functionality
    clearCanvasButton.addEventListener("click", function () {
      const gridItems = document.querySelectorAll(".grid-item");
      gridItems.forEach((item) => (item.style.backgroundColor = "white"));
    });

    // Random Color button functionality
    randomColorButton.addEventListener("click", function () {
      randomMode = true;
      colorModeButton.style.backgroundColor = "transparent"; // Optional
    });
  }
  createGrid(16);
  setupEventListeners();
});
