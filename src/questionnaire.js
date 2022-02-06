const genderBtn = document.querySelectorAll(".page1__q1 .q1__gender div");
const nextBtn = document.querySelector(".pageContainer .nextBtn");
const saveBtn = document.querySelector(".pageContainer .saveBtn");

for (const btn of genderBtn) {
  btn.addEventListener("click", () => {
    const sibling = [...genderBtn].filter((el) => el !== btn);
    btn.classList.add("active");
    sibling[0].classList.remove("active");
  });
}

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
});
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
});
