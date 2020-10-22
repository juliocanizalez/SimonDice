const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
class Juego {

    constructor() {
        this.generateSeq()
        this.initialize()  
        setTimeout(() => {
            this.nextLevel()
        }, 4500);
    }

    initialize() {
        this.nivel = 1
        this.colors = {
            celeste, 
            violeta, 
            naranja, 
            verde
        }
        this.counter()    
    }

    counter(){ 
        let count = 3
        var countdown = setInterval(function(){
            document.getElementById('btnEmpezar').innerHTML=count
            count--
            if(count<0){
                clearInterval(countdown)
                btnEmpezar.classList.add('hide')
            }
        },1000)      
    }
    
    generateSeq(){
        this.sequence = new Array(30).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel(){
        this.illuminateSeq()
    }

    transformNumberToColor(number){
        switch(number){
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    illuminateSeq(){
        for(let i=0; i < this.nivel; i++){
            const color = this.transformNumberToColor(this.sequence[i])
            setTimeout(() => this.illuminateColor(color), 1000 * i );
        }
    }

    illuminateColor(color){
        this.colors[color].classList.add('light')
        setTimeout(() => this.shutDownColor(color), 350)
    }

    shutDownColor(color){
        this.colors[color].classList.remove('light')
    }
}

function startGame() {
    var juego = new Juego()
}