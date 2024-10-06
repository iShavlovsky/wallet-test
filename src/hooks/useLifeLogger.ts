import { useCallback, useEffect, useRef } from 'react';

type LifeCycleEvent =
    | 'onMount'
    | 'onUpdate'
    | 'onUnmount'
    | 'onRender'
    | 'all';

interface LifeLoggerProps {
    name: string;
    events?: LifeCycleEvent[];
    visible: boolean;
    data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const useLifeLogger = ({
    name,
    events = ['onMount', 'onUpdate', 'onUnmount'],
    visible,
    data
}: LifeLoggerProps) => {
    const renderCount = useRef(0);
    const prevProps = useRef(data);

    // Logging occurs only in development mode and if visible = true
    const debug = process.env.NODE_ENV === 'development' && visible;

    const log = useCallback((message: string, extra: unknown[] = [], style: string = '') => {
        if (visible) {
            if (data) {
                console.log(`%c${message}`, style, ...extra, `Render count: ${renderCount.current}`);
            }
            else {
                console.log(`%c${message}`, style, `Render count: ${renderCount.current}`);
            }
        }
    }, [data, visible]);

    const styles: Record<LifeCycleEvent, string> = {
        onMount: 'background: green; color: white',
        onUpdate: 'background: yellow; color: black',
        onUnmount: 'background: red; color: white',
        onRender: 'background: cyan; color: black',
        all: ''
    };

    const shouldLog = useCallback((event: LifeCycleEvent) => events.includes(event) || events.includes('all'), [events]);

    useEffect(() => {
        if (!debug) return;

        // onMount
        if (shouldLog('onMount')) {
            log(`${name} mounted`, [data], styles.onMount);
        }

        return () => {
            // onUnmount
            if (shouldLog('onUnmount')) {
                log(`${name} unmounted`, [], styles.onUnmount);
            }
        };
    }, [name, events, data, debug, shouldLog, log, styles.onMount, styles.onUnmount]);

    useEffect(() => {
        if (!debug) return;

        // Render counter
        renderCount.current += 1;

        if (renderCount.current > 1 && shouldLog('onUpdate')) {
            log(`${name} updated`, [data], styles.onUpdate);
        }

        // Monitoring changes in props
        const changedProps = Object.keys(data || {}).filter((key) => data[key] !== prevProps.current[key]);
        if (changedProps.length > 0 && shouldLog('onUpdate')) {
            log(`${name} props changed:`, changedProps, styles.onUpdate);
        }

        prevProps.current = data;

        if (shouldLog('onRender')) {
            log(`${name} rendered ${renderCount.current} times`, [], styles.onRender);
        }
    }, [data, debug, name, events, shouldLog, log, styles.onUpdate, styles.onRender]);

    return renderCount.current;
};

export default useLifeLogger;
