import * as ethUtil from 'ethereumjs-util';

import pageStateCache from '../service/pageStateCache';
export { default as createPersistStore } from './persistStore';

export function normalizeAddress(input: number | string): string {
    if (!input) {
        return '';
    }

    if (typeof input === 'number') {
        const buffer = ethUtil.toBuffer(input);
        input = ethUtil.bufferToHex(buffer);
    }

    if (typeof input !== 'string') {
        let msg = 'eth-sig-util.normalize() requires hex string or integer input.';
        msg += ` received ${typeof input}: ${input}`;
        throw new Error(msg);
    }

    return ethUtil.addHexPrefix(input);
}

export const setPageStateCacheWhenPopupClose = (data) => {
    const cache = pageStateCache.get();
    if (cache && cache.path === '/import/wallet-connect') {
        pageStateCache.set({
            ...cache,
            states: {
                ...cache.states,
                data
            }
        });
    }
};

export const hasWalletConnectPageStateCache = () => {
    const cache = pageStateCache.get();
    if (cache && cache.path === '/import/wallet-connect') {
        return true;
    }
    return false;
};

export const isSameAddress = (a: string, b: string) => {
    return a.toLowerCase() === b.toLowerCase();
};
