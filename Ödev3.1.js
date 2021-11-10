import React from "react";
import  ReactDOM from "react-dom";
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/card.js',
    output: {
        filename: "Rea.js",
        path: path.resolve(__dirname,'public'),
        libraryTarget: "var",
        library: "Fil"
    },
    devServer: {
        contentBase: './public',
        injectClient:false
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })]
    }
}
class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            firstCard: Math.floor(Math.random()*3),
            durum: undefined,
            card: ["image/mavi.pnp","image/mavi.pnp","image/mavi.pnp"],
            Counter: 0,
            endGame: false
        }
    }


    kediSec = (index) => {
        const { card, firstCard, Counter, endGame } = this.state;

        if(!endGame){
        const newCard = [...card];
        let status;

        if(firstCard===index){
            newCard[index] = "image/fil.pnp";
            status = "Kazandınız.. :)"
        }else {
            newCard[index] = "image/ayı.pnp";
            if(Counter===1){
                status = "Kaybettiniz.. :("
            }
        }
        this.setState({
            card:newCard,
            Counter: this.state.Counter+1,
            status
        });

        if(status){
            this.setState({
                endGame: true
            })
        }

        }
    }

    newGame = () => {
        this.setState({
            firstCard: Math.floor(Math.random()*3),
            status: undefined,
            card: ["image/back.jfif","image/mavi.pnp","image/mavi.pnp"],
            Counter: 0,
            endGame: false
        })
    }

    render(){
        const { card, status } = this.state;
        return (
<div>
    <p>Kapalı kartlar arasından Fili bulana hak tanınacaktır..</p>
    <img className="card" src={card[0]} onClick={()=>{this.selectedCard(0)}}/>
    <img className="card" src={card[1]} onClick={()=>{this.selectedCard(1)}}/>
    <img className="card" src={card[2]} onClick={()=>{this.selectedCard(2)}}/>
    <div className="message">
        <p>{status?status:"Fili bulmak için kartların üstüne tıklayın."}</p>
        {status && <p>
            Yeni bir oyun açınız <span onClick={this.newGame} className='link'>buraya</span> tıklayabilirsin.
        </p>}
    </div>
</div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));