interactive-script
==================

Need to write a simple interactive terminal script in node? Dealing with [readline](https://nodejs.org/api/readline.html) can be overwhelming and result in [callback hell](http://callbackhell.com/).

There's a simpler way that easier to write!

To get started, we need to install a few dependencies:

```bash
npm install -g interactive-script async-to-gen minimist
```

Now let's write `myScript.js`:

```js
var interactiveScript = require('interactive-script');
var minimist = require('minimist');

interactiveScript(async (say, ask) => {
  const { pirate } = minimist(process.argv.slice(2))

  say(pirate ? 'Avast, me hearty!' : 'Hello there')

  const name = await ask(pirate ? 'Whats ye name? ' : 'Who are you? ')

  say('HI THERE: ' + name.toUpperCase())
})
```

You're given two functions:

- Print to the screen with `say`.
- Prompt and wait for a response with `ask`.

You may have noticed that this script uses an [async function](https://github.com/tc39/ecmascript-asyncawait)
which is not yet available out of the box in node.js. However you can install
and use [async-node](https://github.com/leebyron/async-to-gen) to take
advantage today.

Let's run this script:

```bash
$> async-node myScript.js --pirate
Avast, me hearty!
Whats ye name? Lee
HI THERE: LEE
$>
```

# Tastes great with:

[minimist](https://github.com/substack/minimist): Read the arguments provided to
your script from the terminal.

[colors](https://github.com/marak/colors.js/): Ask and say things in a rainbow
of colors for better legibility.
