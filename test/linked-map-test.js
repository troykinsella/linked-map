var assert = require('assert');
var LinkedMap = require('../lib/linked-map');

describe('linked-map', function() {

  it('should have a predictable initialized state', function() {
    var lm = new LinkedMap();
    assert.strictEqual(0, lm.size());
    assert.strictEqual(null, lm.headKey());
    assert.strictEqual(null, lm.tailKey());
    assert.strictEqual(null, lm.head());
    assert.strictEqual(null, lm.tail());
    assert.deepEqual([], lm.keys());
    assert.deepEqual([], lm.values());
  });

  describe('#size', function() {

    it('should reflect the number of element', function() {
      var lm = new LinkedMap();
      assert.strictEqual(0, lm.size());
      lm.unshift('key', 'value');
      assert.strictEqual(1, lm.size());
      lm.push('key2', 'value2');
      assert.strictEqual(2, lm.size());
      lm.remove('key');
      assert.strictEqual(1, lm.size());
      lm.pop();
      assert.strictEqual(0, lm.size());
    });

  });

  describe('#get', function() {

    it('should return null for non-existent keys', function() {
      var lm = new LinkedMap();
      assert.strictEqual(null, lm.get('what the'));
    });

    it('should return the value for an existing key', function() {
      var lm = new LinkedMap();
      lm.unshift('key', 'value');
      assert.strictEqual('value', lm.get('key'));
    });

  });

  describe('#headKey', function() {

    it('should return return the head existing key', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value');
      assert.strictEqual('key', lm.headKey());
    });

  });

  describe('#tailKey', function() {

    it('should return return the tail existing single key', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      assert.strictEqual('key', lm.tailKey());
    });

    it('should return return the tail existing key', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value');
      assert.strictEqual('key2', lm.tailKey());
    });

  });

  describe('#head', function() {

    it('should return return the head existing value', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value2');
      assert.strictEqual('value', lm.head());
    });

  });

  describe('#tail', function() {

    it('should return return the tail existing single value', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      assert.strictEqual('value', lm.tail());
    });

    it('should return return the tail existing value', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value2');
      assert.strictEqual('value2', lm.tail());
    });

  });

  describe('#unshift', function() {

    it('should add elements to the head', function() {
      var lm = new LinkedMap();
      lm.unshift('key', 'value');
      lm.unshift('key2', 'value2');
      assert.strictEqual('key2', lm.headKey());
      assert.strictEqual('key', lm.tailKey());
    });

    it('should replace duplicates', function() {
      var lm = new LinkedMap();
      lm.unshift('key', 'value');
      lm.unshift('key', 'value2');
      assert.strictEqual('key', lm.headKey());
      assert.strictEqual('key', lm.tailKey());
      assert.strictEqual('value2', lm.head());
      assert.strictEqual('value2', lm.tail());
      assert.strictEqual(1, lm.size());
    });

  });

  describe('#push', function() {

    it('should add elements to the tail', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value2');
      assert.strictEqual('key', lm.headKey());
      assert.strictEqual('key2', lm.tailKey());
    });

    it('should replace duplicates', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key', 'value2');
      assert.strictEqual('key', lm.headKey());
      assert.strictEqual('key', lm.tailKey());
      assert.strictEqual('value2', lm.head());
      assert.strictEqual('value2', lm.tail());
      assert.strictEqual(1, lm.size());
    });

  });

  describe('#shift', function() {

    it('should return null when empty', function() {
      var lm = new LinkedMap();
      assert.strictEqual(null, lm.shift());
    });

    it('should remove the head element', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value2');
      assert.strictEqual('value', lm.shift());
      assert.strictEqual('value2', lm.shift());
      assert.strictEqual(null, lm.shift());
    });

  });

  describe('#pop', function() {

    it('should return null when empty', function() {
      var lm = new LinkedMap();
      assert.strictEqual(null, lm.pop());
    });

    it('should remove the tail element', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value2');
      assert.strictEqual('value2', lm.pop());
      assert.strictEqual('value', lm.pop());
      assert.strictEqual(null, lm.pop());
    });

  });

  describe('#remove', function() {

    it('should return null when not found', function() {
      var lm = new LinkedMap();
      assert.strictEqual(null, lm.remove('whatever'));
    });

    it('should return the value for the removed existing key', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value2');
      lm.push('key3', 'value3');
      assert.strictEqual('value2', lm.remove('key2'));
      assert.strictEqual('value', lm.remove('key'));
      assert.strictEqual('value3', lm.remove('key3'));
      assert.strictEqual(null, lm.remove('key2'));
      assert.strictEqual(null, lm.remove('key'));
      assert.strictEqual(null, lm.remove('key3'));
    });
  });

  describe('#each', function() {

    it('should not call the callback when empty', function() {
      var lm = new LinkedMap();
      lm.each(function() {
        assert.fail();
      });
    });

    it('should iterate existing elements', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      lm.push('key3', 'value3');

      var i = 1;
      lm.each(function(key, value) {
        assert.strictEqual('key' + i, key);
        assert.strictEqual('value' + i, value);
        i++;
      });
    });

    it('should break when false returned', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      lm.push('key3', 'value3');

      var i = 1;
      lm.each(function(key, value) {
        if (i == 2) {
          return false;
        }
        i++;
      });

      assert.strictEqual(2, i);
    });

  });

  describe('#clear', function() {

    it('should do nothing when empty', function() {
      var lm = new LinkedMap();
      lm.clear(); // Nothing thrown? I guess..
    });

    it('should clear all elements', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      lm.push('key3', 'value3');
      lm.clear();

      assert.strictEqual(0, lm.size());
      assert.strictEqual(null, lm.get('key1'));
      assert.strictEqual(null, lm.get('key2'));
      assert.strictEqual(null, lm.get('key3'));
    });
  });

  describe('#keys', function() {

    it('should return a list of existing keys in order', function() {
      var lm = new LinkedMap();
      lm.push('key2', 'value2');
      lm.unshift('key1', 'value1');
      lm.push('key3', 'value3');

      assert.deepEqual([ 'key1', 'key2', 'key3'], lm.keys());
    });

  });

  describe('#values', function() {

    it('should return a list of existing values in order', function() {
      var lm = new LinkedMap();
      lm.push('key2', 'value2');
      lm.unshift('key1', 'value1');
      lm.push('key3', 'value3');

      assert.deepEqual([ 'value1', 'value2', 'value3'], lm.values());
    });

  });

});

