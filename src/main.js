const selectedMeal = document.querySelector("#meal .meal__selected");
const sliderContainer = document.querySelector("#meal .slider__items");
const sliderBtn = [...document.querySelectorAll("#meal .meal__slider button")];
let items = [...document.querySelectorAll("#meal .items__item")];
let count = 0;
let move = 0;

sliderContainer && slideItems(count);

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

selectedMeal &&
  selectedMeal.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className == "meal__selected") {
      const pTag = target.querySelector(`.selected--name`);
      pTagTxt = pTag.textContent;
    } else if (target.tagName == "IMG") {
      const pTag =
        target.parentNode.nextElementSibling.querySelector(`.selected--name`);
      pTagTxt = pTag.textContent;
    } else if (target.className == "selected--description") {
      const pTag = target.nextElementSibling;
      pTagTxt = pTag.textContent;
    } else if (target.tagName == "P") {
      pTagTxt = target.textContent;
    }
    sessionStorage.setItem("pTagTxt", pTagTxt);
  });

for (const btn of items) {
  btn.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName == "LI" || target.tagName == "A") {
      const pTag = target.querySelector(`.item--name`);
      pTagTxt = pTag.textContent;
    } else if (target.tagName == "IMG") {
      const pTag = target.parentNode.nextElementSibling;
      pTagTxt = pTag.textContent;
    } else if (target.tagName == "P") {
      pTagTxt = target.textContent;
    }
    console.log(pTagTxt);
    sessionStorage.setItem("pTagTxt", pTagTxt);
  });
}

const checkMenu = document.querySelector(".checkMenu");
checkMenu &&
  checkMenu.addEventListener("click", () => {
    calendar();
  });

const changeDate = document.querySelector("#checkMenu .selectDay__changeMonth");
changeDate &&
  changeDate.addEventListener("click", () => {
    calendar();
  });

changeSelectDate();
function changeSelectDate() {
  const selectedDate = document.querySelector(".selectDay__selected");
  let selected = JSON.parse(sessionStorage.getItem("selectedDay"));
  selectedDate &&
    (selectedDate.innerHTML = `${selected.selectedYear}년 ${selected.selectedMonth}월 ${selected.selectedDate}일`);
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

// Calendar
function calendar() {
  const calendar = document.querySelector("#calendar");
  calendar.style.display = "block";

  const calendarDate = document.querySelector(".calendar__date");
  calendarDate.innerHTML = "";

  let today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth() + 1;
  let currentDate = today.getDate();
  let selectedDay;

  selectedDay = {
    selectedYear: currentYear,
    selectedMonth: currentMonth,
    selectedDate: currentDate,
  };
  makeNewMonth(currentYear, currentMonth);

  // Click button
  const calendarBtn = [
    ...document.querySelectorAll(".calendar .calendar__changeMonth button"),
  ];

  for (const btn of calendarBtn) {
    btn.addEventListener("click", (e) => {
      calendarDate.innerHTML = "";
      const target = e.target.className;
      if (target.indexOf("left") !== -1) {
        today = new Date(currentYear, currentMonth);
        currentYear = today.getFullYear();
        currentMonth = today.getMonth() - 1;
        makeNewMonth(currentYear, currentMonth);
      } else {
        today = new Date(currentYear, currentMonth);
        currentYear = today.getFullYear();
        currentMonth = today.getMonth() + 1;
        makeNewMonth(currentYear, currentMonth);
      }
    });
  }

  const dateSelectBtn = document.querySelector(".calendar .calendar__select");
  dateSelectBtn.innerHTML = `${currentYear}년 ${currentMonth}월 ${currentDate}일`;

  function makeNewMonth(currentYear, currentMonth) {
    // Last month last date
    const lastMonth = new Date(currentYear, currentMonth - 1, 0);
    const lastEndDate = lastMonth.getDate();

    // This month last date
    const lastDay = new Date(currentYear, currentMonth, 0);
    const endDate = lastDay.getDate();
    const endDay = lastDay.getDay();

    // This month first date
    const firstDay = new Date(currentYear, currentMonth - 1, 1);
    const startDay = firstDay.getDay();

    const calendarYearMonth = document.querySelector(".calendar--currentMonth");
    calendarYearMonth.innerHTML = `${currentYear}년 ${currentMonth}월`;

    // Make last month's date
    for (let i = lastEndDate - startDay + 1; i <= lastEndDate; i++) {
      const date = document.createElement("span");
      date.setAttribute("class", "notThisMonth");
      date.innerHTML = i;
      calendarDate.append(date);
    }

    // Make this month's date
    today = new Date();
    for (let i = 1; i < endDate + 1; i++) {
      const date = document.createElement("span");
      if (currentMonth == today.getMonth() + 1 && currentDate === i) {
        date.setAttribute("class", "date--today");
        const todayCircle = document.createElement("span");
        todayCircle.setAttribute("class", "today--circle");
        todayCircle.innerHTML = i;
        date.append(todayCircle);
      } else {
        date.innerHTML = i;
      }
      calendarDate.append(date);
    }

    // Make next month's date
    let count = 1;
    for (let i = endDay; i < 6; i++) {
      const date = document.createElement("span");
      date.setAttribute("class", "notThisMonth");
      date.innerHTML = count;
      count++;
      calendarDate.append(date);
    }

    // Click date
    let dates = document.querySelectorAll(".calendar__date>span");
    for (const date of dates) {
      date.addEventListener("click", () => {
        let siblings = (date) =>
          [...date.parentElement.children].filter(
            (e) => e != date && e.classList.contains("date--active")
          );

        for (let i = 0; i < siblings(date).length; i++) {
          siblings(date)[i].classList.remove("date--active");
        }

        date.setAttribute("class", "date--active");
        dateSelectBtn.innerHTML = `${currentYear}년 ${currentMonth}월 ${date.textContent}일`;

        selectedDay = {
          selectedYear: currentYear,
          selectedMonth: currentMonth,
          selectedDate: date.textContent,
        };
      });
    }
  }

  // Click select button
  dateSelectBtn.addEventListener("click", () => {
    sessionStorage.setItem("selectedDay", JSON.stringify(selectedDay));
    calendar.style.display = "none";
    changeSelectDate();
    setTimeout(() => {
      menuListTxt();
    }, 5000);
  });

  // Close calendar
  const closeCalendar = document.querySelector("#calendar .calendar__closeBtn");
  closeCalendar.addEventListener("click", () => {
    calendar.style.display = "none";
  });

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
}
