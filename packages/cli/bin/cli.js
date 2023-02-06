#!/usr/bin/env node

const { performance } = require('perf_hooks');

if (!__dirname.includes('node_modules')) {
  try {
    require('source-map-support').install();
  } catch (error) {}
}

const debugIndex = process.argv.findIndex(arg => /^(?:-d|--debug)$/.test(arg));

if (debugIndex >= 0) {
  process.env.TITIAN_LOG_LEVEL = 'debug';
}

global.__start_time = performance.now();

function start() {
  const importLocal = require('import-local');

  if (importLocal(__filename)) {
    require('../dist').logger.info('using local version of cli');
  } else {
    require('../dist/cli')();
  }
}

start();
