// import {coloringCharacter,characterCommon} from './character';
import {getInfoUserLocalStorage} from './localStorage.js';
import {getCoinsLefRightActivity} from './autentication.js';
import {getPositionLeftFromFigureGuide} from './figureGuide.js';
import {updateCoinsLefRightActivity} from './autentication.js';
let dataActivity,nameActivity;
let user="";
let coinsActivity;
const coins=document.querySelector('#coins-activity'); //cantidad de monedas que lleva el usuario
export let activity;

document.addEventListener('DOMContentLoaded', ()=>{
    user = getInfoUserLocalStorage();
    dataActivity= document.body.getAttribute("data-activity");
    nameActivity= document.body.getAttribute("data-name-activity");
    if(dataActivity==="home activity"){
        setActivity(); //en el home(index) de la actividad
    }
    
})


async function setActivity() {
    //se obtienen las recompensas de la actividad
    switch(nameActivity){
        case 'left and right': 
           coinsActivity= await getCoinsLefRightActivity(user.id);
           if(coinsActivity!=undefined){
                coins.textContent=  coinsActivity;
           } 
                break;

        case 'in and out':
           coinsActivity=user.coins_activity_in_out;
           coins.textContent=  coinsActivity;
                break;

       case 'up and down':
            coinsActivity=user.coins_activity_up_down;
            coins.textContent=  coinsActivity;
                break;   
        default:
                break;
    }
}

export function instanceActivity(){
    switch(nameActivity){
        case 'left and right': 
           activity = new LeftRightActivity();   
                break;

        case 'in and out':
           activity = new InOutActivity();
                break;

       case 'up and down':
            activity = new UpDownActivity();
                break;   
        default:
                break;
    }

    console.log(activity);
}

export class LeftRightActivity{
//métodos necesarios para crear la actividad Izquierda y derecha
    getPositions(){
        return ['izquierda', 'derecha'];
    }

    getAllCorrectPositions(correctPosition, options){
        const POSITION_RIGHT = 'derecha';
        const POSITION_LEFT = 'izquierda';
        let allCorrectPositions = options.filter((option)=>{
            let positionXFromFigureGuide=getPositionLeftFromFigureGuide(); //e obtiene la posición X del elemento que cotiene la figura guia
            if(option.getBoundingClientRect().x > positionXFromFigureGuide){
                    return correctPosition === POSITION_RIGHT;
            }
            else if(option.getBoundingClientRect().x < positionXFromFigureGuide){
                    return correctPosition === POSITION_LEFT;
            }
        });

        return allCorrectPositions;
    }

    updateCoins(coins){
        updateCoinsLefRightActivity(user.id,coins);
    }

    getCoins(){

    }

}

export class InOutActivity{
    //métodos necesarios para crear la actividad Dentro y fuera
    getPositions(){
        return ['adentro', 'afuera'];
    }
}

export class UpDownActivity{
    //métodos necesarios para crear la actividad Arriba y abajo
    getPositions(){
        return ['arriba', 'abajo'];
    }
}