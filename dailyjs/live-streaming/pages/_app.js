import React from 'react';
import App from '@dailyjs/basic-call/pages/_app';
import AppWithLiveStreamingAndChat from '../components/App';
import ChatAside from '../components/ChatAside';
import { LiveStreamingModal } from '../components/LiveStreamingModal';
import Tray from '../components/Tray';

App.modals = [LiveStreamingModal];
App.asides = [ChatAside];
App.customAppComponent = <AppWithLiveStreamingAndChat />;
App.customTrayComponent = <Tray />;

export default App;
