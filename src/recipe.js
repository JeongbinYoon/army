let recipeDataURL =
  "http://openapi.foodsafetykorea.go.kr/api/92804346bfe547c5a581/COOKRCP01/json/1/50/RCP_NM=";

$(function () {
  recipe_returnURL(recipeDataURL, "덮밥");
});

// url + 음식명
function ingredients_returnURL(url, food) {
  const returnURL = url + food;
  ingredientsData(returnURL);
}

// url + 레시피
function recipe_returnURL(url, food) {
  const returnURL = url + food;
  recipeData(returnURL);
}

// 레시피 로드
function recipeData(url) {
  $.ajax({
    method: "POST",
    url: url,
  }).done(function (data) {
    const target = data.COOKRCP01.row[0];

    // 이름
    const foodName = target.RCP_NM;
    document.querySelector(".ingredient--foodName").innerHTML = foodName;

    // 이미지
    const img = document.createElement("img");
    img.setAttribute("src", target.ATT_FILE_NO_MAIN);
    document.querySelector(".recipe__imgBox").append(img);

    // 재료
    const foodIngredientsArray = target.RCP_PARTS_DTLS.split(", ");
    let ingredientsUL = document.createElement("ul");
    for (let i = 0; i < foodIngredientsArray.length; i++) {
      let foodIngredients = document.createElement("li");
      foodIngredients.append(foodIngredientsArray[i]);
      ingredientsUL.append(foodIngredients);
      foodIngredients.classList.add("ingredients--item");
    }
    ingredientsUL.classList.add("ingredients");
    document.querySelector("#ingredient").append(ingredientsUL);

    // 요리 순서
    let recipeOL = document.createElement("ol");
    for (let i = 1; i <= 6; i++) {
      let manualNum = "target.MANUAL0" + i;
      let manualImgNum = "target.MANUAL_IMG0" + i;
      const recipeLi = document.createElement("li");
      recipeLi.classList.add("recipe--item");
      const recipeP = document.createElement("p");
      recipeP.append(eval(manualNum));
      recipeLi.append(recipeP);
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("item__imgBox");
      const recipeImg = document.createElement("img");
      recipeImg.setAttribute("src", eval(manualImgNum));
      recipeImg.setAttribute("alt", target.RCP_NM);
      recipeDiv.append(recipeImg);
      recipeLi.append(recipeDiv);
      recipeOL.append(recipeLi);
    }
    recipeOL.classList.add("recipe");
    document.querySelector("#recipeList").append(recipeOL);
  });
}
