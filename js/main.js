'use strict';
{
	// 定数のセット
	const question       = document.getElementById('question');
	const choices        = document.getElementById('choices');
	const btn            = document.getElementById('btn');
	const point          = document.getElementById('point');
	const scorePoint     = document.getElementById('scorePoint');
	const word           = document.getElementById('word');
	const start          = document.getElementById('start');
	const start_tow      = document.getElementById('start_tow');
	const timerLabel     = document.getElementById('time');
	const end            = document.getElementById('end');
	const prize          = document.getElementById('prize');
	const img            = document.getElementById('img');
	const quiz = [
		{q: '愛媛の花は？', c: ['みかんの花','リンゴの花','ひまわり','胡蝶蘭']},
		{q: '松山の姉妹都市は？', c: ['サクラメント','ニューヨーク','ロッテルダム','札幌']},
		{q: '愛媛のタオルで有名な町は？', c: ['今治市','松山市','西条市','宇和島市']},
		{q: '宇和島といえば', c: ['じゃこてん','ところてん','ごぼう天','イモ天']},
		{q: '松山城を作った人は？', c: ['加藤嘉明','松平定信','豊臣秀吉','明智光秀']},
		{q: '久万高原町の道の駅の名前は？', c: ['天空の郷さんさん','天空の郷らんらん','天空の郷きんきん','天空の城ラピュタ']},
	];
	
	// 変数のセット
	let num = 0;
	let isAnswered;
	let score = 0;
	const timeLimit = 100 * 1000;
	let startTime;
	let timeoutId;
	
	// Fisher–Yates shuffleのアルゴリズムを改良したダステンフェルドの手法
	function shuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			//配列の一番最後の値とランダムに選ばれた値を入れ替える
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	// 問題の解答に関する関数
	function answer(li) {
		if (isAnswered === true) {
			return false;
		}
		isAnswered = true;

		//選択した答えが配列の0番目の時正解の処理
		if (li.textContent === quiz[num].c[0]) {
			li.classList.add('correct');
			score++;
		} else {
			li.classList.add('wrong');
		}
		btn.classList.remove('next');
	}

	//制限時間を処理する関数
	function updateTimer () {
		const timeLeft         = (startTime + timeLimit) - Date.now();
		timerLabel.textContent = (timeLeft / 1000).toFixed(2);
		
		//updateTimer関数を10ミリ秒後に処理するのを繰り返す
		timeoutId = setTimeout(() => {
			updateTimer();
		}, 10);

		// タイマーを止める処理
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

	//クイズの問題をセットする処理
	function setQuiz () {
		isAnswered = false;
		question.textContent = quiz[num].q;

		// 前の問題を削除
		while (choices.firstChild) {
			choices.removeChild(choices.firstChild);
		}
		
		//元の配列を新たな配列に渡すことで、元の配列を変更しないようにする
		const shuffledChoices = shuffle([...quiz[num].c]);

		shuffledChoices.forEach((choice) => {
			const li = document.createElement('li');
			li.textContent = choice;
			li.addEventListener('click',() => {
				//問題の解答をする関数
				answer(li);
			});
			choices.appendChild(li);
		});
	}

	//クイズの点数に関する関数
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
			prize.classList.remove('remove');
		}
		point.classList.add('show');
	}

	//クリックスタートを押した時にクイズスタート
	start_tow.addEventListener('click', () => {
		start.classList.add('close');
		startTime = Date.now();
		updateTimer();
	});

	// クイズの問題をセットする関数
	setQuiz();

	//次の問題進む処理
	btn.addEventListener('click', () =>{

		//解答をしてない場合次に進めない
		if (btn.classList.contains('next')) {
			return false;
		}
		btn.classList.add('next');

		//問題をすべて解答した場合に点数表示
		if (num === quiz.length - 1) {
			scorePointSet();
		} else {
			num++;
			setQuiz();
		}
	});
}
