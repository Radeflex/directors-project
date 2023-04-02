// кнопки инфы
let btns = document.querySelectorAll(".btn-show");
let blocks = document.querySelectorAll(".dir-info-block");

let switchBtnFunc = () => {
  for (i = 0; i < btns.length; i++) {
    let cbtn = document.getElementById(`${btns[i].id}`);
    let cblock = document.getElementById(`${blocks[i].id}`);
    cbtn.addEventListener("click", () => {
      cblock.classList.toggle("dir-info-block-visible");
      cblock.classList.toggle("hide");
      cbtn.classList.toggle("btnradius");
    });
  }
};
switchBtnFunc();

// кнопка сортировки

let selectBtn = document.querySelectorAll("option");
let years = document.querySelectorAll(".dir-year");
let names = document.querySelectorAll(".dir-name");
let submitBtn = document.getElementById("sel-submit")
const defaultDirs = document.querySelectorAll("section.director");
let syears = [];
let snames = [];

function bubbleSorttoMax(arr) {
  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  return arr;
}

function bubbleSorttoMin(arr) {
  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (arr[i] < arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  return arr;
}

let selFunc = () => {
  var directors = document.querySelectorAll("section.director");
  if (selectBtn[0].selected) {
    dids = [];
    for (let i = 0; i < directors.length; i++) {
      dids.push(defaultDirs[i]);
      directors[i].outerHTML = dids[i].outerHTML;
    }
    switchBtnFunc();
  } else if (selectBtn[1].selected) {
    let pyears = [];
    for (let year of years) {
      pyears.push(year.textContent);
    }
    let syears = bubbleSorttoMax(pyears);
    let dids = [];
    for (let i = 0; i < syears.length; i++) {
      for (let director of directors) {
        if (
          director.outerText.split("\n").indexOf(syears[i]) !== -1 &&
          dids.indexOf(director) === -1
        ) {
          dids.push(director);
          break;
        }
      }
    }
    for (let i = 0; i < dids.length; i++) {
      let did = dids[i].outerHTML;
      directors[i].outerHTML = did;
    }
    switchBtnFunc();
  } else if (selectBtn[2].selected) {
    let pyears = [];
    for (let year of years) {
      pyears.push(year.textContent);
    }
    let syears = bubbleSorttoMin(pyears);
    let dids = [];
    for (let i = 0; i < syears.length; i++) {
      for (let director of directors) {
        if (
          director.outerText.split("\n").indexOf(syears[i]) !== -1 &&
          dids.indexOf(director) === -1
        ) {
          dids.push(director);
          break;
        }
      }
    }
    for (let i = 0; i < dids.length; i++) {
      let did = dids[i].outerHTML;
      directors[i].outerHTML = did;
    }
    switchBtnFunc();
  } else if (selectBtn[3].selected) {
    let pnames = [];
    for (let name of names) {
      pnames.push(name.textContent);
    }
    let snames = bubbleSorttoMax(pnames);
    let dids = [];
    for (let i = 0; i < snames.length; i++) {
      for (let director of directors) {
        if (
          director.outerText.split("\n").indexOf(snames[i]) !== -1 &&
          dids.indexOf(director) === -1
        ) {
          dids.push(director);
          break;
        }
      }
    }
    for (let i = 0; i < dids.length; i++) {
      let did = dids[i].outerHTML;
      directors[i].outerHTML = did;
    }
    switchBtnFunc();
  }
};

for (let btn of selectBtn) {
  btn.addEventListener("click", selFunc);
}

submitBtn.onclick = selFunc

// поиск

let searchInput = document.getElementById("search-field");
let searchBtn = document.getElementById("search-btn");
let searchAlert = document.getElementById("search-alert");
let searchResults = document.getElementById("search-res");
let crossBtn = document.getElementById("search-cross");
let searchCont = document.getElementById("search");

let searchFunc = () => {
  var directors = document.querySelectorAll("section.director");
  searchResults.textContent = "";
  searchAlert.textContent = "";
  let dirs = [];
  directors.forEach((el) => {
    if (!("hide" in el.classList)) {
      el.classList.add("hide");
    }
  });
  let i = 0;
  for (let director of directors) {
    if (!searchInput.value) {
      searchAlert.textContent = "⚠️ Введите запрос";
      directors.forEach((el) => {
        el.classList.remove("hide");
      });
      if (!("hide" in crossBtn.classList)) {
        crossBtn.classList.add("hide");
      }
      break;
    } else if (
      director.outerText
        .toLowerCase()
        .indexOf(searchInput.value.toLowerCase()) !== -1
    ) {
      dirs.push(director);
      i++;
    }
  }
  if (i > 0) {
    crossBtn.classList.remove("hide");
    for (let dir of dirs) {
      dir.classList.remove("hide");
    }
    searchResults.textContent = `Результатов: ${i}`;
    return 0;
  } else if (searchInput.value) {
    directors.forEach((el) => {
      el.classList.remove("hide");
    });
    if (!("hide" in crossBtn.classList)) {
      crossBtn.classList.add("hide");
    }
    searchAlert.textContent = "⚠️ Не удалось найти элемент";
  }
};

searchBtn.addEventListener("click", searchFunc);
crossBtn.addEventListener("click", () => {
  var directors = document.querySelectorAll("section.director");
  searchInput.value = "";
  searchResults.textContent = "";
  crossBtn.classList.toggle("hide");
  directors.forEach((el) => {
    el.classList.remove("hide");
  });
});
