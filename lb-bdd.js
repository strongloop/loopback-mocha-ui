// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: loopback-mocha-ui
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var Mocha = require('mocha');
var skip_functions = require('./bdd_skip_functions');


module.exports = Mocha.interfaces['lb-bdd'] = function(suite) {
  var suites = [suite];

  var skips = [];
  if (process.env.LOOPBACK_MOCHA_SKIPS) {
    skips = JSON.parse(process.env.LOOPBACK_MOCHA_SKIPS);
  }

  suite.on('pre-require', function(context, file, mocha) {
    var common = require('mocha/lib/interfaces/common')(suites, context);
    var iface = skip_functions(suites, context, file, skips, Mocha);

    context.before = common.before;
    context.after = common.after;
    context.beforeEach = common.beforeEach;
    context.afterEach = common.afterEach;
    context.run = mocha.options.delay && common.runWithSuite(suite);

    context.describe = context.context = iface.describe;
    context.xdescribe = context.xcontext = context.describe.skip = iface.xdescribe;
    context.describe.only = iface.describe_only;
    context.it = context.specify = iface.it;
    context.it.only = iface.it_only;
    context.xit = context.xspecify = context.it.skip = iface.xit;
    context.it.retries = iface.it_retries;
  });
};
