# linked-map [![NPM version][npm-image]][npm-url]
> A linked map data structure for ordered iteration and fast random access.


## Install

### Node.js

```sh
$ npm install --save linked-map
```

### Vanilla JavaScript

Copy the distribution linked-map.js file into your project files, and include it as per usual:
```html
<script src="linked-map.js"></script>
```

## Usage

```js
> var LinkedMap = require('linked-map'); // Node.js

> var map = new LinkedMap();
> map.unshift('dogs', 2); // Add an entry to the front of the linked list
> map.unshift('monkeys', 1);
> map.push('cats', 4); // Add an entry to the end of the linked list
> map.push('dogs', 3);
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
> map.clear(); // Remove all entries
```

## Documentation

API documentation is available in the `docs/` directory of the installed module directory.

Please see source code and unit tests for more details.

## Contributing

Project source code is hosted on bitbucket: 
[home][home-url]

Git repository:
[scm][scm-url]

Feel free to submit pull requests!

### Reporting issues

Browse existing issues, and submit new issues here:
[issues-url][issues-url]

### Testing

Verify source code standards and run unit tests:
```
gulp test
```

## Roadmap

* Minified vanilla JavaScript distributable
* Publish to bower
* Reverse iteration
* Performance metrics

## License

MIT © [Troy Kinsella]()

[issues-url]: https://bitbucket.org/troykinsella/linked-map/issues
[scm-url]: git@bitbucket.org:troykinsella/linked-map.git
[home-url]: https://bitbucket.org/troykinsella/linked-map
[npm-image]: https://badge.fury.io/js/linked-map.svg
[npm-url]: https://npmjs.org/package/linked-map
