import Rx from 'rxjs';

export const keydowns = Rx.Observable.fromEvent(document, 'keydown');

export function isKeyMovementEvent(e) {
    return ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.key) !== -1;
}

export function isInputEvent(e) { 
    return e.target.tagName === 'INPUT';
}