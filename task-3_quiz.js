"use strict"

// Невеличка документація. Об'єкт config демонструє структуру об'єкту з опитуванням. Він обов'язково має містити властивість з ключем "start", в який ми вписуємо перше питапння.
// Іншими ключами цього об'єкту є питання опитування. Значенням такого ключа є масив відповідей
// Елементом цього масиву є об'єкт з двома властивостями. answer: варіант відповіді на питання, та next: наступне питання, яке буде продемонстровано, якщо обрана поточна відповідь
// Якщо відповідь на питання завершує опитування, властивість з ключем next має містити дані, які при приведенні до логічного типу повертають false
// Для запуску скрипту тестування передайте функції testing об'єкт заданої конфігурації у JSON-форматі. (Далі по коду буде демонстративний виклик, результат у консолі)

let config = {
	"start": "q1",
	"q1": [{answer: "text",
			next: "q2" },
			{answer: "text2",
			next: "q2" },
			{answer: "text3",
			next: "q3" },],
	"q2": [{answer: "text",
			next: "q4" },
			{answer: "text2",
			next: "q5" },],
	"q3": [{answer: "text",
			next: false },
			{answer: "text2",
			next: false },
			{answer: "text3",
			next: false },],
	"q4": [{answer: "text",
			next: false },
			{answer: "text3",
			next: "q6" },],
	"q5": [{answer: "text",
			next: false },
			{answer: "text2",
			next: false },],
	"q6": [{answer: "text",
			next: false },
			{answer: "text3",
			next: false },],
};

let config_json = JSON.stringify(config);


function testing (quiz) {
	const quiz_obj = JSON.parse(quiz);
	let list = [];
	let result = {
		paths: {},
	};
	
	script(quiz_obj, quiz_obj["start"], []);

	result.paths.number = list.length;
	result.paths.list = list;

	let result_json = JSON.stringify(result);
	console.log(result_json);

	// Або об'єктом, якщо так зручніше:
	// console.log(result);
	
	function script(quiz, question, current_path) {
		let next_question = false;

		for (let i=0; i < quiz[question].length; i++) {
			if (quiz[question][i]["next"]) {
				next_question = true;
			}
		}

		if (next_question) {
			for (let i=0; i < quiz[question].length; i++) {
				let path = current_path.slice();
				let pair_q_and_a = {};
				if (quiz[question][i]["next"]) {
					pair_q_and_a[question] = quiz[question][i]["answer"];

					path.push(pair_q_and_a);

					script(quiz_obj, quiz[question][i]["next"], path);
				} 
				else {
					pair_q_and_a[question] = quiz[question][i]["answer"];
					path.push(pair_q_and_a);
					list.push(path);
				}
			}
		} 
		
		else {
			let path = current_path.slice();
			let pair_q_and_a = {};
			let answers = "";
			for (let i=0; i < quiz[question].length; i++) {
				answers += quiz[question][i]["answer"] + "/";
			}
			answers = answers.slice(0, -1);

			pair_q_and_a[question] = answers;
			path.push(pair_q_and_a);
			list.push(path);
		}
	}
}

// Демонстраційне опитування

let quiz_vaccination = {
	"start": "Чи вакцинувались ви від COVID-19?",
	"Чи вакцинувались ви від COVID-19?": [{
		answer: "Так",
		next: "Якою вакциною ви вакцинувались?"
	},
	{
		answer: "Ні, але планую найближчим часом",
		next: "Який ваш основний мотив для вакцинації?"
	},
	{
		answer: "Ні, мені не можна",
		next: "Ви дотримуєтесь умов самоізоляції, соціальної дистанції, маскового режиму для захисту себе та оточуючих?"
	},
	{
		answer: "Ні, не хочу",
		next: "Ви дотримуєтесь умов самоізоляції, соціальної дистанції, маскового режиму для захисту себе та оточуючих?"
	},],
	"Якою вакциною ви вакцинувались?": [{
		answer: "Pfizer",
		next: "Чи отримали ви сертифікат про вакцинацію?"
	},
	{
		answer: "Moderna",
		next: "Чи отримали ви сертифікат про вакцинацію?"
	},
	{
		answer: "Coronavac",
		next: "Чи отримали ви сертифікат про вакцинацію?"
	},
	{
		answer: "Astrazeneca",
		next: "Чи отримали ви сертифікат про вакцинацію?"
	},
	{
		answer: "Інша вакцина",
		next: "Чи отримали ви сертифікат про вакцинацію?"
	},],
	"Чи отримали ви сертифікат про вакцинацію?": [{
		answer: "Так",
		next: "У якому вигляді ви отримали сертифікат?"
	},
	{
		answer: "Ні",
		next: false
	},],
	"У якому вигляді ви отримали сертифікат?": [{
		answer: "Підтягнувся у застосунку 'Дія'",
		next: false
	},
	{
		answer: "Отримав в паперовому вигляді у лікаря",
		next: false
	},],
	"Який ваш основний мотив для вакцинації?": [{
		answer: "Потрібен covid-сертифікат для відвідування закладів та організацій в межах України",
		next: false
	},
	{
		answer: "Планую їхати за кордон",
		next: false
	},
	{
		answer: "Застерегтися від можливих наслідків хвороби, зміцнити імунітет",
		next: false
	},
	{
		answer: "Погрожують звільнити з роботи, якщо не вакцинуюсь",
		next: false
	},
	{
		answer: "Люди з мого оточення переважно вакциновані, чим я гірше?",
		next: false
	},],
	"Ви дотримуєтесь умов самоізоляції, соціальної дистанції, маскового режиму для захисту себе та оточуючих?": [{
		answer: "Так, звісно",
		next: false
	},
	{
		answer: "Намагаюсь",
		next: false
	},
	{
		answer: "Ні",
		next: false
	},],
};

let quiz_vaccination_json = JSON.stringify(quiz_vaccination);

// Запуск скрипту тестування з конфігом та демонстраційним опитуванням
testing(config_json);
testing(quiz_vaccination_json);

// Далі орієнтовна демонстрація як це буде працювати для користувача. Код зараз не спрацює, тому що зараз ми не отримуємо відповідь від користувача.

function quiz_launch (quiz) {
	let quiz_obj = JSON.parse(quiz);
	let first_question = quiz_obj["start"];

	choose_answer(quiz_obj, first_question);
}

function choose_answer (quiz, question) {
	// some code. Передаємо наше питання і наші варіанти відповідей користувачу.

	//  питання: question
	// відповіді: for (let i=0; i < quiz[question].length; i++) {quiz[question][i][answer]}

	let answer;
	// отримуємо відповідь користувача у змінну. Для зручності демонстрації буду отримувати одразу об'єкт, який містить відповідь і next.

	next_question(quiz, answer);
}

function next_question (quiz, current_answer) {
	if (current_answer["next"]) {
		let question = current_answer["next"];

		choose_answer(quiz, question);
	}
	// else: тут буде код, який буде виконуватись після закінчення опитування (подяка за опитування, показ результату тощо)
}