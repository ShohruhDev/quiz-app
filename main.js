const questions = [{
        question: "Какой язык работает в браузере?",
        answers: ["Java", "C", "Python", "JavaScript"],
        correct: 4,
    },
    {
        question: "Что означает CSS?",
        answers: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats",
        ],
        correct: 2,
    },
    {
        question: "Что означает HTML?",
        answers: [
            "Hypertext Markup Language",
            "Hypertext Markdown Language",
            "Hyperloop Machine Language",
            "Helicopters Terminals Motorboats Lamborginis",
        ],
        correct: 1,
    },
    {
        question: "В каком году был создан JavaScript?",
        answers: ["1996", "1995", "1994", "все ответы неверные"],
        correct: 2,
    },
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;


clearPage();
showQuestion()
checkAnswer();
submitBtn.onclick = checkAnswer

function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';

}

function showQuestion() {

    questions[questionIndex]['question'];
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

    headerContainer.innerHTML = title;
    let answerNumber = 1;

    for (answerText of questions[questionIndex]['answers']) {

        const questionTemplate = `
			   
				<li>
				<label>
					<input value = "%number%"type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`

        const answerHtml = questionTemplate
            .replace('%answer%', answerText).replace('%number%', answerNumber);

        listContainer.innerHTML += answerHtml;
        answerNumber++;
    }


}

function checkAnswer() {
    const checkedRadio = listContainer.querySelector('input[type = "radio"]:checked');
    if (!checkedRadio) {
        submitBtn.blur();
        return;
    }

    const userAnswer = parseInt(checkedRadio.value);

    if (userAnswer === questions[questionIndex]['correct']) {
        score++;
    }
    if (questionIndex !== questions.length - 1) {
        questionIndex++
        clearPage();
        showQuestion();
        return;
    } else {
        clearPage();
        showResults()
    }
}

function showResults() {

    const resultsTemplate = `
	<h2 class="title">%title%</h2>
	<h3 class="summary">%message%</h3>
	<p class="result">%result%</p>
	`;
    let title, message;
    if (score === questions.length) {
        title = 'Поздравляем 🥇 '
        message = 'Вы ответили верно на все вопросы🥳'
    } else if (score * 100 / questions.length >= 50) {
        title = 'Неплохой результат😎  '
        message = 'Вы дали более половины правильных ответов🤏'
    } else {
        title = 'Стоит постараться😩👌'
        message = 'Пока у вас меньше половины правильных ответов😨'

    }

    let result = `${score} из ${questions.length}`;

    const finalMessage = resultsTemplate
        .replace('%title%', title)
        .replace('%message%', message)
        .replace('%result%', result)
    headerContainer.innerHTML = finalMessage;

    submitBtn.blur();
    submitBtn.innerHTML = 'Начать заново';
    submitBtn.onclick = () => {
        history.go()
    }

}