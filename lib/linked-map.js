
function LinkedMap() {
  this.clear();
}

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

LinkedMap.prototype.size = function() {
  return this._size;
};

LinkedMap.prototype.get = function(key) {
  return (this._map[key] || {}).value || null;
};

LinkedMap.prototype.headKey = function() {
  return (this._head || {}).key || null;
};

LinkedMap.prototype.tailKey = function() {
  return (this._tail || this._head || {}).key || null;
};

LinkedMap.prototype.head = function() {
  return (this._head || {}).value || null;
};

LinkedMap.prototype.tail = function() {
  return (this._tail || this._head || {}).value || null;
};

LinkedMap.prototype.addToHead = function(key, value) {
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

LinkedMap.prototype.addToTail = function(key, value) {
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

LinkedMap.prototype.removeHead = function() {
  return this._remove(this._head);
};

LinkedMap.prototype.removeTail = function() {
  return this._remove(this._tail || this._head);
};

LinkedMap.prototype.remove = function(key) {
  return this._remove(this._map[key]);
};

LinkedMap.prototype.each = function(callback, context) {
  var link = this._head;
  while (link) {
    if (callback.call(context, link.key, link.value) === false) {
      break;
    }
    link = link.next;
  }
};

LinkedMap.prototype.clear = function() {
  this._map = {};
  this._size = 0;
  this._head = null;
  this._tail = null;
};

LinkedMap.prototype.keys = function() {
  var keys = [];
  this.each(function(key) {
    keys.push(key);
  });
  return keys;
};

LinkedMap.prototype.values = function() {
  var values = [];
  this.each(function(key, value) {
    values.push(value);
  });
  return values;
};

if (module) {
  module.exports = LinkedMap;
} else {
  window.LinkedMap = LinkedMap;
}
