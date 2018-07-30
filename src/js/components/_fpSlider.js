import { WIN, ACTIVE, INIT } from '../constants';
import OBSERVER from '../communication/_observer';
import EVENT from '../communication/_events';

export default class FP_SLIDER {
  constructor(config) {
    this._container = $(config.container);
    this._slide = this._container.find(config.slide);

    this._slideLength = $(this._slide).length - 1;
    this._index = 0;
    this._indexLast = 0;

    this._scrollFlag = true;
    this._destroyFlag = false;
    this._scrollTimeout = null;
    this._direction = '';
    this.disableMousewheel = false;
    this.disableMousewheelDelay = config.disableMousewheelDelay || 1500;

    this._delay = config.delay || 1000;

    this.init();
  }
  _addState(i) {
    if (this._destroyFlag) return;
    setTimeout( () => {
      $(this._slide).removeClass(ACTIVE);
      $(this._slide[i]).addClass(ACTIVE);
      if (this._direction === EVENT.FP_UP) OBSERVER.ON_FIRE(EVENT.FP_UP_AFTER, this._index);
      if (this._direction === EVENT.FP_DOWN) OBSERVER.ON_FIRE(EVENT.FP_DOWN_AFTER, this._index);

    }, this._delay-1);
  }
  _changeState(event) {
    (event.originalEvent.wheelDelta >= 0)
      ? this.prev()
      : this.next();
  }
  prev() {
    if (this._index >= 2) this._index--;
    if (this._indexLast !== this._index) {
      this._direction = EVENT.FP_UP;
      this._addState(this._index, this._direction);
			
      // published event FP_UP
      OBSERVER.ON_FIRE(EVENT.FP_UP, this._index);

      if (!(this._indexLast <= 0)) this._indexLast--;
    }
  }
  next() {
    if (this._index < this._slideLength ) this._index++;
    if (this._indexLast !== this._index) {
      this._direction = EVENT.FP_DOWN;
      this._addState(this._index, this._direction);

      // published event FP_DOWN
      OBSERVER.ON_FIRE(EVENT.FP_DOWN, this._index);

      if (!(this._indexLast >= this._slideLength)) this._indexLast++;
    }
  }
  _onWheel() {
    let that = this;
    if (this._destroyFlag) return;
    this._container.on('mousewheel', event => {
      if (!this.disableMousewheel) {
        that._trigger.call(this, event);
        OBSERVER.ON_FIRE(EVENT.FP_WHEEL, this._index, this._direction);
      }
    });
  }
  _trigger(event) {
    let that = this;
    if (this._scrollFlag) {
      this._changeState.call(this, event);
    };
    this._scrollFlag = false;
    clearTimeout(this._scrollTimeout);
    this._scrollTimeout = setTimeout(function() {
      that._scrollFlag = true;
    }, this.disableMousewheelDelay);
  }
  init() {
    this._destroyFlag = false;
    this._container.addClass(INIT);
    this._addState(this._index);
    this._onWheel();
    OBSERVER.ON_FIRE(EVENT.FP_INIT, this._index);
  }
  destroy() {
    this._slide.removeClass(ACTIVE);
    this._container.removeClass(INIT);
    this._destroyFlag = true;
  }
};
