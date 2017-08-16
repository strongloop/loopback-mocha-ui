// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: strong-mocha-interfaces
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var Suite = require('mocha/lib/suite');
var Test = require('mocha/lib/test');
var escapeRe = require('escape-string-regexp');

module.exports = function(suites, context, file, skips, mocha) {
  var it = function(title, fn) {
    var suite = suites[0];
    if (suite.isPending() || skips.indexOf(title) > -1) {
      fn = null;
      if (skips.indexOf(title) > -1) title = '** SKIPPED BY LB-BDD ** ' + title;
    }
    var test = new Test(title, fn);
    test.file = file;
    suite.addTest(test);
    return test;
  };

  return {
    describe: function(title, fn) {
      var pending = false;

      if (skips.indexOf(title) > -1) {
        pending = true;
        title = '** SKIPPED BY LB-BDD ** ' + title;
      }

      var suite = Suite.create(suites[0], title);
      suite.pending = suite.pending || pending;

      suite.file = file;
      suites.unshift(suite);
      fn.call(suite);
      suites.shift();
      return suite;
    },

    xdescribe: function(title, fn) {
      var suite = Suite.create(suites[0], title);
      suite.pending = true;
      suites.unshift(suite);
      fn.call(suite);
      suites.shift();
    },

    describeOnly: function(title, fn) {
      var suite = context.describe(title, fn);
      mocha.grep(suite.fullTitle());
      return suite;
    },

    it: it,

    itOnly: function(title, fn) {
      var test = it(title, fn);
      var reString = '^' + escapeRe(test.fullTitle()) + '$';
      mocha.grep(new RegExp(reString));
      return test;
    },

    xit: function(title) {
      it(title);
    },

    itRetries: function(n) {
      context.retries(n);
    }
  }
}
