import PlayersList from './PlayersList';
import Player from './Player';
import React from 'react';
import {mount, shallow} from 'enzyme';

it('renders without crashing', () => {
    shallow(<PlayersList players={[]}/>);
});

it('matches snapshot', () => {
    const component = shallow(<PlayersList players={[]}/>);

    expect(component).toMatchSnapshot();
});

it('renders correct number of players', () => {
    const players = [
        {
            name: 'Kunegunda',
            score: 5
        },
        {
            name: 'Antoś',
            score: 0
        }
    ]

    const playerComponent = shallow(<PlayersList players={players}/>);
    const expectedPlayersNumber = playerComponent.find(Player).length;
    expect(expectedPlayersNumber).toEqual(2);
});

it('renders players in correct order', () => {
    const players = [
        {
            name: 'Kunegunda',
            score: 5
        },
        {
            name: 'Antoś',
            score: 0
        }
    ];

    const playerComponent = mount(<PlayersList players={players}/>);
    const renderedPlayers = playerComponent.find(Player);
    renderedPlayers.forEach((player, i) => {
        expect(player.find('.Player__name').text()).toEqual(players[i].name)
    })
});

it('should call score update', () => {
    const players = [
        {
            name: 'Kunegunda',
            score: 5
        },
        {
            name: 'Antoś',
            score: 0
        }
    ]

    const mockedOnScoreUpdate = jest.fn();
    const playerComponent = shallow(<PlayersList players={players} onScoreUpdate={mockedOnScoreUpdate}/>);
    const firstPlayer = playerComponent.find(Player).first();
    const onPlayerScoreChange = firstPlayer.prop('onPlayerScoreChange');
    onPlayerScoreChange(10);
    expect(mockedOnScoreUpdate).toBeCalledWith(0, 10);
});


it('should call player remove', () => {
    const players = [
        {
            name: 'Kunegunda',
            score: 5
        },
        {
            name: 'Antoś',
            score: 0
        }
    ]

    const mockedOnPlayerRemove = jest.fn();
    const playerComponent = shallow(<PlayersList players={players} onPlayerRemove={mockedOnPlayerRemove}/>);
    const firstPlayer = playerComponent.find(Player).first();
    const onPlayerScoreChange = firstPlayer.prop('onPlayerRemove');
    onPlayerScoreChange(players[0]);
    expect(mockedOnPlayerRemove).toBeCalledWith(players[0]);
});
