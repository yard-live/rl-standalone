import React, { useEffect } from 'react';
import { Button } from '@dailyjs/shared/components/Button';
import { CardBody } from '@dailyjs/shared/components/Card';
import Modal from '@dailyjs/shared/components/Modal';
import Well from '@dailyjs/shared/components/Well';
import { useCallState } from '@dailyjs/shared/contexts/CallProvider';
import { useUIState } from '@dailyjs/shared/contexts/UIStateProvider';
import {
  RECORDING_COUNTDOWN_1,
  RECORDING_COUNTDOWN_2,
  RECORDING_COUNTDOWN_3,
  RECORDING_IDLE,
  RECORDING_RECORDING,
  RECORDING_SAVED,
  RECORDING_TYPE_CLOUD,
  RECORDING_UPLOADING,
  useRecording,
} from '../../contexts/RecordingProvider';

export const RECORDING_MODAL = 'recording';

export const RecordingModal = () => {
  const { currentModals, closeModal } = useUIState();
  const { enableRecording } = useCallState();
  const {
    recordingStartedDate,
    recordingState,
    startRecordingWithCountdown,
    stopRecording,
  } = useRecording();

  useEffect(() => {
    if (recordingState === RECORDING_RECORDING) {
      closeModal(RECORDING_MODAL);
    }
  }, [recordingState, closeModal]);

  const disabled =
    enableRecording &&
    [RECORDING_IDLE, RECORDING_RECORDING].includes(recordingState);

  function renderButtonLabel() {
    if (!enableRecording) {
      return 'Recording disabled';
    }

    switch (recordingState) {
      case RECORDING_COUNTDOWN_3:
        return '3...';
      case RECORDING_COUNTDOWN_2:
        return '2...';
      case RECORDING_COUNTDOWN_1:
        return '1...';
      case RECORDING_RECORDING:
        return 'Stop recording';
      case RECORDING_UPLOADING:
      case RECORDING_SAVED:
        return 'Stopping recording...';
      default:
        return 'Start recording';
    }
  }

  function handleRecordingClick() {
    if (recordingState === RECORDING_IDLE) {
      startRecordingWithCountdown();
    } else {
      stopRecording();
    }
  }

  return (
    <Modal
      title="Recording"
      isOpen={currentModals[RECORDING_MODAL]}
      onClose={() => closeModal(RECORDING_MODAL)}
      actions={[
        <Button fullWidth variant="outline">
          Close
        </Button>,
        <Button
          fullWidth
          disabled={!disabled}
          onClick={() => handleRecordingClick()}
        >
          {renderButtonLabel()}
        </Button>,
      ]}
    >
      <CardBody>
        {!enableRecording ? (
          <Well variant="error">
            Recording is not enabled for this room (or your browser does not
            support it.) Please enabled recording when creating the room or via
            the Daily dashboard.
          </Well>
        ) : (
          <p>
            Recording type enabled: <strong>{enableRecording}</strong>
          </p>
        )}

        {recordingStartedDate && (
          <p>Recording started: {recordingStartedDate.toString()}</p>
        )}

        {enableRecording === RECORDING_TYPE_CLOUD && (
          <>
            <hr />

            <p>
              Cloud recordings can be accessed via the Daily dashboard under the
              &quot;Recordings&quot; section.
            </p>
          </>
        )}
      </CardBody>
    </Modal>
  );
};

export default RecordingModal;
