const files = require.context('.', false, /\.js$/)
const actions = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  actions[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default actions