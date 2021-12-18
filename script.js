"use strict";
const demographics = document.querySelector(".demo");
const btnArds = document.getElementById("ards");
const btnCopd = document.getElementById("copd");
const btnHeart = document.getElementById("heart");
const btnNeuro = document.getElementById("neuro");
const initForm = document.querySelector(".form");
const btnSubmit = document.querySelector("#submit");
let heightInput = document.getElementById("height");
let sex = document.querySelector("#sex");
const modal1 = document.querySelector(".modalOne");
const modal2 = document.querySelector(".modalTwo");
let confirm = document.getElementById("confirm");
let pbw = 0;

heightInput.value = "";
sex.value = "";

//This function opens modal1
const openModal1 = function () {
  modal1.classList.remove("hidden");
};

//This function opens modal2

const openModal2 = function () {
  modal2.classList.remove("hidden");

  const confirmBtn = document.getElementById("confirmB");
  const resetBtn = document.getElementById("reset");

  //Start Over eventlistener
  resetBtn.addEventListener("click", function () {
    modal2.classList.add("hidden");
    heightInput.value = "";
    sex.value = "";
  });
  //confirm button eventListener
  confirmBtn.addEventListener("click", function () {
    modal2.classList.add("hidden");
    demographics.classList.add("hidden");
    document.querySelector("h1").classList.add("hidden");
  });
};
//Functions to calc pbw and vT
const pbwFormula = function (height, sex) {
  // pbw formula for females, rounded to 1/10
  if (sex === "Female") {
    return (pbw = Math.round((45.5 + 2.3 * [height - 60]) * 1000) / 1000);
    // pbw formula for males, rounded to 1/10
  } else if (sex === "Male") {
    return (pbw = Math.round((50 + 2.3 * [height - 60]) * 1000) / 1000);
  }
};

const vTCalc = function () {
  const vT = Math.round(pbw * 6);
  console.log(vT);
};

//eventListener for submit button. This will direct user to one of 4 modals depending on what vent guideline was picked.
btnSubmit.addEventListener("click", function () {
  const ptSex = sex.value;
  const ptHeight = heightInput.value;
  if (ptSex === "" || ptHeight === "") {
    alert("Please complete all fields.");
  } else {
    openModal1();
    //Eventlistener ards
    btnArds.addEventListener("click", function () {
      modal1.classList.add("hidden");
      openModal2();
      confirm.innerHTML = `Confirm! ${ptSex}, ${ptHeight} inches tall, using the ARDS Guideline?`;
    });
    //Eventlistener copd
    btnCopd.addEventListener("click", function () {
      modal1.classList.add("hidden");
      openModal2();
      confirm.innerHTML = `Confirm! ${ptSex}, ${ptHeight} inches tall, using the COPD Guideline?`;
    });
    //Eventlistener heart
    btnHeart.addEventListener("click", function () {
      modal1.classList.add("hidden");
      openModal2();
      confirm.innerHTML = `Confirm! ${ptSex}, ${ptHeight} inches tall, using the Heart & Others Guideline?`;
    });
    //Eventlistener neuro
    btnNeuro.addEventListener("click", function () {
      modal1.classList.add("hidden");
      openModal2();
      confirm.innerHTML = `Confirm! ${ptSex}, ${ptHeight} inches tall, using the Neuro Protective Guideline?`;
    });
  }
  //Call function to calc PBW
  pbwFormula(ptHeight, ptSex);

  //Call function to calc vT at 6/kg
  vTCalc(pbwFormula(ptHeight, ptSex));
});

//_____________________________________________________________________

//The following modals will open depending on what was selectied prior to this.
//Modal opening on ARDS
//Modal opening on COPD
//Modal opening on HEART & OTHERS
//Modal opening on NEURO
