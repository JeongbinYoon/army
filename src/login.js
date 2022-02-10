const loginBtn = document.querySelector(".input-submit");
const userId = document.querySelector(".input-email");
const userPw = document.querySelector(".input-pw");
const register = document.querySelector(".register");
register.addEventListener("click", () => {
  sessionStorage.setItem("userId", false);
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (userId.value === "") alert("아이디를 입력하세요.");
  else if (userPw.value === "") alert("비밀번호를 입력하세요.");
  else if (userId.value === "yon980824@gmail.com" && userPw.value === "1234") {
    sessionStorage.setItem("userId", true);
    location.href = "../userInfo.html";
  }
  console.log(userId.value);
});

// Kakao login
Kakao.init("c35baf49b4333e308118385730b736e6");
function kakaoLogin() {
  window.Kakao.Auth.login({
    scope: "profile_image, account_email, gender",
    success: function (authObj) {
      console.log(authObj);
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          console.log(kakao_account);
        },
      });
    },
  });
}

// Naver login

var naver_id_login = new naver_id_login(
  "6uOfA2kBGs8Hgq97g0ST",
  "http://127.0.0.1:5500/naver_callback.html"
);
var state = naver_id_login.getUniqState();
naver_id_login.setButton("green", 3, 45);
naver_id_login.setDomain("http://127.0.0.1:5500");
naver_id_login.setState(state);
// naver_id_login.setPopup();
naver_id_login.init_naver_id_login();
