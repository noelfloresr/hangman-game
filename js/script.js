window.onload = function(){
    var currentWord = [];
    var wordFromLocal = localStorage["currentWord"];
    var db = ["mesa", "casa", "algo", "ciudad", "pais", "managua", "masaya", "carro","ooqia"];
    var countWins = 0;
    var countTries = 0;
    var confirmLoad = false;
    var hitsPosition = [];

    //Dom Elements
    var inputContainer = document.getElementById("input-container");
    var elementCountTries = document.getElementById("countTries");
    var currentLetter = document.getElementsByClassName("letter");
    var letterContainer = document.getElementById("letter-container");
    var gameOver = document.getElementById("img-gameover");
    var lost = document.getElementById("img-loser");

    var randomWord = function(){
        var x = Math.floor(Math.random() * db.length);
        return x;
    };

    var generateCurrentWord = function(){
        randomWord();
        var randomX = randomWord();
        currentWord = db[randomX].split('');
    };

    //Decide to load from local
    //console.log(wordFromLocal.length);
    if(wordFromLocal != undefined){
        if(confirm("Le gustaría cargar el último juego guardado?")){
            currentWord = JSON.parse(wordFromLocal);
            confirmLoad = true
        }else{
            generateCurrentWord();
        }
    }else{
        generateCurrentWord();
    };
    
       
    countTries = currentWord.length;
    elementCountTries.innerText = countTries;

    var createInputs = function(){
        for(var i=0; i < currentWord.length; i++){
            inputContainer.innerHTML = inputContainer.innerHTML + '<input type="text" class="custom-input" data-value="' + i + '">';
        }
    }

    createInputs();

    if(confirmLoad){
        hitsPosition = JSON.parse(localStorage["hitsPosition"]);
        console.log(hitsPosition);
        for(var x = 0; x < currentWord.length; x++){
            debugger;
            var currentInput = document.getElementsByClassName("custom-input")[x];
            for (var y = 0; y < hitsPosition.length; y++){
                if(currentWord[x].toUpperCase() == hitsPosition[y]){
                    currentInput.value = currentWord[x]; 
                }
            }                                                   
        }
    }

    //Add click event to letters
    for(var i=0; i<currentLetter.length; i++){
        currentLetter[i].addEventListener("click", function(){
            if(countTries > 1){
                var won = false;
                for(var x = 0; x < currentWord.length; x++){
                    if(this.innerText == currentWord[x].toUpperCase()){
                        var currentInput = document.getElementsByClassName("custom-input")[x];
                        currentInput.value = this.innerText;
                        countWins += 1;
                        won = true;
                    }                                                                               
                }
                this.classList.add('disabled');
                if(!won){
                    countTries -= 1;
                    elementCountTries.innerText = countTries;
                    lost.classList.remove('d-none');
                    setTimeout(function(){
                        lost.classList.add('d-none');
                    }, 1000)
                }else{
                    hitsPosition.push(this.innerText);
                    console.log(hitsPosition);
                    var winner = document.getElementById("img-winner");
                    winner.classList.add('d-block');
                    setTimeout(function(){
                        winner.classList.remove('d-block');
                        winner.classList.add('d-none');
                    }, 1000);
                }
            }else{
                elementCountTries.innerText = 0;
                gameOver.classList.remove('d-none');
                letterContainer.classList.remove("d-flex");
                letterContainer.classList.add("d-none");
            }
        });
    }
    var saveGameButton = document.getElementById("save-game");
    saveGameButton.addEventListener("click", function(){
        localStorage["currentWord"] = JSON.stringify(currentWord);
        localStorage["hitsPosition"] = JSON.stringify(hitsPosition);
        console.log(localStorage["hitsPosition"]);
    });

    
}

