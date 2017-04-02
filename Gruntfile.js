"use strict";

module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-svgmin");
  grunt.loadNpmTasks("grunt-svgstore");
  grunt.loadNpmTasks("grunt-csso");

  grunt.initConfig({
    clean: ["build/*"],

    copy: {
      main: {
        files: [
          {expand: true, src: ['./fonts/**'], dest: './build'},
          {expand: true, src: ['./*.html'], dest: './build'},
          {expand: true, src: ['./js/**'], dest: './build'}
        ],
      },
      build: {
        files: [{
          expand: true,
          src: ["*.html"],
          dest: "build"
        }]
      },
    },

    less: {
      style: {
        files: {
          "build/css/style.css": "less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({
              browsers: [
                "last 2 versions"
              ]
            }),
            require("css-mqpacker")({
              sort: true
            }),
          ]
        },
        src: "build/css/*.css"
      }
    },

    csso: {
      dynamic_mappings: {
        expand: true,
        cwd: 'build/css',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/',
        ext: '.min.css'
      }
    },

    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      symbols: {
        files: {
          "build/img/symbols.svg": ["img/*.svg"]
        }
      }
    },

    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: "img/*.svg",
          dest: "./build"
        }]
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },


    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: "img/**/*.{png,jpg,gif}",
          dest: "./build"
        }]
      }
    },

    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy"]
      },
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      }
    }
  });

  grunt.registerTask("symbols", ["svgmin", "svgstore"]);
  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("build", ["clean", "copy", "less", "postcss", "csso", "svgmin", "imagemin"]);
};
