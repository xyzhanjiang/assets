module.exports = {
  plugins: [
    require('postcss-cssnext'),
    require('cssnano')({
      autoprefixer: false,
      safe: true
    })
  ]
}
