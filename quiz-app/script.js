const quizData = [
    {
        question: 'How old is Wetas?',
        a: '20',
        b: '25',
        c: '40',
        d: '50',
        correct: 'b'
    },
    {
        question: 'What is th most used programming language in 2019?',
        a: 'Java',
        b: 'C',
        c: 'Python',
        d: 'JavaScript',
        correct: 'a'
    },
    {
        question: 'Who is the President of US?',
        a: 'Florin Pop',
        b: 'Donald Trump',
        c: 'Joe biden',
        d: 'Ivan Saldano',
        correct: 'c'
    },
    {
        question: 'What does HTML stand for?',
        a: 'Hypertext Markup Language',
        b: 'Helicopters Terminal Motorboats Lamborginis',
        c: 'Json Object Notation',
        d: 'Application Programming Interface',
        correct: 'a'
    },
    {
        question: 'What year was JavaScript launched?',
        a: '2020',
        b: '2021',
        c: '2019',
        d: 'none of the above',
        correct: 'd'
    }
];

const questionElement = document.getElementById('question');
const quiz = document.getElementById('quiz');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
let answer = undefined;

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    // deselect the answer after the load of the quiz
    deselectAnswer();

    const currentQuizData = quizData[currentQuiz];
    questionElement.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;

    console.log(getSelectedAnswer());
}

submitBtn.addEventListener('click', () => {
    // get score: 10 if answer is correct
    getScore(getSelectedAnswer());

    // test if answer selected, if so increment the index to next question, else we load the same question
    if (getSelectedAnswer() !== undefined) {
        currentQuiz++;
        //test if current answer index in the array, if so we load the next question, else quiz finished
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            // TODO: Show results

            quiz.innerHTML =
                '<h1>Congrats! You have finished!\n Your Score is: ' +
                score +
                '/' +
                quizData.length * 10 +
                '</h1> <button onclick="location.reload()">New Quiz</button>';
        }
    } else {
        loadQuiz();
    }
});

// loop the radios input, and return the id of the checked one
function getSelectedAnswer() {
    var radios = document.getElementsByTagName('input');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            // get id
            return radios[i].id;
        }
    }
}

//test if checked answer equals to the correct one, if so we increment the score by 10
function getScore(answer) {
    if (answer === quizData[currentQuiz].correct) {
        score = score + 10;
        console.log('score: ' + score);
        return score;
    }
}

// deselect the answer after the load of the quiz
function deselectAnswer() {
    var radios = document.getElementsByTagName('input');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }
}
