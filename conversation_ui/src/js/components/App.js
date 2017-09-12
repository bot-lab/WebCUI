import React from 'react';
import Conversation from '../containers/Conversation';

//テーマのcss
const theme = {
  blobColor: 'cyan',
  userBlobColor: 'gray',
  user: '👀',
  bot: '😾',
  baseColor: '#ccc',
  font: "'courier', monotype",
  height: '500px',
  width: '500px',
};

//質問の配列
//テキストとそのキー。ボタンも格納しておく
const questions = [{
	text: 'Hello!',
  }, {
	text: 'What is your first name?',
	key: 'firstName',
  }, {
	text: 'How are you?',
	key: 'emotion',
	buttons: [{
	  text: 'Awesome!',
	  value: 'great',
	}, {
	  text: 'Good',
	  value: 'good',
	}, {
	  text: 'Could be better',
	  value: 'medium',
	}, {
	  text: 'Not so good...',
	  value: 'bad',
	}]
  }, {
	text: 'Do you like this image?',
	key: 'imageLike',
	image: 'https://unsplash.it/400/300/?random', //ランダムに画像を選出
	buttons: [{
	  text: 'Yes, looks great!',
	  value: 'yes',
	}, {
	  text: 'No really...',
	  value: 'no',
	}]
}];


const App = (props) => {
  function getUserAnswers(answers) {
	console.log('answers', answers);
  }
 //<Conversation>の中身はpropsとして渡される
  return (
	<main>
	  <Conversation
		questions={questions}
		onEnded={getUserAnswers}
		theme={theme}
	  />
	</main>
  );
}

export default App; //Appクラスがimportされるときにdefaultで呼ばれるってこと