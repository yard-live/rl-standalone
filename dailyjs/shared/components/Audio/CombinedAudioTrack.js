import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDeepCompareEffect, useDeepCompareMemo } from 'use-deep-compare';

const CombinedAudioTrack = ({ tracks }) => {
  const audioEl = useRef(null);

  useEffect(() => {
    if (!audioEl) return;
    audioEl.current.srcObject = new MediaStream();
  }, []);

  const trackIds = useDeepCompareMemo(
    () => Object.values(tracks).map((t) => t?.persistentTrack?.id),
    [tracks]
  );

  useDeepCompareEffect(() => {
    const audio = audioEl.current;
    if (!audio || !audio.srcObject) return;

    const stream = audio.srcObject;
    const allTracks = Object.values(tracks);

    allTracks.forEach((track) => {
      const persistentTrack = track?.persistentTrack;
      if (persistentTrack) {
        persistentTrack.addEventListener(
          'ended',
          (ev) => stream.removeTrack(ev.target),
          { once: true }
        );
        stream.addTrack(persistentTrack);
      }
    });

    audio.load();

    if (
      stream
        .getAudioTracks()
        .some((t) => t.enabled && t.readyState === 'live') &&
      audio.paused
    ) {
      audio.play();
    }
  }, [tracks, trackIds]);

  return (
    <audio autoPlay playsInline ref={audioEl}>
      <track kind="captions" />
    </audio>
  );
};

CombinedAudioTrack.propTypes = {
  tracks: PropTypes.object,
};

export default CombinedAudioTrack;
