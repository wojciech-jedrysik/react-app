import React, {Component} from "react";

export default class MyReminders extends React.Component {

    state = {
        isLoaded: false,
        amountOfObjects: 0,
    }

    componentDidMount(){
        fetch('https://ie2020.kisim.eu.org/api/reminders')
            .then(res=>res.json())
            .then(json=> {
                this.setState({
                    isLoaded: true,
                    reminder: Object.values(json),
                })

            })


    }

    render(){

        var {isLoaded, reminder} = this.state;

        if(!isLoaded){
            return <div>Loading </div>;
        }

        else{
            return(
                <div className ="App">
                <ul>
                {reminder.map((rem)=> (
                        <li key = {rem.id}>
                    {console.log(rem)}
                    ID: {rem.id} | PresentationID: {rem.presentationID} | Enabled: {rem.enabled} | UpdatedAt: {rem.updatedAt}
        </li>
        ))};
        </ul>

            </div>
        );
        }
    }
}
