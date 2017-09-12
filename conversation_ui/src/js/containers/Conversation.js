/**
* Conversation UI
*/

import React, { Component } from 'react';
import autoBind from 'auto-bind';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

import Container from '../primitives/Container';
import UserInput from '../primitives/UserInput';
import Message from '../components/Message';
import MessageArea from '../primitives/MessageArea';
import Loading from '../components/Loading';
import SubmitButton from '../primitives/SubmitButton';


class Conversation extends Component {
  
  
  //App.jsからpropsを取ってきて、初期データの作成
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      questions: props.questions.map(question => {
        return {
          ...question, //スプレッド演算子
          sender: 'BOT',
        };
      }),
      questionNumber: 0,
      userInput: '',
      disableUserInput: false, //入力させない。
      messages: [],
      answers: {},
      loadingBot: false, //これは何か？
    };
  }

//コンポーネントがページに追加される直前に呼びだされる
//この中でsetStateするとrender時にまとめて行われる。
//ここの場合は、messagesにquestions配列の中身を入れている
  componentWillMount() {
    const { questions, questionNumber } = this.state;
    this.setState({
      ...this.state,
      messages: [
        questions[questionNumber],
      ]
    });
  }

// 描画が成功して、DOMにアクセス可能になる
  componentDidMount() {
    this.userInput.focus();
  }

//renderの中で呼び出されてる。
  handleUserInput(e) {
    e.preventDefault(); //親要素へのバブリング（伝達）を保ちながら、aタグのリンク機能を無効化する。
    this.setState({
      userInput: e.target.value,
    });
  }

  handleButtonSelect(select) {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          text: select.text, //不明
          type: 'USER'
        }
      ],
      answers: this.state.questions[this.state.questionNumber].key ? {
        ...this.state.answers,
        [this.state.questions[this.state.questionNumber].key]: select.value,
      } : {
        ...this.state.answers,
      },
    }, () => {
      this.nextQuestion();
    });
  }
  
  //
  finalMessage() {
    return {
      text: 'Thank you!',
      type: 'final',
      sender: 'BOT',
    };
  }

  nextQuestion() {
      //stateを直接変更してはだめ。this.setState経由で状態を変更する
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      loadingBot: true,
    }, () => {
        //questionsはAppコンポーネントで数が決まっているので、questionNumberの数がquestionsの配列より小さければ
      if (this.state.questionNumber < this.state.questions.length) {
        // setTimeout…一定時間後に特定の処理をおこなう（繰り返さずに一度だけ）
        setTimeout(() => {
          this.setState({
            messages: [
              ...this.state.messages,
              this.state.questions[this.state.questionNumber],
            ],
            loadingBot: false,
          });

          //ここに処理がよくわからない
          if (this.state.questions[this.state.questionNumber].buttons) {
            this.setState({
              disableUserInput: true
            });
          } else {
            this.setState({
              disableUserInput: false
            });
            this.userInput.focus();
          }
        }, 500);
      } else {
        setTimeout(() => {
          this.setState({
            messages: [
              ...this.state.messages,
              this.finalMessage(),
            ],
            loadingBot: false,
            disableUserInput: true,
          });
          this.props.onEnded(this.state.answers);
        }, 500);
      }
    });
  }

//ユーザの打ち込みが可能であるならば
  submitUserInput(e) {
    e.preventDefault();
    if (this.state.userInput.length > 0) {  //何かがうち込まれているのであれば
      this.setState({
        messages: [
          ...this.state.messages,
          {
            text: this.state.userInput,
            type: 'USER'
          }
        ],
        answers: this.state.questions[this.state.questionNumber].key ? {
          ...this.state.answers,
          [this.state.questions[this.state.questionNumber].key]: this.state.userInput,
        } : {
          ...this.state.answers,
        },
        userInput: '',
      }, () => {
        this.nextQuestion();
      });
    }
  }

  render() {
    const { messages, userInput, answers, disableUserInput } = this.state;

    return (
      <ThemeProvider theme={this.props.theme || theme}>
        <Container>
          <MessageArea
            innerRef={div => this.messageArea = div }
          >
          {messages.map((message, index) =>
            <Message
              key={index}
              message={message}
              answers={answers}
              onButtonSelect={this.handleButtonSelect}
              active={messages.length === index + 1}
            />
          )}
          {this.state.loadingBot && <Loading bot/>}
          {this.state.userInput.length > 0 && <Loading user/>}
          </MessageArea>
          
          <form onSubmit={e => this.submitUserInput(e)}>
          
            <UserInput
              type="text"
              value={userInput}
              innerRef={input => this.userInput = input }
              onChange={e => this.handleUserInput(e)}
              disabled={disableUserInput}
            />
            <SubmitButton>↩</SubmitButton>
          </form>
        </Container>
      </ThemeProvider>
    );
  }
}

export default Conversation;