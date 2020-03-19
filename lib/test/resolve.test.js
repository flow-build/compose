const resolve = require('../resolve');
const path = require('path');

test('get package base path', () => {
    const basePath = resolve.get_type();
    const realBasePath = path.join(__dirname, '..', '..');
    console.log({
        b: basePath,
        r: realBasePath
    });

    expect(basePath).toBe(realBasePath);
})