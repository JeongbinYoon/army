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
