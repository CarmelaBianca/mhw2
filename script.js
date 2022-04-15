function check(event) {
    const divCliccato= event.currentTarget;
    const image = divCliccato.querySelector('.checkbox');
    const questionId=divCliccato.dataset.questionId;
    const choiceId=divCliccato.dataset.choiceId;
    const divs = document.querySelectorAll('[data-question-id='+questionId+']');
    for (let div of divs){
        div.querySelector('.checkbox').src='images/unchecked.png';
        div.classList.add('overlay');
        div.classList.remove('sfondo');
    }
    divCliccato.classList.add('sfondo');
    divCliccato.classList.remove('overlay');
    image.src = 'images/checked.png';

    const fine=stopListener(questionId, choiceId);
    if (fine){
        const result = CalcoloPersonalita(scelte);
        visualizzaPersonalita(result);
    }
}


function stopListener(questionId, choiceId){
    const divListening=document.querySelectorAll('.choice-grid div');
    scelte[questionId]=choiceId;
    if(scelte.one !== null && scelte.two !== null && scelte.three !== null){
        for (let div of divListening){
            div.removeEventListener('click', check);
        }
        return 1;
    } 
}


function CalcoloPersonalita(scelte){
    if(scelte.one === scelte.two || scelte.one === scelte.three)
    return scelte.one;
    else if(scelte.two === scelte.three)
    return scelte.two;
    else if (scelte.one !== scelte.two && scelte.one !== scelte.three)
    return scelte.one;
}

function visualizzaPersonalita(result){
    const h1 = document.querySelector('h1.r');
    const p = document.querySelector('p.r');
    h1.textContent = RESULTS_MAP[result].title;
    p.textContent = RESULTS_MAP[result].contents;
    document.querySelector('.result').classList.remove('result');
    const btn_restart = document.querySelector('#restart');
    btn_restart.addEventListener('click', restart);
}

function restart(){
    const btn = document.querySelector('#btn');
    btn.classList.add('result');
    const divs = document.querySelectorAll('.choice-grid div');
    const images = document.querySelectorAll('.checkbox');
    for (let div of divs){
        div.addEventListener('click', check);
        div.classList.remove('overlay');
        div.classList.remove('sfondo');
      }
    for(let image of images){
      image.src = 'images/unchecked.png';
    }
    scelte.one=null;
    scelte.two=null;
    scelte.three=null;
  }

const divs=document.querySelectorAll('.choice-grid div');
for (let d of divs){
    d.addEventListener('click', check);
}
let scelte={
    'one':null,
    'two':null,
    'three':null
}


