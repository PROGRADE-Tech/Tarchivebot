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
      static_master: {
        files: {
          'public/js/min/master.min.js': [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/js/bootstrap.min.js',
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
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.registerTask('default', ['uglify', 'watch'])
}
