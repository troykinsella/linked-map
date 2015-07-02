var assert = require('assert');
var fs = require('fs');
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

  it('should export in a non-node environment', function() {
    // TODO: is there a way to write this such that it will be picked up by the coverage report?

    var jsPath = require.resolve('../lib/linked-map');
    var js = fs.readFileSync(jsPath, 'utf-8');
    var fn = new Function(js);
    var root = {};
    fn.call(root);

    var lm = new root.LinkedMap();
    lm.push('key', 'value');
    assert.strictEqual('value', lm.remove('key'));
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

    it('should add one element to the head', function() {
      var lm = new LinkedMap();
      lm.unshift('key', 'value');
      assert.strictEqual('key', lm.headKey());
      assert.strictEqual('key', lm.tailKey());
    });

    it('should add two elements to the head', function() {
      var lm = new LinkedMap();
      lm.unshift('key', 'value');
      lm.unshift('key2', 'value2');
      assert.strictEqual('key2', lm.headKey());
      assert.strictEqual('key', lm.tailKey());
    });

    it('should add three elements to the head', function() {
      var lm = new LinkedMap();
      lm.unshift('key', 'value');
      lm.unshift('key2', 'value2');
      lm.unshift('key3', 'value3');
      assert.strictEqual('key3', lm.headKey());
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

    it('should add one element to the tail', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      assert.strictEqual('key', lm.headKey());
      assert.strictEqual('key', lm.tailKey());
    });

    it('should add two elements to the tail', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value2');
      assert.strictEqual('key', lm.headKey());
      assert.strictEqual('key2', lm.tailKey());
    });

    it('should add three elements to the tail', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value2');
      lm.push('key3', 'value3');
      assert.strictEqual('key', lm.headKey());
      assert.strictEqual('key3', lm.tailKey());
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

    it('should remove one element', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      assert.strictEqual('value', lm.remove('key'));
      assert.equal(0, lm.size());
    });

    it('should remove the head when two elements', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value2');
      assert.strictEqual('value', lm.remove('key'));
      assert.equal(1, lm.size());
    });

    it('should remove the head when three elements', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value2');
      lm.push('key3', 'value2');
      assert.strictEqual('value', lm.remove('key'));
      assert.equal(2, lm.size());
    });

    it('should remove the tail when two elements', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value2');
      assert.strictEqual('value2', lm.remove('key2'));
      assert.equal(1, lm.size());
    });

    it('should remove the tail when three elements', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');
      lm.push('key2', 'value2');
      lm.push('key3', 'value3');
      assert.strictEqual('value3', lm.remove('key3'));
      assert.equal(2, lm.size());
    });
  });

  describe('#each', function() {

    it('should call the callback with the supplied context', function() {
      var lm = new LinkedMap();
      lm.push('key', 'value');

      var ctx = {
        foo: false
      };

      lm.each(function(key, value) {
        this.foo = value;
      }, ctx);

      assert.strictEqual('value', ctx.foo);
    });

    it('should not call the callback when empty during forward iteration', function() {
      var lm = new LinkedMap();
      lm.each(function() {
        assert.fail();
      });
    });

    it('should forward iterate existing elements', function() {
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

    it('should break when false returned during forward iteration', function() {
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

    it('should not call the callback when empty during reverse iteration', function() {
      var lm = new LinkedMap();
      lm.each(true, function() {
        assert.fail();
      });
    });

    it('should reverse iterate existing elements', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      lm.push('key3', 'value3');

      var i = 3;
      lm.each(true, function(key, value) {
        assert.strictEqual('key' + i, key);
        assert.strictEqual('value' + i, value);
        i--;
      });
    });

    it('should break when false returned during reverse iteration', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      lm.push('key3', 'value3');

      var i = 3;
      lm.each(function(key, value) {
        if (i == 2) {
          return false;
        }
        i--;
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

  describe("#nextKey", function() {

    it('should return null when key does not exist', function() {
      var lm = new LinkedMap();
      assert.strictEqual(null, lm.nextKey('key1'));
    });

    it('should return null when no next exists', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      assert.strictEqual(null, lm.nextKey('key1'));
    });

    it('should return same key when one element and circular', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      assert.strictEqual('key1', lm.nextKey('key1', true));
    });

    it('should return the next key', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      assert.strictEqual('key2', lm.nextKey('key1'));
    });

    it('should return the first key for the last key and circular', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      assert.strictEqual('key1', lm.nextKey('key2', true));
    });

  });

  describe("#next", function() {

    it('should return null when key does not exist', function() {
      var lm = new LinkedMap();
      assert.strictEqual(null, lm.next('key1'));
    });

    it('should return null when no next exists', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      assert.strictEqual(null, lm.next('key1'));
    });

    it('should return same value when one element and circular', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      assert.strictEqual('value1', lm.next('key1', true));
    });

    it('should return the next value', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      assert.strictEqual('value2', lm.next('key1'));
    });

    it('should return the first value for the last key and circular', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      assert.strictEqual('value1', lm.next('key2', true));
    });

  });

  describe("#previousKey", function() {

    it('should return null when key does not exist', function() {
      var lm = new LinkedMap();
      assert.strictEqual(null, lm.previousKey('key1'));
    });

    it('should return null when no next exists', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      assert.strictEqual(null, lm.previousKey('key1'));
    });

    it('should return same key when one element and circular', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      assert.strictEqual('key1', lm.previousKey('key1', true));
    });

    it('should return the previous key', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      assert.strictEqual('key1', lm.previousKey('key2'));
    });

    it('should return the last key for the first key and circular', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      assert.strictEqual('key2', lm.previousKey('key1', true));
    });

  });

  describe("#previous", function() {

    it('should return null when key does not exist', function() {
      var lm = new LinkedMap();
      assert.strictEqual(null, lm.previous('key1'));
    });

    it('should return null when no next exists', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      assert.strictEqual(null, lm.previous('key1'));
    });

    it('should return same value when one element and circular', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      assert.strictEqual('value1', lm.previous('key1', true));
    });

    it('should return the previous value', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      assert.strictEqual('value1', lm.previous('key2'));
    });

    it('should return the last value for the first key and circular', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      assert.strictEqual('value2', lm.previous('key1', true));
    });

  });

  describe("#toObject", function() {

    it('should return an empty object when empty', function() {
      var lm = new LinkedMap();
      assert.deepEqual({}, lm.toObject());
    });

    it('should return an object containing existing entries', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      lm.push('key2', 'value2');
      assert.deepEqual({ key1: 'value1', key2: 'value2' }, lm.toObject());
    });
  });

  describe("#toString", function() {

    it('should return a string representation', function() {
      var lm = new LinkedMap();
      lm.push('key1', 'value1');
      assert.equal('LinkedMap[size=1]', lm.toString());
    });

  });
});

