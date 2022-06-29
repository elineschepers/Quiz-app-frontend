module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  plugins: [
    require('@tailwindcss/forms'),
    require('tw-elements/dist/plugin')
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue':{
          100:'#E30147',
          200: '#FF0752',
        }, 
      },
    }
  }
}

