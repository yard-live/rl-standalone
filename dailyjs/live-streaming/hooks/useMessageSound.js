import { useEffect, useMemo } from 'react';

import { useSound } from '@dailyjs/shared/hooks/useSound';
import { debounce } from 'debounce';

/**
 * Convenience hook to play `join.mp3` when participants join the call
 */
export const useMessageSound = () => {
  const { load, play } = useSound('message.mp3');

  useEffect(() => {
    load();
  }, [load]);

  return useMemo(() => debounce(() => play(), 5000, true), [play]);
};

export default useMessageSound;
