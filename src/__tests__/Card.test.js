import React from 'react';
import { shallow } from 'enzyme';
import Card from '../components/Museum/Card';

describe('<Card />', () => {
  const props = {
    nom_du_musee: 'Musée du Louvre',
    ville: 'Paris',
    id: 'dfc11f5bcb55f0984706fccfdb7f3d46508df6df'
  };
  it('Should display the name of museum.', () => {
    const wrapper = shallow(<Card {...props} />);
    const text = wrapper.find("[data-jest='card-title']").text();
    expect(text).toEqual(props.nom_du_musee);
  });
  it('Should display the name of city.', () => {
    const wrapper = shallow(<Card {...props} />);
    const text = wrapper.find("[data-jest='card-city']").text();
    expect(text).toEqual(props.ville);
  });
});
