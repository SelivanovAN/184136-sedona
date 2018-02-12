"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");

  grunt.initConfig({
    less: {
      style: {
        files: {
          "source/css/style.css": "source/less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")()
          ]
        },
        src: "source/css/*.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "source/*.html",
            "source/css/*.css"
          ]
        },
        options: {
          server: "source/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "postcss"]
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
};
