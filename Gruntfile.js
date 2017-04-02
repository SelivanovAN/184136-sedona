"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-svgstore");

  grunt.initConfig({
    clean: ["build/*"],

    copy: {
      main: {
        files: [
          {expand: true, src: ['./fonts/**'], dest: './build'},
          {expand: true, src: ['./*.html'], dest: './build'},
          {expand: true, src: ['./css/**'], dest: './build'},
          {expand: true, src: ['./img/**'], dest: './build'},
          {expand: true, src: ['./js/**'], dest: './build'}
        ],
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
            require("autoprefixer")({browsers: [
              "last 2 versions"
            ]}),
            require("css-mqpacker")({
              sort: true
            }),
          ]
        },
        src: "build/css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: 'gzip'
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
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
          src: ["build/img/*.svg"]
        }]
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "*.html",
            "css/*.css"
          ]
        },
        options: {
          server: ".",
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
            src: ["build/img/**/*.{png,jpg,gif}"]
          }]
        }
      },

    watch: {
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss"]
      }
    }
  });

  grunt.registerTask("symbols", ["svgmin", "svgstore"]);

  grunt.registerTask("serve", ["browserSync", "watch"]);
};
