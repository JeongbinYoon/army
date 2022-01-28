const sliderContainer = document.querySelector("#meal .slider__items");
const sliderBtn = [...document.querySelectorAll("#meal .meal__slider button")];
let items = [...document.querySelectorAll("#meal .items__item")];
let count = 0;
let move = 0;

const checkMenu = document.querySelector("#checkMenu");
checkMenu.addEventListener("click", () => {
  calendar();
});

slideItems(count);

for (const btn of sliderBtn) {
  btn.addEventListener("click", (e) => {
    const target = e.target.className;
    if (target.indexOf("left") !== -1) {
      count--;
      move += 110;
      slideItems(count);
    } else {
      count++;
      move -= 110;
      slideItems(count);
    }
  });
}

function slideItems(count) {
  if (count >= items.length - 3) {
    let copyFirstItem = items[count - 1].cloneNode(true);
    sliderContainer.append(copyFirstItem);

    items = [...document.querySelectorAll("#meal .items__item")];
  } else if (count < 0) {
    let copyLastItem = items[items.length - 1].cloneNode(true);
    sliderContainer.insertBefore(copyLastItem, sliderContainer.firstChild);
    items = [...document.querySelectorAll("#meal .items__item")];
  }

  items.map((item) => {
    item.style.transform = `translateX(${move}px)`;
  });
}

function calendar() {
  const calendar = document.querySelector("#calendar");
  calendar.style.display = "block";

  const closeCalendar = document.querySelector("#calendar .calendar__closeBtn");
  closeCalendar.addEventListener("click", () => {
    calendar.style.display = "none";
  });
}
