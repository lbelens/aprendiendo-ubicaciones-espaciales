let playing=false;
const btnSound = document.querySelector('#btn-sound');
let nameSound = `background_${btnSound.getAttribute("data-sound")}.mp3`;
let sound= new Audio(`/assets/sounds/${nameSound}`);

document.addEventListener('DOMContentLoaded',()=>{
    playing=true;
    sound.loop=true;
    sound.play();
})
btnSound.addEventListener('click', playSound);

function playSound(){ 
    if(playing){
        playing=false;
        sound.pause();
        btnSound.classList.remove('btn_sound-enable');
        btnSound.classList.add('btn_sound-disable');
    }
    else{ 
        playing=true;
        sound.loop=true;
        sound.play();
        btnSound.classList.remove('btn_sound-disable');
        btnSound.classList.add('btn_sound-enable');
    }
}

