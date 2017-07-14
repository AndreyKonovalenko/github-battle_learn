import React from 'react';
import PropTypes from 'prop-types';
import queryStirng from 'query-string';
import {Link} from 'react-router-dom';
import api from '../utils/api';

const Player = (props) => {
    return (
        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
        </div>
    )
}
Player.PropTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired
}


class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount () {
        let players = queryStirng.parse(this.props.location.search);
        console.log(players);
        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then((results) => {
            if (results === null) {
                return this.setState(() => {
                    return {
                        error: 'Looks like there was an error. Check that both user exist on GitHub.',
                        loading: false
                    }
                });
            }
            this.setState(() => {
                return {
                    error: null,
                    winner: results[0],
                    loser: results[1],
                    loading: null
                }
            });
        });
    }
    render() {
        let error = this.state.error;
        let winner = this.state.winner;
        let loser = this.state.loser;
        let loading = this.state.loading;
        console.log(loading);
        if (loading === true) {
            return (
                <div>
                    <p>
                        loading!
                    </p>
                </div>
            )
        }
        if (error) {
            return (
                <div>
                    <p> {error} </p>
                    <Link to='/battle'> Reset </Link>
                </div>
            )
        }
        return (
            <div className='row'>
                <Player
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}

export default Results;
