module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      dev: {
        files: ['public/js/*.js'],
        task: ['uglify'],
        options: {
          nospawn: 'true',
          interrupt: 'true'
        }
      }
    },
    uglify: {
      static_js: {
        files: {
          'public/js/min/master.min.js': [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-sanitize/angular-sanitize.min.js',
            'node_modules/ng-table/bundles/ng-table.min.js',
            'node_modules/sweetalert/dist/sweetalert.min.js',
            'public/js/api-service.js',
            'public/js/core.js'
          ]
        }
      },
      options: {
        // Play nice with Angular:
        mangle: false
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/css/min/master.min.css': [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/ng-table/bundles/ng-table.min.css',
            'node_modules/sweetalert/dist/sweetalert.css',
            'public/css/main.css'
          ]
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.registerTask('default', ['uglify', 'cssmin', 'watch'])
}
