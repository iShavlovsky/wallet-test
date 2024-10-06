import { useEffect, useState } from 'react';

import useMount from './useMount';

export default function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useMount(() => {
        setMatches(window.matchMedia(query).matches);
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQuery.addEventListener('change', handler);

        return () => {
            mediaQuery.removeEventListener('change', handler);
        };
    }, [query]);

    return matches;
}
