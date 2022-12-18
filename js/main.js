import {renderPictures} from './pictures.js';
import {renderFileUpload} from './img-upload.js';
import {getData} from './api.js';

getData(renderPictures);
renderFileUpload();
