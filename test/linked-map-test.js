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
  });

  describe('#size', function() {

    it('should reflect the number of element', function() {
      var lm = new LinkedMap();
      assert.strictEqual(0, lm.size());
      lm.addToHead('key', 'value');
      assert.strictEqual(1, lm.size());
      lm.addToTail('key2', 'value2');
      assert.strictEqual(2, lm.size());
      lm.remove('key');
      assert.strictEqual(1, lm.size());
      lm.removeTail();
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
      lm.addToHead('key', 'value');
      assert.strictEqual('value', lm.get('key'));
    });

  });

  describe('#headKey', function() {

    it('should return return the head existing key', function() {
      var lm = new LinkedMap();
      lm.addToTail('key', 'value');
      lm.addToTail('key2', 'value');
      assert.strictEqual('key', lm.headKey());
    });

  });

  describe('#tailKey', function() {

    it('should return return the tail existing single key', function() {
      var lm = new LinkedMap();
      lm.addToTail('key', 'value');
      assert.strictEqual('key', lm.tailKey());
    });

    it('should return return the tail existing key', function() {
      var lm = new LinkedMap();
      lm.addToTail('key', 'value');
      lm.addToTail('key2', 'value');
      assert.strictEqual('key2', lm.tailKey());
    });

  });

  describe('#head', function() {

    it('should return return the head existing value', function() {
      var lm = new LinkedMap();
      lm.addToTail('key', 'value');
      lm.addToTail('key2', 'value2');
      assert.strictEqual('value', lm.head());
    });

  });

  describe('#tail', function() {

    it('should return return the tail existing single value', function() {
      var lm = new LinkedMap();
      lm.addToTail('key', 'value');
      assert.strictEqual('value', lm.tail());
    });

    it('should return return the tail existing value', function() {
      var lm = new LinkedMap();
      lm.addToTail('key', 'value');
      lm.addToTail('key2', 'value2');
      assert.strictEqual('value2', lm.tail());
    });

  });

  describe('#addToHead', function() {

    it('should add elements to the head', function() {
      var lm = new LinkedMap();
      lm.addToHead('key', 'value');
      lm.addToHead('key2', 'value2');
      assert.strictEqual('key2', lm.headKey());
      assert.strictEqual('key', lm.tailKey());
    });

  });

  describe('#addToTail', function() {

    it('should add elements to the tail', function() {
      var lm = new LinkedMap();
      lm.addToTail('key', 'value');
      lm.addToTail('key2', 'value2');
      assert.strictEqual('key', lm.headKey());
      assert.strictEqual('key2', lm.tailKey());
    });

  });

  describe('#removeHead', function() {

    it('should return null when empty', function() {
      var lm = new LinkedMap();
      assert.strictEqual(null, lm.removeHead());
    });

    it('should remove the head element', function() {
      var lm = new LinkedMap();
      lm.addToTail('key', 'value');
      lm.addToTail('key2', 'value2');
      assert.strictEqual('value', lm.removeHead());
      assert.strictEqual('value2', lm.removeHead());
      assert.strictEqual(null, lm.removeHead());
    });

  });

  describe('#removeTail', function() {

    it('should return null when empty', function() {
      var lm = new LinkedMap();
      assert.strictEqual(null, lm.removeTail());
    });

    it('should remove the tail element', function() {
      var lm = new LinkedMap();
      lm.addToTail('key', 'value');
      lm.addToTail('key2', 'value2');
      assert.strictEqual('value2', lm.removeTail());
      assert.strictEqual('value', lm.removeTail());
      assert.strictEqual(null, lm.removeTail());
    });

  });

  describe('#remove', function() {

    it('should return null when not found', function() {
      var lm = new LinkedMap();
      assert.strictEqual(null, lm.remove('whatever'));
    });

    it('should return the value for the removed existing key', function() {
      var lm = new LinkedMap();
      lm.addToTail('key', 'value');
      lm.addToTail('key2', 'value2');
      lm.addToTail('key3', 'value3');
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
      lm.addToTail('key1', 'value1');
      lm.addToTail('key2', 'value2');
      lm.addToTail('key3', 'value3');

      var i = 1;
      lm.each(function(key, value) {
        assert.strictEqual('key' + i, key);
        assert.strictEqual('value' + i, value);
        i++;
      });
    });

    it('should break when false returned', function() {
      var lm = new LinkedMap();
      lm.addToTail('key1', 'value1');
      lm.addToTail('key2', 'value2');
      lm.addToTail('key3', 'value3');

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
      lm.addToTail('key1', 'value1');
      lm.addToTail('key2', 'value2');
      lm.addToTail('key3', 'value3');
      lm.clear();

      assert.strictEqual(0, lm.size());
      assert.strictEqual(null, lm.get('key1'));
      assert.strictEqual(null, lm.get('key2'));
      assert.strictEqual(null, lm.get('key3'));
    });
  });

});

