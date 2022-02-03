const url =
  "http://openapi.foodsafetykorea.go.kr/api/92804346bfe547c5a581/COOKRCP01/json/1/5/RCP_NM=";

loadData(changeURL("두루치기"));
let foodData;
// Load Data
function loadData(url) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = new Function(`return [${xhr.response}];`)();
      foodData = foodInfo(data);
      applyFoodInfo(foodData);
    } else {
      console.log("통신 실패");
    }
  };
}

// Make new URL of Filtered data
function changeURL(foodName) {
  return url + foodName;
}

// food information
function foodInfo(data) {
  const target = data[0].COOKRCP01.row[0];
  const foodImg = target.ATT_FILE_NO_MAIN;
  const foodName = target.RCP_NM;
  const foodCal = target.INFO_ENG;
  const foodCar = target.INFO_CAR;
  const foodPro = target.INFO_PRO;
  const foodNa = target.INFO_NA;
  return {
    foodImg,
    foodName,
    foodCal,
    foodCar,
    foodPro,
    foodNa,
  };
}

// Apply data
function applyFoodInfo(foodData) {
  const imgBox = document.querySelector(".sideDishes__imgBox");
  const name = document.querySelector(".foodInfo__foodName");
  const cal = document.querySelector(".nutrition__item .item__value.cal");
  const car = document.querySelector(".nutrition__item .item__value.car");
  const pro = document.querySelector(".nutrition__item .item__value.pro");
  const na = document.querySelector(".nutrition__item .item__value.na");
  const imgTag = document.createElement("img");

  imgTag.setAttribute("src", foodData.foodImg);
  imgTag.setAttribute("alt", foodData.foodName);
  imgTag.setAttribute("class", "imgBox--img");
  imgBox.append(imgTag);
  name.innerHTML = foodData.foodName;
  cal.innerHTML = foodData.foodCal;
  car.innerHTML = foodData.foodCar;
  pro.innerHTML = foodData.foodPro;
  na.innerHTML = foodData.foodNa;
}
