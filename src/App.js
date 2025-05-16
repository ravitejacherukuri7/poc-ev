import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ChargerList from './components/ChargerList';
import ChargerForm from './components/ChargerForm';
import ConfirmationDialog from './components/ConfirmationDialog';

function App() {
   // eslint-disable-next-line
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showRemoveAllConfirm, setShowRemoveAllConfirm] = useState(false);

  return (
    <Provider store={store}>
      <div className="app-container">
        <h1>EV Charger Simulator</h1>
        <ChargerForm />
        <div className="button-group">
          <button onClick={() => setShowRemoveAllConfirm(true)} className="danger">
            Remove All Chargers
          </button>
          <button onClick={() => store.dispatch({ type: 'chargers/resetAll' })} className="secondary">
            Reset All
          </button>
        </div>
        <ChargerList />
        {showRemoveAllConfirm && (
          <ConfirmationDialog
            message="Are you sure you want to remove all chargers?"
            onConfirm={() => {
              store.dispatch({ type: 'chargers/removeAll' });
              setShowRemoveAllConfirm(false);
            }}
            onCancel={() => setShowRemoveAllConfirm(false)}
          />
        )}
      </div>
    </Provider>
  );
}

export default App;