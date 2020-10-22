const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
class Juego {

    constructor() {
        this.inicializar()
    }

    inicializar() {
        this.counter()    
    }
    counter(){ 
        let count = 3
        var regresive = setInterval(function(){
            document.getElementById('btnEmpezar').innerHTML=count
            count--
            if(count<0){
                clearInterval(regresive)
                btnEmpezar.classList.add('hide')
            }
        },1000)       
    }
}

function empezarJuego() {
    var juego = new Juego()
}