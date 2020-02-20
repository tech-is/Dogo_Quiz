'use strict';
{
const question   = document.getElementById('question');
const choices    = document.getElementById('choices');
const btn        = document.getElementById('btn');
const point      = document.getElementById('point');
const scorePoint = document.getElementById('scorePoint');
const word       = document.getElementById('word');
const start      = document.getElementById('start');
const timerLabel = document.getElementById('time');
const replay     = document.getElementById('replay');
const end        = document.getElementById('end');
const quiz = [
	{q: '愛媛の花は？', c: ['みかんの花','リンゴの花','ひまわり','胡蝶蘭']},
	{q: '松山の姉妹都市は？', c: ['サクラメント','上海','ロッテルダム','札幌']},
	{q: '愛媛のタオルで有名な町は？', c: ['今治市','松山市','西条市','宇和島市']},
	{q: '宇和島といえば', c: ['じゃこてん','ところてん','ごぼう天','イモ天']},
	{q: '今、何問目？', c: ['5','11','6','2']},
	{q: '新しい天皇誕生日は？', c: ['2/23','2/25','3/10','12/24']},
];

let num = 0;
let isAnswered;
let score = 0;
let scoreLabel;
const timeLimit = 100 * 1000;
let startTime;
let isStart;
let timeoutId;

// Fisher–Yates shuffle
function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));
	[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function answer(li) {
	if (isAnswered === true) {
	return false;
	}
	isAnswered = true;
	if (li.textContent === quiz[num].c[0]) {
	li.classList.add('correct');
	score++;
	} else {
	li.classList.add('wrong');
	}
	btn.classList.remove('next');
}

function updateTimer () {
	const timeLeft = startTime + timeLimit - Date.now();
	timerLabel.textContent = (timeLeft / 1000).toFixed(2);
	timeoutId = setTimeout(() => {
		updateTimer();
	}, 10);

	if (timeLeft < 0) {
		clearTimeout(timeoutId);
		timerLabel.textContent = '0.00';
		end.style.display = 'block';
	} else if (num >= quiz.length - 1) {
			btn.addEventListener('click', () => {
			clearTimeout(timeoutId);
		});
	}
}

	start1.addEventListener('click', () => {
	start.classList.add('close');
	startTime = Date.now();
	updateTimer();
	});

function setQuiz () {
	isAnswered = false;
	question.textContent = quiz[num].q;
	while (choices.firstChild) {
	choices.removeChild(choices.firstChild);
	}
	const shuffledChoices = shuffle([...quiz[num].c]);
	shuffledChoices.forEach((choice) => {
	const li = document.createElement('li');
	li.textContent = choice;
	li.addEventListener('click',() => {
		answer(li);
	});
	choices.appendChild(li);
	});
}

function scorePointSet() {
	scorePoint.textContent = `あなたの点数は${score}点`;
	if (score === 0) {
	word.textContent = '全問不正解(TT)';
	} else if (score > 0 && score <= 1) {
	word.textContent = 'ぜんぜんダメ(TT)';
	} else if (score > 1 && score <= 2) {
	word.textContent = 'ちょっと頑張ろう！';
	} else if (score > 3 && score <= 4) {
	word.textContent = 'おしい！もう少し頑張ろう';
	} else if (score > 4 && score <= 5) {
	word.textContent = 'すごい高得点(^^)/';
	} else if (score === 6) {
	word.textContent = '全問正解(^^)/';
	}
	point.classList.add('show');
}

setQuiz();

btn.addEventListener('click', () =>{
	if (btn.classList.contains('next')) {
	return false;
	}
	btn.classList.add('next');
	if (num === quiz.length - 1) {
	// stopTimer();
	scorePointSet();
	} else {
	num++;
	setQuiz();
	}
});
}

// filterは、任意の条件に合致する配列要素だけを抽出して新しい配列データを作成することができます
// mapはforEachとよく似ていますが、最終的に新しい配列として生成してくれる点が大きく異なります。
