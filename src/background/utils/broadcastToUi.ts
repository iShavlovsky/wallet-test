import { EVENTS } from '@/constant';
import eventBus from '@/eventBus';
import { BROADCAST_TO_UI_EVENTS_PAYLOAD } from '@/utils/broadcastToUI';

export function syncStateToUI<T extends keyof BROADCAST_TO_UI_EVENTS_PAYLOAD>(
    event: T,
    payload: BROADCAST_TO_UI_EVENTS_PAYLOAD[T]
) {
    eventBus.emit(EVENTS.broadcastToUI, {
        method: event,
        params: payload
    });
}
