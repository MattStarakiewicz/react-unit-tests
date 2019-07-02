import AddPlayer from './AddPlayer';
import React from 'react';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  shallow(<AddPlayer />);
});

it('matches snapshot', () => {
    const component = shallow(<AddPlayer />);

    expect(component).toMatchSnapshot();
});

it('contains a submit button', () => {
    const addPlayerComponent = shallow(<AddPlayer />);

    const addPlayer = addPlayerComponent.find('.AddPlayer__submit').first();
    const type = addPlayer.prop("type");

    expect(type).toEqual("submit");
});

it('submit adds a new player', () => {
    const onPlayerAdd = jest.fn();
    const addPlayerComponent = mount(<AddPlayer onPlayerAdd={onPlayerAdd} />);

    const form = addPlayerComponent.find('form');
    form.simulate('submit');

    expect(onPlayerAdd).toHaveBeenCalled();
});

it('renders correct name', () => {
    const onPlayerAdd = jest.fn();
    const addPlayerComponent = mount(<AddPlayer onPlayerAdd={onPlayerAdd} />);

    const nameInput = addPlayerComponent.find('input').first().getDOMNode();
    nameInput.value = 'Ania';
    const form = addPlayerComponent.find('form');
    form.simulate('submit');

    expect(onPlayerAdd).toBeCalledWith('Ania');
});
