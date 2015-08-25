module.exports = function(grunt) {

	var mozjpeg = require('imagemin-mozjpeg');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		    image: {
		      minifyimages: {
		        options: {
		          pngquant: true,
		          optipng: true,
		          advpng: true,
		          zopflipng: true,
		          pngcrush: true,
		          pngout: true,
		          mozjpeg: true,
		          jpegRecompress: true,
		          jpegoptim: true,
		          gifsicle: true,
		          svgo: true
		        },
		        files: [{
		          expand: true,
		          cwd: '<%= pkg.route_folder_site %>',
		          src: ['**/*.{png,ico,gif,jpg,jpeg,svg}'],
		          dest: '<%= pkg.route_folder_build %>'
		        }]
		      },
		    },
			concat: {
				concatjs: {
					src: '<%= pkg.route_folder_site %>/**/*.js',
					dest: '<%= pkg.route_folder_build %>/js/<%= pkg.name_site %>.js'
				},
				concatcss: {
					src: '<%= pkg.route_folder_site %>/**/*.css',
					dest: '<%= pkg.route_folder_build %>/css/<%= pkg.name_site %>.css'
				}
			},
			htmlmin: {
				minifyhtml: {
					options: { removeComments: true, collapseWhitespace: true },
					expand: true,
					cwd: '<%= pkg.route_folder_site %>',
					src: ['**/*.html'],
					dest: '<%= pkg.route_folder_build %>',
				}
			},
			uglify: {
				options: { mangle: false, preserveComments: false,},
				minifyjs: {
					files: [{
						expand: true,
						src: '<%= pkg.route_folder_build %>/js/<%= pkg.name_site %>.js',
						ext:  '.min.js'
					},],
				},
			},
			cssmin: {
				options: { keepSpecialComments: 0 },
				minifycss: {
					files: [{
						expand: true,
						src: '<%= pkg.route_folder_build %>/css/<%= pkg.name_site %>.css',
						ext:  '.min.css'
					}],
				},
			},
			sass: {
				options: { lineNumbers: true, sourcemap: "none" },
				compilesass: {
					expand: true,
					cwd: '<%= pkg.route_folder_site %>',
					src: ['**/*.scss'],
					dest: '<%= pkg.route_folder_build %>',
					ext: '.css'
				},
			},
			less: {
				options: {removeComments: true },
				compileless: {
					expand: true,
					cwd: '<%= pkg.route_folder_site %>',
					src: ['**/*.less'],
					dest: '<%= pkg.route_folder_build %>',
					ext: '.css'
				},
			}
	});

  	grunt.loadNpmTasks('grunt-image');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('superbarra', ['concat','htmlmin','uglify','cssmin','sass','less']);
};