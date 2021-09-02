import React from 'react';

import { TrayButton } from '@dailyjs/shared/components/Tray';
import { useUIState } from '@dailyjs/shared/contexts/UIStateProvider';

import { ReactComponent as IconChat } from '@dailyjs/shared/icons/chat-md.svg';
import { ReactComponent as IconStream } from '@dailyjs/shared/icons/streaming-md.svg';

import { useChat } from '../../contexts/ChatProvider';
import { useLiveStreaming } from '../../contexts/LiveStreamingProvider';

import { CHAT_ASIDE } from '../ChatAside/ChatAside';
import { LIVE_STREAMING_MODAL } from '../LiveStreamingModal';

export const Tray = () => {
  const { hasNewMessages } = useChat();
  const { isStreaming } = useLiveStreaming();
  const { openModal, toggleAside } = useUIState();

  return (
    <>
    {/* Streaming Button */}
      <TrayButton
        label={isStreaming ? 'Live' : 'Stream'}
        orange={isStreaming}
        onClick={() => openModal(LIVE_STREAMING_MODAL)}
      >
        <IconStream />
      </TrayButton>

    {/* Chat Button */}
      <TrayButton
        label="Chat"
        bubble={hasNewMessages}
        onClick={() => {
          toggleAside(CHAT_ASIDE);
        }}
      >
        <IconChat />
      </TrayButton>
    </>
  );
};

export default Tray;