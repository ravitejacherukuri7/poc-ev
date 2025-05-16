import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmationDialog from './ConfirmationDialog';

function ChargerItem({ charger }) {
  const dispatch = useDispatch();
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [showFaultConfirm, setShowFaultConfirm] = useState(false);

  const handleCommand = (command) => {
    dispatch({ type: 'chargers/command', payload: { id: charger.id, command } });
  };

  const getStatusLabel = () => {
    
    const statusMap = {
      offline: 'Offline',
      online: 'Online',
      charging: 'Charging',
      fault: 'Fault',
    };
    return statusMap[charger.status] || 'Unknown';
  };

  const displayId = charger.name || `Charger-${charger.id.slice(0, 6)}`;

  return (
    <div className="charger-item">
      <h3>{displayId}</h3>
      <p>Status: {getStatusLabel()}</p>
      <div className="button-group">
        <button onClick={() => handleCommand('turnOn')} disabled={charger.status !== 'offline'}>
          Turn On
        </button>
        <button
          onClick={() => handleCommand('startCharging')}
          disabled={charger.status !== 'online'}
        >
          Start Charging
        </button>
        <button
          onClick={() => handleCommand('stopCharging')}
          disabled={charger.status !== 'charging'}
        >
          Stop Charging
        </button>
        <button
          onClick={() => setShowFaultConfirm(true)}
          disabled={charger.status === 'fault'}
        >
          Fault
        </button>
        <button onClick={() => setShowRemoveConfirm(true)} className="danger">
          Remove
        </button>
      </div>
      {showRemoveConfirm && (
        <ConfirmationDialog
          message={`Remove charger "${displayId}"?`}
          onConfirm={() => {
            dispatch({ type: 'chargers/remove', payload: { id: charger.id } });
            setShowRemoveConfirm(false);
          }}
          onCancel={() => setShowRemoveConfirm(false)}
        />
      )}
      {showFaultConfirm && (
        <ConfirmationDialog
          message={`Simulate fault for "${displayId}"?`}
          onConfirm={() => {
            dispatch({ type: 'chargers/command', payload: { id: charger.id, command: 'fault' } });
            setShowFaultConfirm(false);
          }}
          onCancel={() => setShowFaultConfirm(false)}
        />
      )}
    </div>
  );
}

export default ChargerItem;