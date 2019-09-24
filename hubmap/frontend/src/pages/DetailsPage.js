import React from 'react';

const fakeMetadata = {
  title: 'My nifty dataset',
  'date-published': '2020-01-01',
  authors: ['Austen, Jane', 'Basho', 'Carroll, Lewis'],
  experiments: [
    // { name: 'Foucault\'s Pendulum', demonstrates: 'Earth\'s rotation' },
    // { name: 'Millikan\'s Oil Drop', demonstrates: 'Electron charge' },
  ],
  credits: { Catering: 'Clover', 'Dolly Grip': 'ABC', Gaffer: 'XYZ' },
};

function Details(props) {
  const { metadata } = props;
  return (
    <table>
      {
        Object.entries(metadata).map(
          ([key, value]) => {
            let renderedValue = value;
            if (Array.isArray(value)) {
              renderedValue = '[array]';
            } else if (typeof value === 'object') {
              renderedValue = '[object]';
            }

            return (
              <tr>
                <td>{key}</td>
                <td>{renderedValue}</td>
              </tr>
            );
          },
        )
      }
    </table>
  );
}

export default function () {
  // TODO: Fix the banner so the BRs are not needed.
  // https://github.com/hubmapconsortium/hubmap-data-portal/issues/159
  return (
    <div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Details metadata={fakeMetadata} />
    </div>
  );
}
