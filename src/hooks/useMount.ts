import { useEffect } from 'react';

export default function useMount(callback: () => void) {
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        callback();
    }, []);
    /* eslint-enable react-hooks/exhaustive-deps */
}
