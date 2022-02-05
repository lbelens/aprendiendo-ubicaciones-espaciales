import {figureGuide} from './assets/dataActivity/left_right/dataFigureGuide.js';
let imgFigureGuide= document.querySelector('.base-figure-activity');

export function getGuideFigure(){
    let randomIndex = Math.floor(Math.random() * figureGuide.length);
    let figure=figureGuide[randomIndex];
    imgFigureGuide.setAttribute('data-info', figure.info);//información que servirá para crear la instrucción
    imgFigureGuide.setAttribute('src', `/assets/images/figureGuide/${figure.nameImg}`);
    return figure;
}

export function getPositionLeftFromFigureGuide(){
    let position= imgFigureGuide.getBoundingClientRect().left;
    return position;
}

