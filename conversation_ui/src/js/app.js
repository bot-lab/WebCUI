import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

//ActionCreator部分。そして返される関数をActionという
const myActionCreator = (num=1) => {
    return {
        type: "INC_COUNTER",  //Actionは必ずtypeという名のプロパティを持たなければならない
        num
    };
};

//Actionを、Reducerに渡すことで、stateを変更することが出来る。
//Reducerは関数であり、実行する際は必ず、現在のstateと先程のactionを引数として受け取る。
const myReducer = (state={counter:0}, action) => {
    switch(action.type){
        case 'INC_COUNTER':
            return Object.assign({}, state, {
                counter: state.counter + action.num
            });
        default:
            return state;
    }
};


//Storeを作る
const myStore = createStore(myReducer);


// この時点で、Reduxを構成するActionCreator、Reducer、Storeが全て準備できている。
// 動作確認-----------------

// myStore.subscribe(()=>{
//     console.log('stateが変更されました。');
//     console.log(myStore.getState());
// });
// myStore.dispatch(myActionCreator(1));
// myStore.dispatch(myActionCreator(2));
// console.log(myStore.getState());

// -------------------------


class App extends React.Component{
    render(){
        return (
            <div>
                <p>現在の数値：{this.props.counter}</p> 
                <button onClick={ ()=>{ this.props.incCounter(1)} }>加算</button>
            </div>
        );
    };
};



const mapStateToProps = state => {  //このstateはStoreのstateになるのか？
  return { counter: state.counter };   //{コンポーネントに渡されるprops : Storeのstateの値}
};

//受け取る引数がstateではなくdispatchであるということ。
const mapDispatchToProps = dispatch => {
  console.log('test');
  return {
    incCounter(value) {
      dispatch(myActionCreator(value));
    }
  };
};

//  const 変換後のコンポーネント = connect(
//      Storeとpropsの接続を行う関数
//  ) (変換前のコンポーネント);
const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
//connect()の第一引数の関数にはstateが、第二引数の関数にはdispatchが渡される。


//if(typeof window !== 'undefined') {
ReactDOM.render(
<Provider store={myStore}><ConnectedApp /></Provider>,
document.getElementById('mount')
);
//}