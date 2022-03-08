let sumCal = 0;
let url =
  "http://openapi.foodsafetykorea.go.kr/api/92804346bfe547c5a581/COOKRCP01/json/1/5/RCP_NM=";

let gbl_data;
let menuData;

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

setTimeout(() => {
  menuListTxt();
}, 5000);

function menuListTxt() {
  let menuList = [...document.querySelectorAll("#checkMenu .menus__item")];
  for (const li of menuList) {
    console.log("hi");
    li.addEventListener("click", (e) => {
      const target = e.target;
      console.log(target);
      if (target.tagName == "A") {
        const pTag = target.querySelector(`.item--name`);
        pTagTxt = pTag.textContent;
      } else if (target.tagName == "IMG") {
        const pTag =
          target.parentNode.nextElementSibling.querySelector(`.item--name`);
        pTagTxt = pTag.textContent;
      } else if (target.className == "item--name") {
        pTagTxt = target.textContent;
      }
      console.log(pTagTxt);
      sessionStorage.setItem("pTagTxt", pTagTxt);
    });
  }
}

// Load menus
function loadSelectedDate(selectedDate, order) {
  console.log("날짜: " + selectedDate, order);
  loadMenu().then((menus) => {
    const content = document.querySelector(`#checkMenu .menus`);
    content.innerHTML = "";
    console.log(menus[order][`${selectedDate}`]);
    menus[order][`${selectedDate}`] &&
      menus[order][`${selectedDate}`][0].breakfast.map((menuName) => {
        onLoadFood(foodURL(menuName));
        console.log(menuName);
        console.log(gbl_data);
        menuData = gbl_data.COOKRCP01.row[0];

        const li = addMenu(
          menuName,
          menuInfo(menuData).menuImg,
          menuInfo(menuData).menukcal
        );
        content.append(li);
      });

    // Button Click - breakfast, lunch, dinner
    const navBtn = document.querySelectorAll("#nav div");
    for (const btn of navBtn) {
      btn.onclick =
        ("click",
        () => {
          const siblings = [...navBtn].filter((e) => e !== btn);
          content.innerHTML = "";
          btn.classList.add("active");
          siblings.map((el) => el.classList.remove("active"));

          if (btn.classList.contains("nav__breakfast")) {
            console.log("날짜: " + order);
            menus[order][`${selectedDate}`][0].breakfast.map((menuName) => {
              onLoadFood(foodURL(menuName));
              console.log(menuName);
              console.log(gbl_data);
              menuData = gbl_data.COOKRCP01.row[0];
              const li = addMenu(
                menuName,
                menuInfo(menuData).menuImg,
                menuInfo(menuData).menukcal
              );
              content.append(li);
            });
          } else if (btn.classList.contains("nav__lunch")) {
            console.log(order);
            console.log(menus);
            menus[order][`${selectedDate}`][1].lunch.map((menuName) => {
              onLoadFood(foodURL(menuName));
              console.log(menuName);
              console.log(gbl_data);
              menuData = gbl_data.COOKRCP01.row[0];
              const li = addMenu(
                menuName,
                menuInfo(menuData).menuImg,
                menuInfo(menuData).menukcal
              );
              content.append(li);
            });
          } else if (btn.classList.contains("nav__dinner")) {
            console.log(order);
            menus[order][`${selectedDate}`][2].dinner.map((menuName) => {
              onLoadFood(foodURL(menuName));
              console.log(menuName);
              console.log(gbl_data);
              menuData = gbl_data.COOKRCP01.row[0];
              const li = addMenu(
                menuName,
                menuInfo(menuData).menuImg,
                menuInfo(menuData).menukcal
              );
              content.append(li);
            });
          }
          menuListTxt();
        });
    }
  });
}

// Load food's Ingredients data
function onLoadFood(url) {
  $.ajax({
    url: url,
    async: false,
    success: function (data) {
      gbl_data = data;
    },
  }).done(function (data) {});
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
function addMenu(menu, menuImg, menukcal) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const imgBox = document.createElement("div");
  const img = document.createElement("img");
  const itemInfo = document.createElement("div");
  const name = document.createElement("span");
  const calorie = document.createElement("span");

  li.setAttribute("class", "menus__item");
  a.setAttribute("href", "./foodInfo.html");
  imgBox.setAttribute("class", "item__imgBox");
  img.setAttribute("src", menuImg);
  itemInfo.setAttribute("class", "item__info");
  name.setAttribute("class", "item--name");
  calorie.setAttribute("class", "item--calorie");

  name.append(menu);
  calorie.append(`${menukcal}kcal`);
  imgBox.append(img);
  itemInfo.append(name, calorie);
  a.append(imgBox, itemInfo);
  li.append(a);

  return li;
}

function menuInfo(menuData) {
  const menuInfo = {
    menuImg: menuData.ATT_FILE_NO_MAIN,
    menukcal: menuData.INFO_ENG,
  };
  return menuInfo;
}
