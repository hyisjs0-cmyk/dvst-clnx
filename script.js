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