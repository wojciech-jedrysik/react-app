import React, {Component} from "react";

export default class Sessions extends React.Component {

    state = {
        isLoaded: false,
        amountOfObjects: 0,
    }

    componentDidMount(){
        fetch('https://ie2020.kisim.eu.org/api/sessions')
            .then(res=>res.json())
            .then(json=> {
                this.setState({
                    isLoaded: true,
                    session: Object.values(json),
                })

            })


    }

    render(){

        var {isLoaded, session} = this.state;

        if(!isLoaded){
            return <div>Loading </div>;
        }

        else{
            return(
                <div className ="App">
                <ul>
                {session.map((sess,index)=> (
                        <li key = {index}>
                    {console.log(sess)}
                    Name: {sess.name} | Localization: {sess.localization} |
        </li>
        ))};
        </ul>

            </div>
        );
        }
    }
}