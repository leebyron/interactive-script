var readline = require('readline')
var util = require('util')

function runInteractiveScript(fn) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  function say(statement, key) {
    var output = statement == null || typeof statement === 'string' ?
      statement :
      util.inspect(statement, { colors: true, depth: 10 })
    rl.write(output + '\n', key)
  }

  function ask(query) {
    return new Promise(resolve => rl.question(query, resolve))
  }

  fn(say, ask).then(
    function () {
      rl.close()
    },
    function (error) {
      rl.close()
      console.error(error)
      process.exitCode = process.exitCode || 1
    }
  )

  return rl
}

module.exports = runInteractiveScript
