import { DisplayedKeryring } from '@/background/service/keyring';

export const enum BROADCAST_TO_UI_EVENTS {
    storeChanged = 'storeChanged',
    accountAliasNameChanged = 'accountAliasNameChanged',
    // legacy
    accountsChanged = 'accountsChanged',
}

export type BROADCAST_TO_UI_EVENTS_PAYLOAD = {
    [BROADCAST_TO_UI_EVENTS.accountAliasNameChanged]: {
        address: string;
        name: string;
    };
    [BROADCAST_TO_UI_EVENTS.accountsChanged]: DisplayedKeryring['accounts'][number];
    [BROADCAST_TO_UI_EVENTS.storeChanged]: {
        bgStoreName: string;
        changedKey: string;
        changedKeys: string[];
        partials: Record<string, any>;
    };
};
