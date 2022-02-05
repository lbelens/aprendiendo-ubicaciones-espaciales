const coinsExercise = document.querySelector('#coins-exercise');
export let amount_award=0;//cantidad total de recompensas  que obtiene en cada actividad, esta variable se reinicia a 0 cada vez que pasa a otra actividad
const MIN_AWARD=1;
const MAX_AWARD=100;
let coinElement=""; //variable que almacena la etiqueta que contiene la moneda con el gif de estreellas
export let amountCoinsExercise=0;
let count_element=0 ; //variable que almacena la cantidad de etiquetdas html que se van creando cuando se le da una recompensa al usuario
//variable que almacena la cantidad de monedas que se le da al usuario cuando le corresponde la máxima recompensa
export function give_award(typeAward){ 
    if(typeAward==='one hundred coins'){
        const music = new Audio('/assets/sounds/sound_coins.mp3');
        let count_coin=0;
        let time= setInterval(() => {
            music.play();
            count_coin++;
            // coinsGif.style.display="block";
            coinsExercise.textContent=amount_award+=1;
            if(count_coin===MAX_AWARD){
                clearInterval(time);
            }
        }, 20);
    }
    else{
        amount_award += MIN_AWARD;
        coinsExercise.textContent=amount_award;
        const music = new Audio('/assets/sounds/sound_correct.mp3');
        music.play();
   
    }
}


export function animationCoin(character) {
    count_element++;
    let left = character.getBoundingClientRect().x;
    let top = character.getBoundingClientRect().y;
 
    let element = `<div class="container-coin" id="container-coin-${count_element}">
        <img class='effect-coin' src="/assets/images/utils/coin.png">
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend',element);
    coinElement= document.querySelector(`#container-coin-${count_element}`);
    coinElement.style.left=`${left}px`;
    coinElement.style.top=`${top}px`;   
    const music = new Audio('/assets/sounds/sound_correct.mp3');
    music.play();
}
