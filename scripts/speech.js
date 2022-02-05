export let voices='';
let synthesisUtterance='';

export function getVoice(){
    voices = speechSynthesis.getVoices();
}

export function utterText(text){
        synthesisUtterance=speechSynthesis;
        voices= speechSynthesis.getVoices();
        const utterThis= new SpeechSynthesisUtterance(text);
        utterThis.voice= voices.find(voice=> voice.name ==='Microsoft Sabina - Spanish (Mexico)');    
        synthesisUtterance.speak(utterThis);  
}

export function stopSpeech() {
    if(synthesisUtterance.speaking){
        synthesisUtterance.cancel();
    }
}