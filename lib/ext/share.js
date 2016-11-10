'use strict';

var flowplayer = require('../flowplayer')
  , common = require('../common')
  , extend = require('extend-object')
  , bean = require('bean');

flowplayer(function(api, root) {
  api.shareUrl = function(directEmbed) {
    var title = encodeURIComponent(api.video.title || (common.find('title')[0] || {}).innerHTML || 'Flowplayer video')
      , conf = encodeURIComponent(btoa(JSON.stringify(extend({}, api.conf, api.extensions))))
      , redirect = encodeURIComponent(window.location.toString())
      , baseUrl = directEmbed ? 'https://flowplayer.org/e/' : 'https://flowplayer.org/s/';
    return baseUrl + '?t=' + title + '&c=' + conf + '&r=' + redirect;
  };

  var menu = common.createElement('div', { className: 'fp-menu fp-share-menu' }, '<strong>Share</strong>');
  common.find('.fp-ui', root)[0].appendChild(menu);

  bean.on(root, 'click', '.fp-share', function(ev) {
    ev.preventDefault();
    common.toggleClass(menu, 'fp-active');
  });
});