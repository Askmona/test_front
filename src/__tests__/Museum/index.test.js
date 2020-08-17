import React from 'react';
import { shallow } from 'enzyme';
import Museum from '../../components/Museum';

describe('<Museum />', () => {
  const props = {
    museums: [
      {
        record: {
          id: "1",
          fields: {
            nom_du_musee: "Musée d'Orsay",
            ville: "Paris",
          }
        }
      },
      {
        record: {
          id: "2",
          fields: {
            nom_du_musee: "Palais de la Découverte",
            ville: "Paris",
          }
        }
      },
      {
        record: {
          id: "3",
          fields: {
            nom_du_musee: "Le Centre Georges Pompidou",
            ville: "Paris",
          }
        }
      },
      {
        record: {
          id: "4",
          fields: {
            nom_du_musee: "La Cité des Sciences et de l’Industrie",
            ville: "Paris",
          }
        }
      },
    ],
    value: 'Paris',
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    pageTotal: 20,
    currentPage: 8,
    handleClickNext: () => {},
    handleClickPrev: () => {},
    handleClickLast: () => {},
    handleClickFirst: () => {},
  };
  const wrapper = shallow(<Museum {...props} />);
  it('should send as many museum as given in Card args.', () => {
    const museum = wrapper.find("[data-jest='card-museum']");
    expect(museum).toHaveLength(4);
  })
});
