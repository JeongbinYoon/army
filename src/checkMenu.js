let sumCal = 0;
let url =
  "http://openapi.foodsafetykorea.go.kr/api/92804346bfe547c5a581/COOKRCP01/json/1/5/RCP_NM=";
let when = "menus[0].breakfast";

// Load menus
loadMenu().then((menus) => {
  //   onLoadFood(foodURL("두루치기"));
  const content = document.querySelector(`#checkMenu .menus`);
  menus[2].dinner.map((menu) => {
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
        menus[0].breakfast.map((menu) => {
          const li = addMenu(menu);
          content.append(li);
        });
      } else if (btn.classList.contains("nav__lunch")) {
        menus[1].lunch.map((menu) => {
          const li = addMenu(menu);
          content.append(li);
        });
      } else if (btn.classList.contains("nav__dinner")) {
        menus[2].dinner.map((menu) => {
          const li = addMenu(menu);
          content.append(li);
        });
      }
    });
  }
});

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
