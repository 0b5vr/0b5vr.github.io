module.exports = ( function() {

  [
    { name: 'Twitter', url: 'https://twitter.com/fms_cat/' },
    { name: 'Tumblr', url: 'http://fms-cat.tumblr.com/' },
    { name: 'GitHub', url: 'https://github.com/fms-cat' },
    { name: 'SoundCloud', url: 'https://soundcloud.com/fms_cat' },
    { name: 'Shadertoy', url: 'https://www.shadertoy.com/user/fms_cat' },
    { name: 'Slack', url: 'https://fms-cat.slack.com/' },
  ].map( function( _link ) {
    let anchor = document.createElement( 'a' );
    links.appendChild( anchor );
    anchor.href = _link.url;

    let image = document.createElement( 'image' );
    anchor.appendChild( image );
    image.src = _link.image;

    let span = document.createElement( 'span' );
    anchor.appendChild( span );
    span.innerText = _link.name;
  } );

} )();
