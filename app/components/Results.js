import React from 'react';
import queryStirng from 'query-string';
import api from '../utils/api';

class Results extends React.Component {
    componentDidMount () {
        let players = queryStirng.parse(this.props.location.search);
        api.battle([
            players.palyerOneName,
            players.playerTwoName
        ]).then((results) => {
            console.log(results);
        });
    }
    render() {
        return (
            <div>
                Results
            </div>
        )
    }
}

export default Results;
