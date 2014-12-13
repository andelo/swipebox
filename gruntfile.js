module.exports = function(grunt) {

	// don't forget to update the version in the package.json and bower.json file

	// load dependencies
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({

		version: grunt.file.readJSON('package.json').version,
		pkg: grunt.file.readJSON('package.json'),

		// compile scss
		sass: {

			dist:{
				options:{
					style: 'expanded'
				},

				files:{
					'src/css/swipebox.css': 'scss/swipebox.scss'
				}
			}

		},

		// https://github.com/nDmitry/grunt-autoprefixer
		autoprefixer: {
			options: {
				browsers: ['last 3 versions', 'bb 10', 'android 3']
			},
			no_dest: {
				src: 'src/css/swipebox.css'
			}
		},

		// minify css asset files
		cssmin: {
			minify: {
				expand: true,
				cwd: 'src/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'src/css/',
				ext: '.min.css'
			}
		},

		// minify JS
		uglify: {

			options:{
				banner : '/*! Swipebox v<%= version %> | Constantin Saguin csag.co | MIT License | github.com/brutaldesign/swipebox */\n'
			},

			admin: {
				files: {
					'src/js/jquery.swipebox.min.js': [ 'src/js/jquery.swipebox.js']
				}
			}
		},

		// watch it live
		watch: {
			js: {                       
				files: [ 'src/js/*.js' ],
				tasks: [
					'uglify'
				],
			},
			scss: {

				files: ['scss/*.scss'],
				tasks: [
					'sass',
					'autoprefixer',
					'cssmin'
				],
			},

			css: {
				files: ['*.css']
			},

			livereload: {
				files: [ 'src/css/*.css', 'demo/*.css' ],
				options: { livereload: true }
			}
		},

		
	} ); // end init config

	/**
	 * Default task
	 */
	grunt.registerTask( 'default', [
		'sass:dist',
		'autoprefixer',
		'cssmin',
		'uglify'
	] );

	/**
	 * Dev task
	 *
	 * The main tasks for development
	 *
	 */
	grunt.registerTask( 'dev', [
		'sass:dist',
		'autoprefixer',
		'cssmin',
		'jshint',
		'uglify',
		'watch'
	] );
};
