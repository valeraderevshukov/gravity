import { ACTIVE } from '../constants';

const enChoose = $('.js-en-choose');
const ruChoose = $('.js-ru-choose');
const langEn = $('.js-lang-en');
const langRu = $('.js-lang-ru');

enChoose.addClass(ACTIVE);
langEn.addClass(ACTIVE);

const langChoose = (trigger,container) => {
  trigger.on('click', () => {
    $('[class*="js-lang"]').removeClass(ACTIVE);
    $('[class*="-choose"]').removeClass(ACTIVE);
    trigger.addClass(ACTIVE);
    container.addClass(ACTIVE);
  });
};
langChoose(enChoose, langEn);
langChoose(ruChoose, langRu);
