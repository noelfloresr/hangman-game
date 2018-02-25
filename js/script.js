window.onload = function(){
    
    var db = ["mesa", "casa", "algo", "ciudad", "pais", "managua", "masaya", "carro","ooqia"];

    var randomWord = function(){
        var x = Math.floor(Math.random() * db.length);
        return x;
    }

    randomWord();
    
    var randomX = randomWord();
    var currentWord = db[randomX].split('');
    
    var countWins = 0;
    var inputContainer = document.getElementById("input-container");
    var countTries = currentWord.length;
    var elementCountTries = document.getElementById("countTries")
    elementCountTries.innerText = countTries;

    var createInputs = function(){
        for(var i=0; i < currentWord.length; i++){
            inputContainer.innerHTML = inputContainer.innerHTML + '<input type="text" class="custom-input" data-value="' + i + '">';
        }
    }

    createInputs();

    var currentLetter = document.getElementsByClassName("letter");
    console.log(currentLetter);

    for(var i=0; i<currentLetter.length; i++){
        currentLetter[i].addEventListener("click", function(){
            if(countTries > 1){
                var won = false;
                for(var x = 0; x < currentWord.length; x++){
                    if(this.innerText == currentWord[x].toUpperCase()){
                        console.log("Your win");
                        var currentInput = document.getElementsByClassName("custom-input")[x];
                        console.log(currentInput);
                        currentInput.value = this.innerText;
                        countWins += 1;
                        won = true;
                    }                                                                               
                }
                this.classList.add('disabled');
                if(!won){
                    countTries -= 1;
                    elementCountTries.innerText = countTries;
                    var lost = document.getElementById("img-loser");
                    lost.classList.remove('d-none');
                    setTimeout(function(){
                        lost.classList.add('d-none');
                    }, 1000)
                }else{
                    var winner = document.getElementById("img-winner");
                    winner.classList.add('d-block');
                    setTimeout(function(){
                        winner.classList.remove('d-block');
                        winner.classList.add('d-none');
                    }, 1000);
                }
            }else{
                elementCountTries.innerText = 0;
                var gameOver = document.getElementById("img-gameover");
                gameOver.classList.remove('d-none');
                document.getElementById("letter-container").classList.remove("d-flex");
                document.getElementById("letter-container").classList.add("d-none");
            }
        });
    }
}
