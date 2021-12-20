"use strict";
const demographics = document.querySelector(".demo");
const btnArds = document.getElementById("ards");
const btnCopd = document.getElementById("copd");
const btnHeart = document.getElementById("heart");
const btnNeuro = document.getElementById("neuro");
const confirmBtn = document.getElementById("confirmB");
const resetBtn = document.getElementById("reset");
const initForm = document.querySelector(".form");
const btnSubmit = document.querySelector("#submit");
let heightInput = document.getElementById("height");
let sex = document.querySelector("#sex");
let bagged = document.querySelector("#bagged");
const modal1 = document.querySelector(".modalOne");
const modal2 = document.querySelector(".modalTwo");
const ardsModal = document.querySelector(".ardsModal");
const copdModal = document.querySelector(".copdModal");
const heartModal = document.querySelector(".heartModal");
const neuroModal = document.querySelector(".neuroModal");
let initSetModal = document.querySelector(".initSet");
const abgModal = document.querySelector(".abg");
const phInput = document.getElementById("ph");

const paco2Input = document.getElementById("paco2");
const hco3Input = document.getElementById("hco3");
const pao2Input = document.getElementById("pao2");
const spo2Input = document.getElementById("spo2");
const abgSubBtn = document.getElementById("abgBtn");
const clearAbgBtn = document.getElementById("clearAbg");
const initSet = document.querySelector(".initSet");
let initialSet = document.createElement("p");
let initBtn = document.createElement("button");
let confirm = document.getElementById("confirm");
let pbw = 0;
let ards = false;
let copd = false;
let heart = false;
let neuro = false;

heightInput.value = "";
sex.value = "";
bagged.value = "";
phInput.value = "";
paco2Input.value = "";
hco3Input.value = "";
pao2Input.value = "";
spo2Input.value = "";

//This function opens modal1
const openModal1 = function () {
  modal1.classList.remove("hidden");
};

//This function opens ards modal
const openArdsModal = function () {
  ardsModal.classList.remove("hidden");
};

//This function opens copd modal
const openCopdModal = function () {
  copdModal.classList.remove("hidden");
};

//This function opens heart modal
const openHeartModal = function () {
  heartModal.classList.remove("hidden");
};

//This function opens neuro modal
const openNeuroModal = function () {
  neuroModal.classList.remove("hidden");
};

//This function opens modal2

const openModal2 = function () {
  modal2.classList.remove("hidden");
};

//This function opens abgModal
const openAbg = function () {
  abgModal.classList.remove("hidden");
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

const vTCalc = function (pbw) {
  const vT = Math.round(pbw * 6);
  return vT;
};

//eventListener for submit button. This will direct user to one of 4 modals depending on what vent guideline was picked.
btnSubmit.addEventListener("click", function () {
  const ptSex = sex.value;
  const ptHeight = heightInput.value;
  const ptBagged = bagged.value;
  if (ptSex === "" || ptHeight === "" || ptBagged === "") {
    alert("Please complete all fields.");
  } else {
    openModal1();

    //confirm button eventListener
    confirmBtn.addEventListener("click", function () {
      modal2.classList.add("hidden");
      demographics.classList.add("hidden");
      document.querySelector("h1").classList.add("hidden");

      if (ards != false) {
        openArdsModal();
      } else if (copd != false) {
        openCopdModal();
      } else if (heart != false) {
        openHeartModal();
      } else if (neuro != false) {
        openNeuroModal();
      }
    });

    //Start Over eventlistener
    resetBtn.addEventListener("click", function () {
      modal2.classList.add("hidden");
      heightInput.value = "";
      sex.value = "";
      bagged.value = "";
      initialSet.textContent = "";
    });

    //Eventlistener ards
    btnArds.addEventListener("click", function () {
      ards = true;
      modal1.classList.add("hidden");
      openModal2();
      confirm.innerHTML = `Confirm! ${ptSex}, ${ptHeight} inches tall, using the ARDS Guideline? Pt is being bagged / no ABG? ${ptBagged}`;

      if (bagged.value === "Yes") {
        console.log("follow yes route");

        //Modal showing VT and Rate, remind user to obtain ABG in 15 minutes.

        initSet.append(initialSet, initBtn);
        initialSet.textContent = `Initial ventilator settings: VT = ${vTCalc(
          pbw
        )}, Rate of 20, PEEP of 8 mmHg.`;

        initBtn.textContent = "Next";
        initBtn.classList.add("button");
        initBtn.addEventListener("click", function () {
          document.querySelector(".initSet").classList.add("hidden");

          //Modal asking: Is new pH <= 7.30?
          ardsModal.classList.add("hidden");
          openAbg();

          abgSubBtn.addEventListener("click", function () {
            const ptPh = phInput.value;
            console.log(ptPh);
            const ptPaco2 = paco2Input.value;
            console.log(ptPaco2);
            const ptHco3 = hco3Input.value;
            console.log(ptHco3);
            const ptPao2 = pao2Input.value;
            console.log(ptPao2);
            const ptSpo2 = spo2Input.value;
            console.log(ptSpo2);
          });
          clearAbgBtn.addEventListener("click", function () {
            phInput.value = "";
            paco2Input.value = "";
            hco3Input.value = "";
            pao2Input.value = "";
            spo2Input.value = "";
          });

          //NOTE: OK, so tommorrow I need to hide this phMOdal and start following the logic to see what adjuctments need to be made.

          //If Yes

          //Increase VT by 30% (Max of 30bpm)

          //If No

          //Is pH >= 7.45?

          //Yes

          //Maintain

          //No

          //Decrease VR by 20% (min 10bpm)
        });
      } else {
        console.log("follow no route");
        //Modal as to enter current VT, total VR and MV

        //Set VT at 6ml/kg

        //Is pH >= 7.30?

        //Yes

        //Is pH >= 7.45?

        //No
      }
    });

    //Eventlistener copd
    btnCopd.addEventListener("click", function () {
      copd = true;
      modal1.classList.add("hidden");
      openModal2();
      confirm.innerHTML = `Confirm! ${ptSex}, ${ptHeight} inches tall, using the COPD Guideline? Pt is being bagged / no ABG? ${ptBagged}`;
    });
    //Eventlistener heart
    btnHeart.addEventListener("click", function () {
      heart = true;
      modal1.classList.add("hidden");
      openModal2();
      confirm.innerHTML = `Confirm! ${ptSex}, ${ptHeight} inches tall, using the Heart & Others Guideline? Pt is being bagged / no ABG? ${ptBagged}`;
    });
    //Eventlistener neuro
    btnNeuro.addEventListener("click", function () {
      neuro = true;
      modal1.classList.add("hidden");
      openModal2();
      confirm.innerHTML = `Confirm! ${ptSex}, ${ptHeight} inches tall, using the Neuro Protective Guideline? Pt is being bagged / no ABG? ${ptBagged}`;
    });
  }
  //Call function to calc PBW
  pbwFormula(ptHeight, ptSex);

  //Call function to calc vT at 6/kg
  vTCalc(pbwFormula(ptHeight, ptSex));
});

//_____________________________________________________________________

//The following modals will open depending on what was selectied prior to this.
//Modal opening on ARDS class='.ardsModal'
//Modal opening on COPD
//Modal opening on HEART & OTHERS
//Modal opening on NEURO
