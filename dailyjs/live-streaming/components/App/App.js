import React from 'react';
import App from '@dailyjs/basic-call/components/App';
import { ChatProvider } from '../../contexts/ChatProvider';
import { LiveStreamingProvider } from '../../contexts/LiveStreamingProvider';

// Extend our basic call app component with the live streaming context
export const AppWithLiveStreamingAndChat = () => (
  <ChatProvider>
    <LiveStreamingProvider>
        <App />
    </LiveStreamingProvider>
  </ChatProvider>
);

export default AppWithLiveStreamingAndChat;
