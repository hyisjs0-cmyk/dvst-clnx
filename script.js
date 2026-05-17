let currentMap = "";
let currentMode = "def";

const images = {
  "МИРОР": {
    def: "DEF/мирор.png",
    attack: "ATAKA/мирор.png"
  },
  "ВЕТРЯКИ": {
    def: "DEF/ветряки.png",
    attack: "ATAKA/ветряк.png"
  },
  "Завод": {
    def: "DEF/завод.png",
    attack: "ATAKA/завод.png"
  },
  "КЕЙШОП": {
    def: "DEF/муравы.png",
    attack: "ATAKA/муравы.png"
  },
  "РОКФОРД": {
    def: "DEF/рокфорд.png",
    attack: "ATAKA/рокфорд.png"
  },
  "ЦЕРКОВЬ": {
    def: "DEF/церковь.png",
    attack: "ATAKA/церковь.png"
  },
  "ПИРС": {
    def: "DEF/пирс.png",
    attack: "ATAKA/пирс.png"
  },
  "БИЗВАР": {
    def: "DEF/ребл.png",
    attack: "ATAKA/ребл.png"
  },
  "СЭНДИК": {
    def: "DEF/сендик.png",
    attack: "ATAKA/сендик.png"
  },
  "ПАЛЕТТО БЭЙ": {
    def: "DEF/палетка.png",
    attack: "ATAKA/палето.png"
  },
  "ЯКИ": {
    def: "DEF/яки.png",
    attack: "ATAKA/яки.png"
  },
  "ПОРТ": {
    def: "images/docks-def.jpg",
    attack: "ATAKA/порт.png"
  },
  "ФЕРМА": {
    def: "images/road-def.jpg",
    attack: "ATAKA/ферма.png"
  }
};

function openMap(mapName) {
  currentMap = mapName;
  currentMode = "def";

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
  updateImage();
  updateButtons();
}

function updateImage() {
  const img = document.getElementById("mapImage");

  if (images[currentMap]) {
    img.src = images[currentMap][currentMode];
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

  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.strokeStyle = "red";
  ctx.fillStyle = "red";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "red";

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

  if (drawTool === "pen") {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }
}

function draw(e) {
  if (!isDrawing) return;

  const pos = getMousePos(e);

  if (drawTool === "pen") {
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
  ctx.lineTo(toX, toY);
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
