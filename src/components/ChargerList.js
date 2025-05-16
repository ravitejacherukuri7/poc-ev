import React from 'react';
 // eslint-disable-next-line
import { useSelector, useDispatch } from 'react-redux';
import ChargerItem from './ChargerItem';

function ChargerList() {
  const chargers = useSelector((state) => state.chargers.list);
  return (
    <div className="charger-list">
      {chargers.length === 0 ? (
        <p>No chargers added.</p>
      ) : (
        chargers.map((charger) => (
          <ChargerItem key={charger.id} charger={charger} />
        ))
      )}
    </div>
  );
}

export default ChargerList;