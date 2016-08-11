var readline = require('readline')
var util = require('util')

function runInteractiveScript(fn) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  /**
   * statement is formatted if not a string.
   * key is the second argument to readline.Interface#write
   */
  function say(statement, key) {
    var output = statement == null || typeof statement === 'string' ?
      statement :
      util.inspect(statement, { colors: true, depth: 10 })
    rl.write(output + '\n', key)
  }

  /**
   * query is prompted on the same line
   * Yn: return boolean defaulting to true
   * yN: return boolean defaulting to false
   */
  function ask(query, yN) {
    return new Promise(function (resolve) {
      if (yN === 'Yn') {
        query += '[Yn] ';
      } else if (yN) {
        query += '[yN] ';
      }
      rl.question(query, function (answer) {
        if (yN === 'Yn') {
          resolve(answer[0] !== 'n' && answer[0] !== 'N')
        } else if (yN) {
          resolve(answer[0] === 'y' || answer[0] === 'Y')
        } else {
          resolve(answer)
        }
      })
    })
  }

  fn(say, ask).then(
    function (code) {
      rl.close()
      process.exit(code || 0)
    },
    function (error) {
      rl.close()
      console.error(error)
      process.exit(process.exitCode || 1)
    }
  )

  return rl
}

module.exports = runInteractiveScript
