module.exports = function(grunt) {
  grunt.initConfig({
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
        mangle: false,
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.registerTask('default', ['uglify'])
}
