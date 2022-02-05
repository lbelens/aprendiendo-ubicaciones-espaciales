
import {getGuideFigure} from './figureGuide.js';
import {getCorrectAnswers, correctPosition,analyzeAnswer, showResult} from './answer.js';
import {utterText, stopSpeech, getVoice} from './speech.js';
import {createCharacter, color} from './character.js';
import {instanceActivity, activity} from './activity.js';
export const EXERCISE_COLORING='coloring';
export const EXERCISE_MULTIPLE_SELECTION='multiple choice';
export const EXERCISE_SINGLE_SELECTION='single choice'; 
const coinsExercise = document.querySelector('#coins-exercise'); //es el elemento donde se muestran las monedas que lleva el usuario en el ejercicio
const btnBack= document.querySelector('.navigation-btn_back');
const btnNext= document.querySelector('.navigation-btn_next');
const btn_instruction_sound= document.querySelector('.instruction_btn-audio');
let btn_options = document.querySelectorAll('.design-character'); //botones de las diferentes opciones que se le presentan al usuario como dibujos animados
const container_colors= document.querySelector('.container-color'); //es el contenedor donde se encuentran las partes que conforman la mancha de color
const main_container_exercise = document.querySelector('.main-exercise-container'); //es el espacio donde esta el las partes que conforman al ejercicio
export const instruction = document.querySelector('.instruction_text');
let elementsColor,articleCharacter; //elementsColor almacena la parte del personaje (zanahoria, naranja,etc) que se podrá pintan. la variable articleCharacter almacena el articulo propio del persona
let coloring=false; //variable que almacena si el ejercicio es de colorear o no
let limitNumberOfOptions=0; //guarda el número de opciones limite para que el usuario eliga
let scoreUser=0; //cantidad de respuestas elegidas correctamente
let nameCharacter; //variable que almacena el nombre del personaje
let numberOfOptionsChosen=0; //almacena la cantidad de veces que el usuario elige una opción
let typeExecise, figure, options; //la variable typeExecise almacena el tipo de ejercicio que esta actualmente. La variable figure almacena un objeto de la figura guía que va a aparecer en el ejercicio. La variable options almacena un array de btn_options
const typesExercises=['coloring', 'single choice', 'multiple choice'];//Tipos de ejercicios que hay

document.addEventListener('DOMContentLoaded', ()=>{
    addEvents();
    instanceActivity(); //instanciar el objeto actividad para que se pueda acceder a sus metodos disponibles
    getVoice(); //obtiene las voces de la API Speech Synthesis para utilizarlas en el método utterInstrucion
    initExercise();

})

function addEvents() {
    btn_instruction_sound.addEventListener('click',()=>{
        utterText(instruction.textContent)});

    btnBack.addEventListener('click', ()=>{
        stopSpeech();
        window.location.href='leccion.html';
    });

    btnNext.addEventListener('click',createNewExercise);
}

function initExercise(){
    typeExecise = getTypeExercise(typesExercises); //se obtiene aleatoriamente el tipo de ejercicio
    createExercise(typeExecise);
    setTimeout(() => {
        utterText(instruction.textContent); //reproduce un audio que dice la instrucción del ejercicio
    }, 1000);
}

function createExercise(typeExecise){
    //se obtienen los elementos que serán las opciones de la pregunta y después se construye el ejercicio de acuerdo a su tipo
     switch(typeExecise){
         case EXERCISE_COLORING: 
            btn_options = document.querySelectorAll('.character[data-option="multiple"]');
            buildExercise(exerciseColoring);        
            break;

         case EXERCISE_SINGLE_SELECTION:
            btn_options = document.querySelectorAll('.character[data-option="single"]');
            buildExercise(exerciseSingleSelectionChoice); 
            break;

        case EXERCISE_MULTIPLE_SELECTION:
             btn_options = document.querySelectorAll('.character[data-option="multiple"]'); 
             buildExercise(exerciseMultipleSelectionChoice); 
                 break;   
         default:
             break;
     }
} 


function buildExercise(buildExerciseForType){
    options=Array.from(btn_options); //convierte en un array los btn_options
    createCharacter(typeExecise, options); //se crean los personajes de acuerdo al tipo de ejercicio
    figure=getGuideFigure(); //se obtiene la figura guía que se pondra en el ejercicio
    let correctAnswers=getCorrectAnswers(options); //se obtienen las opciones correctas
    limitNumberOfOptions=correctAnswers.length; //se almacena el limite de opciones que el usuario puede elegir
    nameCharacter=correctAnswers[0].getAttribute('data-name');
    articleCharacter=correctAnswers[0].getAttribute('data-article');
    buildExerciseForType();
}

//ejercicio para colorear
function exerciseColoring() {
    main_container_exercise.style.setProperty('cursor', `url(/assets/images/utils/brush/brush.png), auto`); //se pone como cursor una brocha 
    let option_color=container_colors.children[0]; //se obtiene la mancha de color que el un elemento
    container_colors.style.setProperty('visibility', 'visible'); //se hace visible el contenedor de la mancha de color
    option_color.style.setProperty('fill', `#${color}`);//se pinta la mancha de acuerdo al color de los personajes

    instruction.textContent= `Pinta ${articleCharacter =='el' ? 'los' : `${articleCharacter}s`} ${nameCharacter}s que están a la ${correctPosition} ${figure.info}`; //se agrega la instrucción

    elementsColor = document.querySelectorAll('.objeto'); //se obtienen las partes de los elementos que se pueden pintar

    for (const elementColor of elementsColor) {
        //se agrega el evento para pintar los elementos cuando se da un clic y después revisa si el elemento es el correcto
        elementColor.addEventListener('click', (e)=>{
            e.preventDefault();
            if(coloring){
                let element = e.target;
                element.style.setProperty('fill', `#${color}`);
                reviewExercise(e)
            }
        }); 
    }

    option_color.addEventListener('click', ()=>{
          //se agrega el evento clic a la mancha de color
        coloring=true;
        main_container_exercise.style.setProperty('cursor', `url(/assets/images/utils/brush/${color}-brush.png), auto`); 
    })
}

//ejercicio de selección multiple
function exerciseMultipleSelectionChoice() {
    instruction.textContent= `Selecciona ${articleCharacter =='el' ? 'los' : `${articleCharacter}s`} ${nameCharacter}s que están a la ${correctPosition} ${figure.info}`;
     //poner eventos a todas las opciones
     for (const btn of btn_options) {
        btn.addEventListener('click', reviewExercise);
    }
}

//ejercicio de selección única
function exerciseSingleSelectionChoice() {
    instruction.textContent= `Selecciona ${articleCharacter} ${nameCharacter} que está a la ${correctPosition} ${figure.info}`;
     //poner eventos a todas las opciones
     for (const btn of btn_options) {
        btn.addEventListener('click', reviewExercise);
    }
}

function getTypeExercise(typesExercises){
    //se obtiene el tipo de ejercicio al azar
    let randomIndex = Math.floor(Math.random() * typesExercises.length);
    return typesExercises[randomIndex];
}

function reviewExercise(option) {
    let chosenOption= getChosenOption(option); //obtener la opcion que eligio el usuario, pero opcion que se puede validar
    numberOfOptionsChosen++;
    scoreUser=analyzeAnswer(chosenOption, scoreUser); //se obtiene el score del usuario analizando su respuesta
    if(isExerciseFinish()){
        //si el ejercicio ha terminado se muestra el resultado al usuario y se quitan los eventos, después de 4 segundos se crea un nuevo ejercicio
        showResult(scoreUser, typeExecise);
        if(typeExecise==EXERCISE_COLORING){ coloring=false;}
        //se eliminan los eventos click que se le ha dado a las opciones al terminar de seleccionar el limite de opciones 
         options.forEach(option => {
             deleteEvent(option);
         }); 
         // //SE MUESTRA OTRO EJERCICIO
        
        setTimeout(()=>{
            createNewExercise();
        },4000);
    }
    else{
        deleteEvent(chosenOption);
    }
}

function isExerciseFinish() {
    if(numberOfOptionsChosen===limitNumberOfOptions){
        return true;
    }
    else{
        return false;
    }
}
//elimina el evento click de las opciones que aparecen en la actividad
function deleteEvent(option){
    option.removeEventListener('click', reviewExercise);
}

//obtiene la opcion que eligio el usuario
function getChosenOption(option) {
    let chosenOption;
    typeExecise===EXERCISE_COLORING ? chosenOption=option.target.parentElement.parentElement : chosenOption= option.target;

    return chosenOption;
}

async function createNewExercise() {
    let amountCoinsExercise= parseInt(coinsExercise.textContent); //se obtienen las monedas que el usuario ganó en el ejercicio
    await activity.updateCoins(amountCoinsExercise); //se actualizan las monedas en la base de datos
    stopSpeech(); //si se esta reproduciendo el speech se detiene
    //se restablece a 0 las variables
    numberOfOptionsChosen=0;
    scoreUser=0;
    //se remueven las tachas y palomitas que hubo
    btn_options.forEach(option=>{
        if(option.children.length>0){
            let childrenOption= Array.from(option.children);
            childrenOption.forEach(child=>{option.removeChild(child)})
         }
         option.style.setProperty('background', 'none');
        }
     )
     //si el ejercicio es para pintar se debe quitar el cursor con imagen de pincel y se oculta el contenedor de la mancha de color
     if(typeExecise === EXERCISE_COLORING){  
        main_container_exercise.style.setProperty('cursor', 'auto'); 
        container_colors.style.setProperty('visibility', 'hidden');
        coloring=false;
    }

 //se quitan las monedas que apareciedo encima de los personajes
    let containerCoins = document.querySelectorAll('.container-coin');
    containerCoins.forEach((container)=>{
        document.body.removeChild(container);
    });
//se inicia un nuevo ejercicio y 
    initExercise();
    // utterInstrucion();
}