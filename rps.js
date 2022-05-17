let games = 0;
let userWins = 0;
let pcWins = 0;

let pcChoise = "";
let uChoise = "";

let partialResultUser = document.querySelector('.electionUserFrame');
let partialResultPc = document.querySelector('.electionPcFrame');
let resultsGame = document.querySelector('.results');

let buttons = document.querySelectorAll('#mandos > button');



function addAttribute() {
    for (let i of buttons) {
        i.removeAttribute('id', 'inservice');
    }
    uChoise = this.dataset.key;
    this.setAttribute("id", 'inservice');
}
let userCHoise = buttons.forEach(bnt => {
    bnt.addEventListener('click', addAttribute)

});



/*select the button play*/

let playButton = document.querySelector('.play');
playButton.addEventListener('click', playGame)

function computerPlay() {
    let numRand = Math.floor(Math.random() * (1, 3));
    pcChoise = numRand;
    return numRand
}

function playGame() {
    if (uChoise == "") {
        alert("select one then press play");

    }

    else {
        playButton.removeEventListener("click", playGame);
        buttons.forEach(bnt => {
            bnt.removeEventListener('click', addAttribute)
        });

        if (games <= 5) {

            let pcChoise = computerPlay();

            let filterElection = function (electionNum) {
                if (electionNum == 0) {
                    return 'paper'
                }
                if (electionNum == 1) {
                    return 'Rock'
                }
                else {
                    return 'scissors'
                }
            }

            let electionUser = filterElection(uChoise);
            let electionPC = filterElection(pcChoise);
            partialResultUser.innerText = electionUser;
            partialResultPc.innerText = electionPC;


            let frameUserChild = document.querySelector('.frameUserChild');
            let videoUser = document.querySelector(`video[data-key="${uChoise}"][own="user"]`);
            videoUser.classList.remove('noVideo');
            videoUser.classList.add('videoPlaying');
            frameUserChild.appendChild(videoUser);


            let framePcChild = document.querySelector('.framePcChild');
            let videoPC = document.querySelector(`video[data-key="${pcChoise}"][own="pc"]`)
            videoPC.classList.remove('noVideo');
            videoPC.classList.add('videoPlaying');
            framePcChild.appendChild(videoPC);

            if (pcChoise == uChoise) {
                resultsGame.innerText = 'Tie, try again!';

            } else if (pcChoise == 2 && uChoise == 0) {
                resultsGame.innerText = `You Lose! ${electionPC} beats ${electionUser}`
                pcWins += 1;
                games += 1;
            } else if (uChoise == 2 && pcChoise == 0) {
                resultsGame.innerText = `PC Lose! ${electionUser} beat ${electionPC}`;
                userWins += 1;
                games += 1;
            } else if (pcChoise < uChoise) {
                resultsGame.innerText = `Pc win's!  ${electionPC} beat ${electionUser}`;
                pcWins += 1;
                games += 1;
            } else {
                resultsGame.innerText = `User win's! ${electionUser} beat ${electionPC}`;
                userWins += 1;
                games += 1;
            }
        }


        /*select round and score and attchd to them the values*/
        let score = document.querySelector('.score');
        let round = document.querySelector('.round');
        score.textContent = `🤓 User: ${userWins}  🤖 Pc: ${pcWins}`;
        round.textContent = `Round: ${games}`


        setTimeout(remover, 4000);

        function remover() {

            let removeVideoUser = document.querySelector(`video[data-key="${uChoise}"][own="user"]`);
            removeVideoUser.currentTime = 0;
            removeVideoUser.classList.remove('videoPlaying');
            removeVideoUser.classList.add('noVideo');

            let removeVideoPc = document.querySelector(`video[data-key="${pcChoise}"][own="pc"]`)
            removeVideoPc.currentTime = 0;
            removeVideoPc.classList.remove('videoPlaying');
            removeVideoPc.classList.add('noVideo');

            playButton.addEventListener('click', playGame)
            partialResultUser.innerText = "";
            partialResultPc.innerText = " ";
            resultsGame.innerText = "";

            buttons.forEach(bnt => {
                bnt.addEventListener('click', addAttribute)

            });


            if (games == 5) {

                if (pcWins > userWins) {
                    resultsGame.innerText = `PC wins the game \n final score PC: ${pcWins} User: ${userWins}`;
                } else {
                    resultsGame.innerText = `User is the winner \n final score User: ${userWins} PC: ${pcWins}`;
                }

                games = 0;
                pcWins = 0;
                userWins = 0;
            }
        }
    }
}
