let sumCal = 0;
let url =
  "http://openapi.foodsafetykorea.go.kr/api/92804346bfe547c5a581/COOKRCP01/json/1/5/";

onLoadFood(url);

const today = new Date();
const currentYear = `${today.getFullYear()}`;
const currentMonth = `${today.getMonth() + 1}`;
const currentDate = `${today.getDate()}`;
let order = currentDate - 1;
const todayDate = currentYear + currentMonth + currentDate;
loadSelectedDate(todayDate, order);

// Click select button
const dateSelectBtn = document.querySelector(".calendar .calendar__select");
dateSelectBtn.addEventListener("click", () => {
  setTimeout(() => {
    let selected = JSON.parse(sessionStorage.getItem("selectedDay"));
    let selectedDate =
      `${selected.selectedYear}` +
      `${selected.selectedMonth}` +
      `${selected.selectedDate}`;
    order = `${selected.selectedDate - 1}`;
    loadSelectedDate(selectedDate, order);
  }, 500);
});

// Load menus
function loadSelectedDate(selectedDate, order) {
  loadMenu().then((menus) => {
    const content = document.querySelector(`#checkMenu .menus`);
    content.innerHTML = "";
    console.log(menus[order][`${selectedDate}`]);
    menus[order][`${selectedDate}`] &&
      menus[order][`${selectedDate}`][0].breakfast.map((menu) => {
        // onLoadFood(foodURL(menu));
        console.log(menu);
        const li = addMenu(menu);
        content.append(li);
      });

    const navBtn = document.querySelectorAll("#nav div");
    for (const btn of navBtn) {
      btn.addEventListener("click", () => {
        const siblings = [...navBtn].filter((e) => e !== btn);
        content.innerHTML = "";
        btn.classList.add("active");
        siblings.map((el) => el.classList.remove("active"));

        if (btn.classList.contains("nav__breakfast")) {
          menus[order][`${selectedDate}`][0].breakfast.map((menu) => {
            const li = addMenu(menu);
            content.append(li);
          });
        } else if (btn.classList.contains("nav__lunch")) {
          menus[order][`${selectedDate}`][1].lunch.map((menu) => {
            const li = addMenu(menu);
            content.append(li);
          });
        } else if (btn.classList.contains("nav__dinner")) {
          menus[order][`${selectedDate}`][2].dinner.map((menu) => {
            const li = addMenu(menu);
            content.append(li);
          });
        }
      });
    }
  });
}

// Load food's Ingredients data
function onLoadFood(url) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = new Function("return [" + xhr.response + "];")();
      const target = data[0].COOKRCP01.row[0];
      console.log(target);
      const cal = Number(target.NUTR_CONT1);
    } else {
      console.log("통신 실패");
    }
  };
}

// Make new URL of Filtered data
function foodURL(foodName) {
  return url + foodName;
}

// Load Menus
function loadMenu() {
  return fetch("data/todayMenu.json")
    .then((response) => response.json())
    .then((json) => json.menus);
}

// Add Menu
function addMenu(menu) {
  const li = document.createElement("li");
  const imgBox = document.createElement("div");
  const img = document.createElement("img");
  const itemInfo = document.createElement("div");
  const name = document.createElement("span");
  const calorie = document.createElement("span");

  li.setAttribute("class", "menus__item");
  imgBox.setAttribute("class", "item__imgBox");
  img.setAttribute("src", "./imgs/chicken.jpg");
  itemInfo.setAttribute("class", "item__info");
  name.setAttribute("class", "item--name");
  calorie.setAttribute("class", "item--calorie");

  name.append(menu);
  calorie.append("230 kcal");
  imgBox.append(img);
  itemInfo.append(name, calorie);
  li.append(imgBox, itemInfo);

  return li;
}
