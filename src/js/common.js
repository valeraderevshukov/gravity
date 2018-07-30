import './components';
import './animations';

import OBSERVER from './communication/_observer';
import EVENT from './communication/_events';
setTimeout( () => OBSERVER.ON_FIRE(EVENT.DOC_READY), 0.5);

