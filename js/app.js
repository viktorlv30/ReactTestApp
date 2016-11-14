// import React from 'js/react-0.14.7/build/react.js';
// import ReactDOM from 'react-dom';

// import React from 'react';
// import ReactDOM from 'react-dom';

console.log(React);
console.log(ReactDOM);
// var classNames = require('classnames');

var myNews = [
    {
        author: "Olexandr Pechkin",
        text: "On Thirsday in fourth day....",
        bigText: "в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж."
    },
    {
        author: "Viktor Gogle ",
        text: "I think that dollar must be 20 UAH!",
        bigText: "and EUR about 25 UAH"
    },
    {
        author: "Guest",
        text: "Free. Download. Best site http://localhost:3001",
        bigText: "На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение"
    }
];



class Article extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: false,
        };
        this.readMoreClick = this.readMoreClick.bind(this);

    };

    readMoreClick(){
        // e.preventDefault();
        this.setState( prevState => ({ visible: !prevState.visible }));
    };

    render() {
        var author = this.props.data.author;
        var text = this.props.data.text;
        var bigText = this.props.data.bigText;
        var visible = this.state.visible;

        console.log("render", this);

        return (
            <div className="article">
                <p className="news_author">{author}:</p>
                <p className="news_text">{text}</p>

                <a href="#" onClick={this.readMoreClick} >Подробнее</a>
                <p className={"news_bigtext " + (visible ? "" : "none" )}>{bigText}</p>
            </div>
        );
    };
};

Article.propTypes = {
    data: React.PropTypes.shape({
        author: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        bigText: React.PropTypes.string.isRequired
    })
};


class News extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            counter: 0
        };

        this.onTotalNewsClick = this.onTotalNewsClick.bind(this);

    };

    onTotalNewsClick() {
        this.setState({
            counter: this.state.counter++
        });
    };

    render() {
        var data = this.props.data;
        var newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function (item, index) {
                return (
                    <div key={index}>
                        <Article data={item}/>
                    </div>
                )
            });
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong
                    className={"newsCount " +(data.length > 0 ? '' : 'none')}
                    onClick={this.onTotalNewsClick}>
                    Всего новостей: {data.length}
                </strong>
            </div>
        );
    }
};

News.propTypes = {
    data: React.PropTypes.array.isRequired
};


class AddNews extends React.Component{

    constructor(props, context){
        super(props, context);
        this.state = {
            btnIsDisabled: true,

            agreeNotChecked: true,
            authorNotChecked: true,
            textIsEmpty: true
        };

        // this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onBtnClickHandler = this.onBtnClickHandler.bind(this);
        this.onCheckRuleClick = this.onCheckRuleClick.bind(this);
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);

    };

    onAuthorChange(e){
        if(e.target.value.trim().length > 0 ) {
            this.setState({
                authorIsEmpty: false
            })
        } else {
            this.setState({
                authorIsEmpty: true
            })
        }
    };

    onTextChange(e){
        if(e.target.value.trim().length > 0 ) {
            this.setState({
                textIsEmpty: false
            })
        } else {
            this.setState({
                textIsEmpty: true
            })
        }
    };



    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.author).focus();
    };

    // onChangeHandler(e){
    //     this.setState({
    //         myValue: e.target.value
    //     })
    // };

    onCheckRuleClick(e){
        this.setState({
            btnIsDisabled: !this.state.btnIsDisabled
        });
    }

    onBtnClickHandler(e){
        // console.log(this.refs);
        // alert(ReactDOM.findDOMNode(this.refs.text).value)
        e.preventDefault();

        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = ReactDOM.findDOMNode(this.refs.text).value;
        alert(author + "\n" + text);
    };

    render(){
        return(
            <form className="add cf">
                <input type="text"
                       className="addAuthor"
                       defaultValue={""}
                       placeholder="Ваше имя"
                       ref="author" />
                <textarea className="addText"
                          defaultValue=""
                          placeholder="Текст новости"
                          ref="text" >
                </textarea>
                <label className="addCheckRule">
                    <input type="checkbox" defaultChecked={false} ref="checkRule" onChange={this.onCheckRuleClick}/> Я согласен с правилами
                </label>
                <button className="addButton"
                        onClick={this.onBtnClickHandler}
                        ref="alertButton"
                        disabled={this.state.btnIsDisabled} >
                    Показать alert
                </button>
            </form>
        );
    };
};


// class Comments extends React.Component {
//     render() {
//         // var commentClasses = classNames({
//         //     "comments": true,
//         //     "none": this.props.data.length == 0
//         // });
//         var length = this.props.data.length;
//         var commentClasses = '';
//         if(length > 0) {
//             commentClasses += "none";
//         } else {
//             commentClasses += "comments";
//         }
//         return (
//             <div className={commentClasses}>
//                 Нет новостей - комментировать нечего
//             </div>
//         );
//     };
// };


class App extends React.Component{
    render () {
        return(
            <div className="app">
                <h3>Новости</h3>
                <AddNews />
                <News data={myNews} /> {/*добавили свойство data*/}
                {/*<Comments data={myNews}/>*/}
            </div>
        );
    }
};


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);