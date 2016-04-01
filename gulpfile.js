( function() {

  'use strict';

  let gulp = require( 'gulp' );

  let browserify = require( 'browserify' );
  let watchify = require( 'watchify' );
  let babelify = require( 'babelify' );
  let sass = require( 'gulp-sass' );
  let rename = require( 'gulp-rename' );
  let source = require( 'vinyl-source-stream' );

  let browserSync = require( 'browser-sync' );

  // ---

  gulp.task( 'style-build', function() {
    return gulp.src( './src/style/main.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( './dist' ) )
    .pipe( browserSync.stream() )
  } );

  gulp.task( 'style-watch', function() {
    gulp.watch( './src/style/**', [ 'style-build' ] );
  } );

  // ---

  let brwsrfy = watchify( browserify( {
    'cache': {},
    'packageCache': {},
    'fullPaths': true,
    'entries': [ './src/script/main.js' ],
    'transform': [
      [ babelify, {
        'presets': 'es2015'
      } ]
    ]
  } ) );

  let bundle = function() {
    console.log( '🔮 Browserify!' );
    brwsrfy.bundle()
    .on( 'error', function( _error ) {
      console.error( _error );
      this.emit( 'end' );
    } )
    .pipe( source( 'main.js' ) )
    .pipe( gulp.dest( './dist' ) );
  };

  brwsrfy.on( 'log', function( _log ) {
    console.log( '🍕 ' + _log );
  } );

  gulp.task( 'script-build', function() {
    bundle();
  } );

  gulp.task( 'script-watch', function() {
    brwsrfy.on( 'update', function() {
      bundle();
    } );
  } );

  // ---

  gulp.task( 'html-copy', function() {
    gulp.src( './src/*.html' )
    .pipe( gulp.dest( 'dist' ) );
  } );

  gulp.task( 'html-watch', function() {
    gulp.watch( [ './src/*.html' ], [ 'html-copy' ] );
  } );

  // ---

  gulp.task( 'browser-init', function() {
    browserSync.init( {
      server: './dist'
    } );
  } );

  gulp.task( 'browser-reload', function() {
    browserSync.reload();
  } );

  gulp.task( 'browser-watch', function() {
    gulp.watch( [ './dist/**', '!./dist/**/*.css' ], [ 'browser-reload' ] );
  } );

  // ---

  gulp.task( 'watch', [
    'style-watch',
    'script-watch',
    'browser-watch'
  ] );

  gulp.task( 'build', [
    'style-build',
    'script-build'
  ] );

  gulp.task( 'dev', [
    'build',
    'browser-init',
    'watch'
  ] );

  gulp.task( 'default', [
    'dev'
  ] );

} )();
