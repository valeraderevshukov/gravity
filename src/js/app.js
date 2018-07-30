import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import { TOUCH } from './utils';
import { BODY, DOC, READY, NO_TOUCH } from './constants';
import common from './common';

DOC.ready(common);

svg4everybody();
objectFitImages();
if (!TOUCH()) BODY.addClass(NO_TOUCH + ' ' + READY);
