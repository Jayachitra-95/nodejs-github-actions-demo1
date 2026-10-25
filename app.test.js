const { test } = require('node:test');
const assert = require('node:assert');

test('Node.js application starts and responds successfully', async () => {
    const server = require('./app.js');

    await new Promise((resolve) => {
        if (server.listening) {
            resolve();
        } else {
            server.once('listening', resolve);
        }
    });

    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}`);

    assert.strictEqual(response.status, 200);

    const body = await response.text();

    assert.match(body, /Hello from Node\.js!/);

    await new Promise((resolve, reject) => {
        server.close((error) => {
            if (error) reject(error);
            else resolve();
        });
    });
});
