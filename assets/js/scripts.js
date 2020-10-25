const lightBlue = document.getElementById('lightBlue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const btnStart = document.getElementById('btnStart')
const LAST_LEVEL = 15
class Juego {

    constructor() {
        this.generateSeq()
        this.initialize()  
        setTimeout(() => {
            this.nextLevel()
        }, 4500);
    }

    initialize() {
        this.nextLevel = this.nextLevel.bind(this)
        this.chooseColor = this.chooseColor.bind(this)
        this.level = 1
        this.colors = {
            lightBlue, 
            violet, 
            orange, 
            green
        }
        this.counter()    
    }

    counter(){ 
        let count = 3
        var countdown = setInterval(function(){
            document.getElementById('btnStart').innerHTML=count
            count--
            if(count<0){
                clearInterval(countdown)
                btnStart.classList.add('hide')
            }
        },1000)     
    }
    
    generateSeq(){
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel(){
        document.getElementById('level').innerHTML = `Level ${this.level}`
        this.subLevel = 0
        this.illuminateSeq()
        this.addClickEvent()
    }

    transformNumberToColor(number){
        switch(number){
            case 0:
                return 'lightBlue'
            case 1:
                return 'violet'
            case 2:
                return 'orange'
            case 3:
                return 'green'
        }
    }

    transformColorToNumber(color){
        switch(color){
            case 'lightBlue':
                return 0
            case 'violet':
                return 1
            case 'orange':
                return 2
            case 'green':
                return 3
        }
    }

    illuminateSeq(){
        for(let i=0; i < this.level; i++){
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

    addClickEvent(){
        this.colors.lightBlue.addEventListener('click', this.chooseColor)
        this.colors.green.addEventListener('click', this.chooseColor)
        this.colors.violet.addEventListener('click', this.chooseColor)
        this.colors.orange.addEventListener('click', this.chooseColor)
    }

    deleteClickEvts(){
        this.colors.lightBlue.removeEventListener('click', this.chooseColor)
        this.colors.green.removeEventListener('click', this.chooseColor)
        this.colors.violet.removeEventListener('click', this.chooseColor)
        this.colors.orange.removeEventListener('click', this.chooseColor)
    }

    chooseColor(evt){
        const colorName = evt.target.dataset.color
        const colorNumber = this.transformColorToNumber(colorName)
        this.illuminateColor(colorName)
        if(colorNumber === this.sequence[this.subLevel]){
            this.subLevel++
            if(this.subLevel ===this.level){
                this.level++
                this.deleteClickEvts()
                if(this.level===(LAST_LEVEL+1)){
                    this.victory()
                }else{
                    setTimeout(this.nextLevel, 1000)
                }
            }
        }else{
            this.defeat()
        }
    }

    victory(){
        swal('Victory!', 'Congratulations! You have completed all the levels!', 'success' ).then(this.toggleButton())
    }

    defeat(){
        swal('Defeat', 'Better luck next time :(', 'error').then(()=> {
            this.deleteClickEvts()
            this.toggleButton()
        })
    }

    toggleButton(){
        document.getElementById('level').innerHTML = ' '
        document.getElementById('btnStart').innerHTML='Play'
        btnStart.classList.remove('hide')
        
    }

}

function startGame() {
    new Juego()
}