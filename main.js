

let canva = document.getElementById("canvas")
canva.innerHTML="<h1 id='plobrem'>問題</h1><h2 id='roma'>mondai</h2>"

let roma=""
let kanji=""


function putForCanvas(html){
    let canva = document.getElementById("canvas")
    canva.innerHTML=html        
}

function showThePloblem(kanjif,romaf){
    let canvaf = document.getElementById("plobrem")
    let canvas = document.getElementById("roma")
    canvaf.innerHTML=kanjif
    canvas.innerHTML=romaf
}

function showingtest(first,second){
    showThePloblem(first,second)
    roma =second
    kanji=first
}

function keypress_ivent(e) {
    if (e.key == roma[0]){
        roma = roma.slice(1);
        showThePloblem(kanji,roma)              
    }
        
    
}

document.addEventListener('keypress', keypress_ivent);