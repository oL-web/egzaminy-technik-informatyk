import '../scss/styles.scss';

import Quiz from "./Quiz";
import saveStorage from "./saveStorage";

const quizContainer = document.querySelector(".generate-quiz");
const quizMenu = document.querySelector(".generate-quiz__menu");
const quizBtn = document.querySelector(".generate-quiz__btn-results");
const quizBtnReset = document.querySelector(".generate-quiz__btn-reset");

const quizBtnE12 = document.querySelector(".generate-quiz__btn-e12");
const quizBtnE13 = document.querySelector(".generate-quiz__btn-e13");
const quizBtnE14 = document.querySelector(".generate-quiz__btn-e14");
const quizBtnFavorites= document.querySelector(".generate-quiz__btn-favorites");

const quizResults = document.querySelector(".generate-quiz__results");

let questionObjName = "e13";

const getQuestions = () => saveStorage[questionObjName].slice(0,10);

const quiz = new Quiz(quizContainer, getQuestions());
window.quiz = quiz;
window.saveStorage = saveStorage;
const switchQuestions = (prop)=>{
    quizContainer.style.display = "none";
    quizMenu.style.display = "block";
    questionObjName = prop;
    quizResults.textContent = `Pula pytań została ustawiona na ${prop.toUpperCase()}!`;
};

quizBtnE12.addEventListener("click", () => switchQuestions("e12"));
quizBtnE13.addEventListener("click", () => switchQuestions("e13"));
quizBtnE14.addEventListener("click", () => switchQuestions("e14"));
quizBtnFavorites.addEventListener("click", () => switchQuestions("favorites"));

quizBtn.addEventListener("click", () => {
    const results = quiz.calculateResults();

    quizBtn.disabled = true;
    if(questionObjName !== "favorites") saveStorage[questionObjName] = saveStorage[questionObjName].filter(i=>results.answeredQuestions.indexOf(i) === -1);   
    
    quizResults.textContent = `Zdobyłeś ${results.score} z ${results.totalPoints} punktów, co daje ci ${Math.round(results.percentageScore)}%! W kategorii ${questionObjName.toUpperCase()} pozostało ci jeszcze ${saveStorage[questionObjName].length} pytań!`;
    
    quiz.disableInputs();
    quiz.highlightAnswers();
    saveStorage.save(questionObjName);
});

quizBtnReset.addEventListener("click", () => {
    quiz.questions = getQuestions();
    
    if(quiz.questions.length){
        quizContainer.style.display = "block";
        quizResults.textContent = `Wylosowano pytania!`;
        quizBtn.disabled = false;

        try{ document.body.scrollIntoView({behavior:"smooth",block:"start"}) }
        catch(e){  }
    }
    else quizResults.textContent = `Do ulubionych nie dodano jeszcze żadnych pytań!`;

    quiz.render();
});