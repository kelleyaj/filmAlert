'use strict';

module.exports.cleanFilmName = function(filmnName){
  return filmnName.replace('2D ','')
                  .replace('Movie Party','')
                  .replace('Free Victory:','')
                  .replace('with Livestream Q&A','')
                  .replace('(2016)','')
                  .replace('3D ','')
                  .replace('Girlie Night:','')
                  .replace('Sing-Along','')
                  .trim();
};