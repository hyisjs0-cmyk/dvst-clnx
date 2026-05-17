let currentMap = "";
let currentMode = "def";
let currentImageIndex = 0;

const images = {
  "МИРОР": {
    def: [
      "DEF/мирор.png",
      "images/мирор обычка.jpg"
      ],
    attack: [
      "ATAKA/мирор.png",
      "images/мирор обычка.jpg"
      ]
  },
  "ВЕТРЯКИ": {
    def: [
      "DEF/ветряки.png",
      "images/ветряки обычка.jpg"
      ],
    attack: [
      "ATAKA/ветряк.png",
      "images/ветряки обычка.jpg"
      ]
  },
  "Завод": {
    def: [
      "DEF/завод.png",
      "images/завод обычка.jpg"
      ],
    attack: [
      "ATAKA/завод.png",
      "images/завод обычка.jpg"
      ]
  },
  "КЕЙШОП": {
    def: [ 
      "DEF/муравы.png",
       "images/кейшоп обычка.jpg"
      ],
    attack: [
      "ATAKA/муравы.png",
       "images/кейшоп обычка.jpg"
      ]
  },
  "РОКФОРД": {
    def: [
      "DEF/рокфорд.png",
       "images/дом майкла обычка.jpg"
      ],
    attack: [ 
      "ATAKA/рокфорд.png",
      "images/дом майкла обычка.jpg"
      ]
  },
  "ЦЕРКОВЬ": {
    def: [
      "DEF/церковь.png",
       "images/церковь обычка.jpg"
      ],
    attack: [ 
      "ATAKA/церковь.png",
       "images/церковь обычка.jpg"
      ]
  },
  "ПИРС": {
    def: [ 
      "DEF/пирс.png",
       "images/пирс обычка.jpg"
      ],
    attack: [
      "ATAKA/пирс.png",
      "images/пирс обычка.jpg"
      ]
  },
  "БИЗВАР": {
    def: [
      "DEF/ребл.png",
      "images/бизвар обычка.jpg"
      ],
    attack: [
      "ATAKA/ребл.png",
       "images/бизвар обычка.jpg"
      ]  
  },
  "СЭНДИК": {
    def: [
      "DEF/сендик.png",
       "images/сендик обычка.jpg"
      ],
    attack: [
      "ATAKA/сендик.png",
      "images/сендик обычка.jpg"
      ]
  },
  "ПАЛЕТТО БЭЙ": {
    def: [
      "DEF/палетка.png",
     "images/палетка обычка.jpg"
      ],
    attack: [
      "ATAKA/палето.png",
      "images/палетка обычка.jpg"
      ]
  },
  "ЯКИ": {
    def: [ 
      "DEF/яки.png",
      "images/яки обычка.jpg"
      ],
    attack: [
      "ATAKA/яки.png",
      "images/яки обычка.jpg"
      ]
  },
  "ПОРТ": {
    def: [ 
      "images/docks-def.jpg",
      "images/порт обычка.jpg"
      ],
    attack: [ 
      "ATAKA/порт.png",
      "images/порт обычка.jpg"
      ]
  },
  "ФЕРМА": {
    def: [
      "images/road-def.jpg",
      "images/ферма обычка.jpg"
      ],
    attack: [ 
      "ATAKA/ферма.png",
      "images/ферма обычка.jpg"
      ]
  }
};

function openMap(mapName) {
  currentMap = mapName;
  currentMode = "def";
  currentImageIndex = 0;

  document.getElementById("mainPage").classList.remove("active");
  document.getElementById("mapPage").classList.add("active");

  document.getElementById("mapTitle").textContent = mapName;
  updateImage();
  updateButtons();
}

function goBack() {
  document.getElementById("mapPage").classList.remove("active");
  document.getElementById("mainPage").classList.add("active");
}

function setMode(mode) {
  currentMode = mode;
  currentImageIndex = 0;
  updateImage();
  updateButtons();
}

function updateImage() {
  const img = document.getElementById("mapImage");

  if (images[currentMap]) {
    const currentImages = images[currentMap][currentMode];

    if (Array.isArray(currentImages)) {
      img.src = currentImages[currentImageIndex];
    } else {
      img.src = currentImages;
    }
  }
}

function updateButtons() {
  document.getElementById("defBtn").classList.toggle("active-switch", currentMode === "def");
  document.getElementById("attackBtn").classList.toggle("active-switch", currentMode === "attack");
}

let zoomLevel = 1;

function openFullscreen() {
  const currentImage = document.getElementById("mapImage").src;
  const fullscreen = document.getElementById("fullscreenViewer");
  const fullscreenImage = document.getElementById("fullscreenImage");

  zoomLevel = 1;
  fullscreenImage.style.transform = `scale(${zoomLevel})`;
  fullscreenImage.src = currentImage;

  fullscreen.classList.add("active");

  setTimeout(() => {
    history = [];
    setupCanvas();
  }, 100);
}

function closeFullscreen() {
  document.getElementById("fullscreenViewer").classList.remove("active");
}

function zoomImage() {
  const fullscreenImage = document.getElementById("fullscreenImage");

  if (zoomLevel < 3) {
    zoomLevel += 0.25;
    fullscreenImage.style.transform = `scale(${zoomLevel})`;
  }
}

function zoomOutImage() {
  const fullscreenImage = document.getElementById("fullscreenImage");

  if (zoomLevel > 1) {
    zoomLevel -= 0.25;
    fullscreenImage.style.transform = `scale(${zoomLevel})`;
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeFullscreen();
  }
});

let drawTool = "pen";
let isDrawing = false;
let startX = 0;
let startY = 0;
let canvas;
let ctx;
let history = [];

function setTool(tool) {
  drawTool = tool;
}

function setupCanvas() {
  const img = document.getElementById("fullscreenImage");

  canvas = document.getElementById("drawCanvas");
  ctx = canvas.getContext("2d");

  canvas.width = img.clientWidth;
  canvas.height = img.clientHeight;

  canvas.style.width = img.clientWidth + "px";
  canvas.style.height = img.clientHeight + "px";

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.imageSmoothingEnabled = false;
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
  ctx.filter = "none";

  saveCanvasState();
}

function saveCanvasState() {
  history.push(canvas.toDataURL());
}

function undoDraw() {
  if (history.length <= 1) return;

  history.pop();

  const img = new Image();
  img.src = history[history.length - 1];

  img.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
}

function clearDraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  saveCanvasState();
}

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function startDraw(e) {
  isDrawing = true;

  const pos = getMousePos(e);
  startX = pos.x;
  startY = pos.y;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
}

function draw(e) {
  if (!isDrawing) return;

  const pos = getMousePos(e);

  if (drawTool === "pen") {
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
    ctx.filter = "none";

    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#ff0000";

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }
}

function endDraw(e) {
  if (!isDrawing) return;

  isDrawing = false;

  const pos = getMousePos(e);

  if (drawTool === "arrow") {
    drawArrow(startX, startY, pos.x, pos.y);
  }

  saveCanvasState();
}

function drawArrow(fromX, fromY, toX, toY) {
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
  ctx.filter = "none";

  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#ff0000";
  ctx.fillStyle = "#ff0000";

  const headLength = 18;
  const angle = Math.atan2(toY - fromY, toX - fromX);

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(toX, toY);

  ctx.lineTo(
    toX - headLength * Math.cos(angle - Math.PI / 6),
    toY - headLength * Math.sin(angle - Math.PI / 6)
  );

  ctx.lineTo(
    toX - headLength * Math.cos(angle + Math.PI / 6),
    toY - headLength * Math.sin(angle + Math.PI / 6)
  );

  ctx.closePath();
  ctx.fill();
}

document.addEventListener("DOMContentLoaded", function () {
  canvas = document.getElementById("drawCanvas");

  if (canvas) {
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mouseleave", endDraw);
  }
});
function nextImage() {
  const currentImages = images[currentMap][currentMode];

  if (!Array.isArray(currentImages)) return;

  currentImageIndex++;

  if (currentImageIndex >= currentImages.length) {
    currentImageIndex = 0;
  }

  updateImage();
}

function prevImage() {
  const currentImages = images[currentMap][currentMode];

  if (!Array.isArray(currentImages)) return;

  currentImageIndex--;

  if (currentImageIndex < 0) {
    currentImageIndex = currentImages.length - 1;
  }

  updateImage();
}
