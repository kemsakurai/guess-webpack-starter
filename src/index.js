import {guess} from 'guess-webpack/api';

window.addEventListener('DOMContentLoaded', () => {
    addPrefetchToHead();
});

function addPrefetchToHead() {
    if (typeof window !== 'undefined') {
        for (const url of Object.keys(guess())) {
            let hint = document.createElement('link');
            hint.rel = 'prefetch';
            hint.href = url;
            hint.as = 'html';
            hint.crossorigin = 'use-credentials';
            document.head.appendChild(hint);
        }
    }
}
