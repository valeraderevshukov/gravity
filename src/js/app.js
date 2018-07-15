import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import { TOUCH } from './utils';
import { BODY, DOC } from './constants';

svg4everybody();
if (!TOUCH()) BODY.addClass('no-touch');

objectFitImages();

import common from './common';
DOC.ready(common);
