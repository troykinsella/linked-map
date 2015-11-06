# linked-map
> A linked map data structure for ordered iteration and fast random access.

[![NPM version][npm-image]][npm-url] [![Bower version][bower-image]][bower-url] [![Build Status][travis-image]][travis-url]

[![NPM](https://nodei.co/npm/linked-map.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/linked-map/)

## Install

### Node.js

```sh
$ npm install --save linked-map
```

### Bower

```sh
$ bower install --save linked-map
```

### Manual

Copy the distribution linked-map.js file into your project files, and include it as per usual:
```html
<script src="linked-map.js"></script>
```

## Usage

```js
> var LinkedMap = require('linked-map'); // Node.js
// window.LinkedMap is published in the browser

> var map = new LinkedMap();
> map.unshift('dogs', 2); // Add an entry to the front of the linked list
> map.unshift('monkeys', 1);
> map.push('cats', 4); // Add an entry to the end of the linked list
> map.push('dogs', 3); // Update an existing entry without changing entry order. Use remove() first to update and change order.
> map.get('dogs'); // Get the value for a key
3
> map.head(); // Get the first value in the linked list
1
> map.headKey(); // Get the first key in the linked list
'monkeys'
> map.tail(); // Get the last value in the linked list
4
> map.tailKey(); // Get the last key in the linked list
'cats'
> map.size(); // Get the number of entries stored
3
> map.keys(); // Get an in-order list of keys known to the structure
[ 'monkeys', 'dogs', 'cats' ]
> map.values(); // Get an in-order list of values known to the structure
[ 1, 3, 4 ]
> map.nextKey('cats'); // Get the key following the given key in the linked list, if any
null
> map.nextKey('cats', true /* circular */); // Get the key following the given key, wrapping to the front if at the end
'monkeys'
> map.previous('dogs'); // Get the value of the entry prior to the given key in the linked list, if any
1
> map.each(function(key, value) { // Iterate the entries in the linked list in order
  console.log(key + ' = ' + value);
});
monkeys = 1
dogs = 3
cats = 4
> map.shift(); // Get and remove the first value in the linked list
1
> map.pop(); // Get and remove the last value in the linked list
4
> map.remove('dogs'); // Remove the entry for the specified key and return the value.
3
> map.clear(); // Remove all entries
```

## Documentation

API documentation is available in the `docs/` directory of the installed module directory.

Please see source code and unit tests for more details.

## Contributing

Project source code is hosted on bitbucket: 
[https://bitbucket.org/troykinsella/linked-map](https://bitbucket.org/troykinsella/linked-map)

Git repository:
git@bitbucket.org:troykinsella/linked-map.git

Feel free to submit pull requests!

### Reporting issues

Browse existing issues, and submit new issues here:
[https://bitbucket.org/troykinsella/linked-map/issues](https://bitbucket.org/troykinsella/linked-map/issues)

### Testing

Verify source code standards and run unit tests:
```
gulp test
```

## Roadmap

* Minified vanilla JavaScript distributable
* Performance metrics

## License

MIT © [Troy Kinsella]()

[npm-image]: https://badge.fury.io/js/linked-map.svg
[npm-url]: https://npmjs.org/package/linked-map
[bower-image]: https://badge.fury.io/bo/linked-map.svg
[bower-url]: https://github.com/troykinsella/linked-map
[travis-image]: https://travis-ci.org/troykinsella/linked-map.svg?branch=master
[travis-url]: https://travis-ci.org/troykinsella/linked-map

