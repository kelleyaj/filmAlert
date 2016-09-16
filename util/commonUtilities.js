'use strict';

module.exports.cleanFilmName = function(filmnName){
  return filmnName.replace('2D ','').replace('3D ','').trim();
};