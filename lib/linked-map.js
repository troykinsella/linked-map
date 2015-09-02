;(function(root) {
  "use strict";

  /**
   *
   * @param map
   * @constructor
   */
  function ImmutableView(map) {
    this._map = map;
  };

  var readOnlyMethods = [
    'size',
    'get',
    'headKey',
    'head',
    'tailKey',
    'tail',
    'each',
    'nextKey',
    'next',
    'previousKey',
    'previous',
    'keys',
    'values',
    'toObject',
    'toString'
  ];

  var writeMethods = [
    'unshift',
    'push',
    'shift',
    'pop',
    'remove',
    'clear'
  ];

  readOnlyMethods.forEach(function(m) {
    ImmutableView.prototype[m] = function() {
      var args = Array.prototype.slice.apply(arguments);
      return this._map[m].apply(this._map, args);
    };
  });

  function attemptedWrite() {
    throw new Error("Cannot write to an immutable view of LinkedMap");
  };

  writeMethods.forEach(function(m) {
    ImmutableView.prototype[m] = attemptedWrite;
  });

  /**
   *
   * @return {ImmutableView}
   */
  ImmutableView.prototype.immutableView = function() {
    return this;
  };

  /**
   * Create a LinkedMap structure. A LinkedMap stores entries internally both in a
   * map and a linked list which allows predictable ordering as well as fast random access.
   * @constructor
   */
  function LinkedMap() {
    this.clear();
  }

  /**
   * Add an entry to the internal map and linked list.
   * @param key The key to add.
   * @param value The value to add.
   * @returns {*} The link element if created, or <tt>null</tt> if the key already existed in the internal map.
   * @private
   */
  LinkedMap.prototype._add = function(key, value) {
    var link = this._map[key];
    if (link) {
      link.value = value;
      return null;
    }

    link = {
      key: key,
      value: value,
      next: null,
      prev: null
    };
    this._map[key] = link;
    this._size++;
    return link;
  };

  /**
   * Obtain the number of elements in the LinkedMap.
   * @returns {number} The number of elements.
   */
  LinkedMap.prototype.size = function() {
    return this._size;
  };

  /**
   * Lookup the value associated with the given <tt>key</tt>.
   * @param key The key for which to return the value.
   * @returns {*|null} The value if it exists, or <tt>null</tt> if it does not.
   */
  LinkedMap.prototype.get = function(key) {
    return (this._map[key] || {}).value || null;
  };

  /**
   * Get the first key in the linked list.
   * @returns {*|null} The first key, or <tt>null</tt> if the structure is empty.
   */
  LinkedMap.prototype.headKey = function() {
    return (this._head || {}).key || null;
  };

  /**
   * Get the last key in the linked list.
   * @returns {*|null} The last key, or <tt>null</tt> if the structure is empty.
   */
  LinkedMap.prototype.tailKey = function() {
    return (this._tail || this._head || {}).key || null;
  };

  /**
   * Get the first value in the linked list.
   * @returns {*|null} The first value, or <tt>null</tt> if the structure is empty.
   */
  LinkedMap.prototype.head = function() {
    return (this._head || {}).value || null;
  };

  /**
   * Get the last value in the linked list.
   * @returns {*|null} The last value, or <tt>null</tt> if the structure is empty.
   */
  LinkedMap.prototype.tail = function() {
    return (this._tail || this._head || {}).value || null;
  };

  /**
   * Prepend the given key-value pair to the front of the linked list.
   * @param key The key to prepend.
   * @param value The value to prepend.
   */
  LinkedMap.prototype.unshift = function(key, value) {
    var link = this._add(key, value);
    if (link) {
      if (!this._head) {
        this._head = link;
      } else if (!this._tail) {
        this._tail = this._head;
        this._head = link;
        this._head.next = this._tail;
        this._tail.prev = this._head;
      } else {
        link.next = this._head;
        this._head.prev = link;
        this._head = link;
      }
    }
  };

  /**
   * Append the given key-value pair to the end of the linked list.
   * @param key The key to append.
   * @param value The value to append.
   */
  LinkedMap.prototype.push = function(key, value) {
    var link = this._add(key, value);
    if (link) {
      if (!this._head) {
        this._head = link;
      } else if (!this._tail) {
        this._tail = link;
        this._tail.prev = this._head;
        this._head.next = this._tail;
      } else {
        this._tail.next = link;
        link.prev = this._tail;
        this._tail = link;
      }
    }
  };

  /**
   * Remove the given link from the linked list and map.
   * @param link The link to remove.
   * @returns {*} The value of the removed link, or <tt>null</tt> if the link is <tt>null</tt>.
   * @private
   */
  LinkedMap.prototype._remove = function(link) {
    if (!link || !this._head) {
      return null;
    }

    // Remove from the map
    delete this._map[link.key];
    this._size--;

    if (link === this._head) { // First
      if (!this._tail) {
        this._head = null;
      } else if (this._head.next === this._tail) {
        this._head.next = this._tail.prev = null;
        this._head = this._tail;
        this._tail = null;
      } else {
        this._head = this._head.next;
        this._head.prev = null;
      }
    } else if (link === this._tail) { // Last
      if (this._head.next == this._tail) {
        this._tail.prev = this._head.next = this._tail = null;
      } else {
        this._tail = this._tail.prev;
        this._tail.next = null;
      }
    } else { // Middle
      link.prev.next = link.next;
      link.next.prev = link.prev;
    }

    // Sever the links to give the garbage collector a break
    link.next = link.prev = null;
    return link.value;
  };

  /**
   * Obtain and remove the first value from the linked list.
   * @returns {*|null} The first value removed, or <tt>null</tt> if the structure is empty.
   */
  LinkedMap.prototype.shift = function() {
    return this._remove(this._head);
  };

  /**
   * Obtain and remove the last value from the linked list.
   * @returns {*|null} The last value removed, or <tt>null</tt> if the structure is empty.
   */
  LinkedMap.prototype.pop = function() {
    return this._remove(this._tail || this._head);
  };

  /**
   * Remove the entry for the given <tt>key</tt>.
   * @param key The key for which to remove the entry.
   * @returns {*|null} The value associated with the given <tt>key</tt>, or <tt>null</tt> if <tt>key</tt> does not exist.
   */
  LinkedMap.prototype.remove = function(key) {
    return this._remove(this._map[key]);
  };

  /**
   * Iterate through each entry in the LinkedMap.
   * @param reverse {boolean} An optional flag to reverse the direction of the iteration.
   * @param callback {Function} The required callback function that will be invoked for each entry.
   *        It receives the key and the value as parameters.
   *        To break out of the loop, return <tt>false</tt>.
   * @param context {Object} The optional context with which to call the callback. Effectively, the value of <tt>this</tt>.
   *
   * @example
   * var lm = new LinkedMap();
   * lm.push('key1', 'value1');
   * lm.push('key2', 'value2');
   * lm.push('key3', 'value3');
   *
   * lm.each(function(key, value) {
   *   console.log(value);
   * });
   * // Prints: 'value1', 'value2', 'value3'
   */
  LinkedMap.prototype.each = function(reverse, callback, context) {
    // If reverse is omitted, shift the parameter names
    if (typeof reverse === 'function') {
      context = callback;
      callback = reverse;
      reverse = false;
    }

    var link = reverse ? (this._tail || this._head) : this._head;
    while (link) {
      if (callback.call(context, link.key, link.value) === false) {
        break;
      }
      link = reverse ? link.prev : link.next;
    }
  };

  /**
   * Obtain the next key in the linked list for the given <tt>key</tt>.
   * @param key The key for which to return the next key.
   * @param circular {Boolean} Optionally supply <tt>true</tt> to treat the linked list circularly.
   *        Defaults to <tt>false</tt>.
   * @returns {*} The next key, or <tt>null</tt> if the given key was not found or
   *          the given key is the last in the linked list and <tt>circular</tt> is <tt>false</tt>.
   */
  LinkedMap.prototype.nextKey = function(key, circular) {
    var link = this._map[key];
    if (!link) {
      return null;
    }

    link = link.next;
    if (link) {
      return link.key;
    }

    if (circular && this._head) {
      return this._head.key;
    }

    return null;
  };

  /**
   * Obtain the next value in the linked list for the given <tt>key</tt>.
   * @param key The key for which to return the next value.
   * @param circular {Boolean} Optionally supply <tt>true</tt> to treat the linked list circularly.
   *        Defaults to <tt>false</tt>.
   * @returns {*} The next value, or <tt>null</tt> if the given key was not found or
   *          the given key is the last in the linked list and <tt>circular</tt> is <tt>false</tt>.
   */
  LinkedMap.prototype.next = function(key, circular) {
    return this.get(this.nextKey(key, circular));
  };

  /**
   * Obtain the previous key in the linked list for the given <tt>key</tt>.
   * @param key The key for which to return the previous key.
   * @param circular {Boolean} Optionally supply <tt>true</tt> to treat the linked list circularly.
   *        Defaults to <tt>false</tt>.
   * @returns {*} The previous key, or <tt>null</tt> if the given key was not found or
   *          the given key is the last in the linked list and <tt>circular</tt> is <tt>false</tt>.
   */
  LinkedMap.prototype.previousKey = function(key, circular) {
    var link = this._map[key];
    if (!link) {
      return null;
    }

    link = link.prev;
    if (link) {
      return link.key;
    }

    if (circular && (this._tail || this._head)) {
      return (this._tail || this._head).key;
    }

    return null;
  };

  /**
   * Obtain the previous value in the linked list for the given <tt>key</tt>.
   * @param key The key for which to return the previous value.
   * @param circular {Boolean} Optionally supply <tt>true</tt> to treat the linked list circularly.
   *        Defaults to <tt>false</tt>.
   * @returns {*} The previous value, or <tt>null</tt> if the given key was not found or
   *          the given key is the last in the linked list and <tt>circular</tt> is <tt>false</tt>.
   */
  LinkedMap.prototype.previous = function(key, circular) {
    return this.get(this.previousKey(key, circular));
  };

  /**
   * Remove all entries from the LinkedMap.
   */
  LinkedMap.prototype.clear = function() {
    this._map = {};
    this._size = 0;
    this._head = null;
    this._tail = null;
  };

  /**
   * Obtain a list of all keys known to the LinkedMap, in order.
   * @returns {Array} The list of keys.
   */
  LinkedMap.prototype.keys = function() {
    var keys = [];
    this.each(function(key) {
      keys.push(key);
    });
    return keys;
  };

  /**
   * Obtain a list of all values known to the LinkedMap, in order.
   * @returns {Array}
   */
  LinkedMap.prototype.values = function() {
    var values = [];
    this.each(function(key, value) {
      values.push(value);
    });
    return values;
  };

  /**
   * Creates a view of this structure that throws an error upon any operation that modifies
   * internal state.
   * @returns {LinkedMap}
   */
  LinkedMap.prototype.immutableView = function() {
    return new ImmutableView(this);
  };

  /**
   * Create an object having a property for each key-value pair in the LinkedMap.
   * @returns {Object}
   */
  LinkedMap.prototype.toObject = function() {
    var result = {};
    this.each(function(key, value) {
      result[key] = value;
    });
    return result;
  };

  /**
   * Obtain the string representation of the LinkedMap.
   */
  LinkedMap.prototype.toString = function() {
    return "LinkedMap[size=" + this.size() + "]";
  };

  // Export
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = LinkedMap;
  } else {
    root.LinkedMap = LinkedMap;
  }

})(this);
