(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/Yutaka/Dropbox/pro/_Projects/fms-cat-github-io/src/script/links.js":[function(require,module,exports){
'use strict';

module.exports = function () {

  [{ name: 'Twitter', url: 'https://twitter.com/fms_cat/' }, { name: 'Tumblr', url: 'http://fms-cat.tumblr.com/' }, { name: 'GitHub', url: 'https://github.com/fms-cat' }, { name: 'SoundCloud', url: 'https://soundcloud.com/fms_cat' }, { name: 'Shadertoy', url: 'https://www.shadertoy.com/user/fms_cat' }, { name: 'Slack', url: 'https://fms-cat.slack.com/' }].map(function (_link) {
    var anchor = document.createElement('a');
    links.appendChild(anchor);
    anchor.href = _link.url;

    var image = document.createElement('image');
    anchor.appendChild(image);
    image.src = _link.image;

    var span = document.createElement('span');
    anchor.appendChild(span);
    span.innerText = _link.name;
  });
}();

},{}],"/Users/Yutaka/Dropbox/pro/_Projects/fms-cat-github-io/src/script/main.js":[function(require,module,exports){
'use strict';

(function () {

  'use strict';

  require('./links');
  require('./projects');
})();

},{"./links":"/Users/Yutaka/Dropbox/pro/_Projects/fms-cat-github-io/src/script/links.js","./projects":"/Users/Yutaka/Dropbox/pro/_Projects/fms-cat-github-io/src/script/projects.js"}],"/Users/Yutaka/Dropbox/pro/_Projects/fms-cat-github-io/src/script/projects.js":[function(require,module,exports){
'use strict';

module.exports = function () {

  [{
    name: 'Shift',
    url: 'https://fms-cat.github.io/shift/dist/',
    image: 'projects-shift.png',
    date: 201702,
    importance: 1.0,
    desc: 'WebGL Demo - 1st Place @ TokyoDemoFest 2017'
  }, {
    name: 'Automaton',
    url: 'https://github.com/fms-cat/automaton',
    image: 'projects-automaton.jpg',
    date: 201702,
    importance: 1.0,
    desc: 'JavaScriptでのアニメーションを支援するタイムラインシステム'
  }, {
    name: 'Everyday One Motion',
    url: 'https://motions.work',
    image: 'projects-eom.jpg',
    date: 999999,
    importance: 1.0,
    desc: '14人のアーティストが日替わりで毎日モーショングラフィックスを投稿するプロジェクト'
  }, {
    name: 'Nightbird Audience Node',
    url: 'https://fukuchilab.org/projects-j/nightbirdaudiencenode-j',
    image: 'projects-nightbirdan.png',
    date: 201603,
    importance: 1.0,
    desc: '即興によるプログラミングを用いた映像パフォーマンスにおいて、観客がパフォーマンスを支援するためのシステム'
  }, {
    name: 'Type',
    url: 'https://fms-cat.github.io/type/',
    image: 'projects-type.png',
    date: 201602,
    importance: 1.0,
    desc: '16kb WebGL Demo - 2nd Place @ TokyoDemoFest 2016'
  }, {
    name: 'Nightbird',
    url: 'https://github.com/FMS-Cat/nightbird',
    image: 'projects-nightbird.png',
    date: 201503,
    importance: 0.8,
    desc: 'GIFやGLSLをD&Dしてつなげていくことにより映像パフォーマンスを実現できる、ブラウザ上で動くVJシステム'
  }, {
    name: 'LiveTexture',
    url: 'http://fms-cat.github.io/LiveTexture/',
    image: 'projects-livetexture.jpg',
    date: 201503,
    importance: 0.8,
    desc: 'スマートフォンのセンサ情報を活用し、画面上に視覚的に材質感を再現するシステム'
  }, {
    name: 'And...',
    url: 'http://fms-cat.tumblr.com/post/114339120774/',
    date: 0,
    importance: 0.0,
    desc: 'まだまだあります'
  }].map(function (_project) {
    var project = document.createElement('a');
    projects.appendChild(project);
    project.classList.add('project');
    project.href = _project.url;
    if (_project.image) {
      project.style.background = 'url( image/' + _project.image + ' )';
      project.style.backgroundSize = 'cover';
      project.style.backgroundPosition = 'center';
    } else {
      project.style.background = '#aaa';
    }

    // let image = document.createElement( 'image' );
    // anchor.appendChild( image );
    // image.src = _link.image;

    var name = document.createElement('span');
    project.appendChild(name);
    name.classList.add('name');
    name.innerText = _project.name;

    project.innerHTML += '<br />';

    var desc = document.createElement('span');
    project.appendChild(desc);
    desc.classList.add('div');
    desc.innerText = _project.desc;
  });
}();

},{}]},{},["/Users/Yutaka/Dropbox/pro/_Projects/fms-cat-github-io/src/script/main.js"]);
