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
