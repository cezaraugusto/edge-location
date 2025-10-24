#!/usr/bin/env node

const locateEdge = require('./dist/index.cjs').default || require('./dist/index.cjs');

console.log(locateEdge());

