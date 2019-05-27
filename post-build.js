const fs = require('fs')
const name = require('./package.json').name

fs.appendFileSync('./build/service-worker.js', `

self.addEventListener('message', (event) => {
  if (!event.data) {
    return;
  }

  switch (event.data) {
    case 'skipWaiting':
      self.skipWaiting();
      break;
    default:
      // NOOP
      break;
  }
});`)

fs.writeFileSync('./build/now.json', `
{
  "version": 2,
  "name": "${name}",
  "alias": "${name}"
}
`)