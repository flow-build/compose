const resolve = require('../compose');
const path = require('path');
test('get package base path', () => {
    const basePath = resolve.get_base_path();
    const realBasePath = path.join(__dirname, '..', '..');
    console.log({
        b: basePath,
        r: realBasePath
    });

    expect(basePath).toBe(realBasePath);
})