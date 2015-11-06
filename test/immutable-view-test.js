"use strict";

var assert = require('assert');
var LinkedMap = require('../lib/linked-map');

describe('immutable-view', function() {

  it('should have a predictable initialized state', function() {
    var lm = new LinkedMap();
    var v = lm.immutableView();
    assert.strictEqual(0, v.size());
    assert.strictEqual(null, v.headKey());
    assert.strictEqual(null, v.tailKey());
    assert.strictEqual(null, v.head());
    assert.strictEqual(null, v.tail());
    assert.deepEqual([], v.keys());
    assert.deepEqual([], v.values());
  });

  it('should error on mutating operations', function() {
    var lm = new LinkedMap();
    var v = lm.immutableView();

    [
      'unshift',
      'push',
      'shift',
      'pop',
      'remove',
      'clear'
    ].forEach(function(m) {
        assert.throws(function() {
          v[m]();
        });
      });
  });

});
