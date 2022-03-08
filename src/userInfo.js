if (sessionStorage.getItem("userId") == "true") {
  console.log(sessionStorage.getItem("userId"));
  const inputId = document.querySelector(".basicInfo__userId");
  const inputPw = document.querySelector(".basicInfo__userPw");
  inputId.readOnly = true;
  inputPw.readOnly = true;
  inputId.setAttribute("placeholder", "아이디: user01@gmail.com");
  inputPw.setAttribute("placeholder", "비밀번호: ****");
  inputId.style.background = "white";
  inputPw.style.background = "white";
}

const basicInfoSec = document.querySelector(
  ".userInfo__section__box.basicInfo"
);
const allergyInfoSec = document.querySelector(
  ".userInfo__section__box.allergyInfo"
);
const title = document.querySelector(".userInfo--title");
const title2 = document.querySelector(".userInfo--title--allergy");
const nextBtn = document.querySelector(".completeBtn");
const nextBtn2 = document.querySelector(".completeBtn.done");
const question1 = document.querySelector("#basicInfo .userInfo__question");
const question2 = document.querySelector("#allergyInfo .userInfo__question");
question1.style.transform = "translateY(0px)";
question1.style.opacity = "100%";

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();

  title.style.display = "none";
  title2.style.display = "block";

  question1.innerHTML = question2.innerHTML;
  question1.style.transform = "translateY(0px)";

  basicInfoSec.style.transform = "translateX(-100vw)";
  allergyInfoSec.style.transform = "translateX(-100vw)";
});

nextBtn2.addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "./index.html";
});
