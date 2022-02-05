
export let color;
import {coloringCharacter,characterCommon} from './assets/dataActivity/left_right/dataCharacter.js';

//dibujar los personajes en diferentes posiciones
export function createCharacter(typeExercise, btn_options){

    switch (typeExercise) {
        case 'coloring': 
       
        createCharacterForColoringExercise(btn_options);
            break;
           
        case 'single choice':
            createCharacterForSingleChoiceExercise(btn_options);
             break;

        case 'multiple choice':
            createCharacterForMultipleChoiceExercise(btn_options);
             break;

        default:
            break;
    }
}

function createCharacterForColoringExercise(containers){
    let index= getRandomIndex(coloringCharacter);
    let character = coloringCharacter;
    let numPosition=1;
    containers.forEach(container=>{
        if(numPosition===2){
            numPosition=1;
            container.style.setProperty('align-self', character[index].positionOption1);
         }else{
            numPosition++;
             container.style.setProperty('align-self', character[index].positionOption2);
         }
        container.innerHTML= `${character[index].svg}`;
        container.setAttribute('data-name', character[index].name);
        container.setAttribute('data-article', character[index].article);
        container.style.setProperty('background-size', '90%');
        container.style.setProperty('background-position', 'center');
        color=character[index].color;
    });   
}


function createCharacterForSingleChoiceExercise(containers){
    let indexType= getRandomIndex(characterCommon);
    let index=getRandomIndex(characterCommon[indexType].character);
    let character = characterCommon[indexType].character;
    //una vez teniendo que personajes van a ser se ponen en el contenedor
    containers.forEach(container =>{
        container.style.setProperty('align-self', character[index].positionOption1);
        container.style.background= `url(/assets/images/characters/${character[index].nameImg}) no-repeat`;
        container.setAttribute('data-name', character[index].name);
        container.setAttribute('data-article', character[index].article);
        container.style.setProperty('background-size', '90%');
        container.style.setProperty('background-position', 'center');
    });
}


function createCharacterForMultipleChoiceExercise(containers){
    let indexType= getRandomIndex(characterCommon);
    let index=getRandomIndex(characterCommon[indexType].character);
    let character = characterCommon[indexType].character;
    //una vez teniendo que personajes van a ser se ponen en el contenedor
        containers.forEach(container =>{
            container.style.setProperty('align-self', character[index].positionOption1);
            container.style.background= `url(/assets/images/characters/${character[index].nameImg}) no-repeat`;
            container.setAttribute('data-name', character[index].name);
            container.setAttribute('data-article', character[index].article);
            container.style.setProperty('background-size', '90%');
            container.style.setProperty('background-position', 'center');
     });
}


function getRandomIndex(array){
    let randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;

    //desordenar un arreglo
    // array.sort(() => Math.random()-0.5);
    // console.log(array);
}