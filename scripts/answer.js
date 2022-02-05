import {activity} from './activity.js'
import {color} from './character.js';
import {give_award, animationCoin} from './award.js'; 
import {EXERCISE_COLORING, EXERCISE_SINGLE_SELECTION} from './exercise.js';
const TYPE_AWARD_MIN='a coin';
const TYPE_AWARD_MAX='one hundred coins';
let correctAnswers=[];
let score=0;
export let correctPosition='';


export function getCorrectAnswers (options) {
    let allCorrectPositions= getAllCorrectPositions(options);//todas las opciones que hay para que el usuario pueda elegir
    correctAnswers= allCorrectPositions.filter((option)=>{
        //se obtiene las respuestas correctas, ya que pueden haber diferentes personajes en una misa posición, y en las instrucciones solo dirá que se seleccione o pinte un grupo de personajes en especifico
        return option.getAttribute('data-name')===allCorrectPositions[0].getAttribute('data-name');
    });    
    score=correctAnswers.length;
    return correctAnswers;
}

function getAllCorrectPositions(options) {
    let positions = activity.getPositions();
    correctPosition=getCorrectPosition(positions);
    let allCorrectPositions = activity.getAllCorrectPositions(correctPosition,options);
    return allCorrectPositions;
};

function getCorrectPosition(positions){
    let num =  Math.floor((Math.random() * (100 - 1 + 1)) + 1);
    correctPosition = num%2===0 ? correctPosition= positions[0] : correctPosition= positions[1];
    return correctPosition;
}


export function isCorrectAnswer(chosenOption) {
    if(correctAnswers.includes(chosenOption)){
        return true;
    }else
    {return false}
}

export function showCorrectAnswer(typeExecise){
    correctAnswers.forEach(correctOption=>{
        const img= document.createElement('img');
        img.src=`/assets/images/utils/circle.svg`;
        img.classList.add( 'retroalimentacion');
        correctOption.appendChild(img);
        if(typeExecise===EXERCISE_COLORING){
            let elementColoring;
            let partToColoring=[];
            let childrenCorrectOption=correctOption.children[0].children;
            partToColoring=Array.from(childrenCorrectOption);
            elementColoring= partToColoring.find(element=> element.classList.contains('objeto'));
            elementColoring.style.setProperty('fill', `#${color}`);
        }
    })
}

export function showResult(scoreUser, typeExercise) {
    if(scoreUser===score && typeExercise!=EXERCISE_SINGLE_SELECTION){
        setTimeout(()=>{
            give_award(TYPE_AWARD_MAX);
        }, 1000);}
    else{showCorrectAnswer(typeExercise)}
}

export function analyzeAnswer (chosenOption,scoreUser) {
    if(isCorrectAnswer(chosenOption)){
        mark(chosenOption, 'correct'); 
        animationCoin(chosenOption);
        give_award(TYPE_AWARD_MIN);
        scoreUser++;
        let indexCorrectAnswer=correctAnswers.indexOf(chosenOption);
        correctAnswers.splice(indexCorrectAnswer,1);
    }
    else{
        mark(chosenOption, 'incorrect');
        const music = new Audio('/assets/sounds/sound_incorrect.mp3');
        music.play();
    }
    return scoreUser;
}


//Método para mosrtrar al usuario si la respuesta fue correcta o no
function mark(chosen_option, result){
    const img= document.createElement('img');
    img.src=`/assets/images/utils/${result}.svg`;
    img.classList.add( 'validar');
    chosen_option.appendChild(img);
}