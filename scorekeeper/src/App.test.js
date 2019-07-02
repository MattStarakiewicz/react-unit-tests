import PlayersList from './components/PlayersList';
import AddPlayer from './components/AddPlayer/AddPlayer';
import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

it('renders without crashing', () => {
    shallow(<App/>);
});

it('matches snapshot', () => { // npm test -u
    const appComponent = shallow(<App/>);

    expect(appComponent).toMatchSnapshot();
});

it('should update player score', () => {
    const appComponent = shallow(<App/>);
    const players = [
        {
            name: 'Kunegunda',
            score: 0
        }
    ]

    appComponent.setState({players});
    const onScoreUpdate = appComponent.find(PlayersList).prop('onScoreUpdate');

    onScoreUpdate(0, 5);
    const playersAfterUpdate = appComponent.state().players;


    expect(playersAfterUpdate[0].score).toEqual(5);

});

it('Add new Player', () => {
    const appComponent = shallow(<App/>);

    const onPlayerAdd = appComponent.find(AddPlayer).prop('onPlayerAdd');
    onPlayerAdd('Ania');

    const players = appComponent.state('players');

    expect(players.length).toEqual(1);
    expect(players[0].name).toEqual('Ania');
    expect(players[0].score).toEqual(0);
});

it('Remove a Player', () => {
    const appComponent = shallow(<App/>,);
    appComponent.setState({
        players: [
            {
                name: 'Ania',
                score: 0
            },
            {
                name: 'Marek',
                score: 0
            }
        ]
    })

    const onPlayerRemove = appComponent.find(PlayersList).prop('onPlayerRemove');
    const ania = appComponent.state('players')[0];
    onPlayerRemove(ania);

    const players = appComponent.state('players');

    expect(players.length).toEqual(1);
    expect(players[0].name).toEqual('Marek');
    expect(players[0].score).toEqual(0);
});

it('Updates score', () => {
    const appComponent = shallow(<App/>,);
    appComponent.setState({
        players: [
            {
                name: 'Ania',
                score: 0
            }
        ]
    })

    const onScoreUpdate = appComponent.find(PlayersList).prop('onScoreUpdate');
    onScoreUpdate(0, 1)

    const players = appComponent.state('players');

    expect(players.length).toEqual(1);
    expect(players[0].name).toEqual('Ania');
    expect(players[0].score).toEqual(1);
});

