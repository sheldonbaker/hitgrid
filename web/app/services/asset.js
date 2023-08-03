import Ember from 'ember';
import config from 'hitgrid/config/environment';

const { Service, get } = Ember;

export default Service.extend({
  clubLogoPath(club) {
    return [config.assetsPath, 'logos', [get(club, 'id'), 'svg'].join('.')].join('/');
  }  
});
