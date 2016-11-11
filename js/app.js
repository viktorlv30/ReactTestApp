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
        this.setState( prevState => ({
            visible: !prevState.visible
        }));
    };

    render() {
        var author = this.props.data.author;
        var text = this.props.data.text;
        var bigText = this.props.data.bigText;
        var visible = this.state.visible;

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
            newsTemplate = <p> К сожалению новостей нет</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong className={data.length > 0 ? '' : 'none'}>Всего новостей: {data.length}</strong>
            </div>
        );
    }
};

News.propTypes = {
    data: React.PropTypes.array.isRequired
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
                <News data={myNews}/> {/*добавили свойство data*/}
                {/*<Comments data={myNews}/>*/}
            </div>
        );
    }
};


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);