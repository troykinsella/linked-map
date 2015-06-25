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
> map.addToHead('dogs', 2);
> map.addToHead('monkeys', 1);
> map.addToTail('cats', 4);
> map.addToTail('dogs', 3)
> map.get('dogs');
3
> map.head();
1
> map.headKey();
'monkeys'
> map.tail();
4
> map.tailKey();
'cats'
> map.size()
3
> map.keys()
[ 'monkeys', 'dogs', 'cats' ]
> map.values()
[ 1, 3, 4 ]
> map.removeHead()
1
> map.removeTail()
4
> map.clear()
> map.size()
0
```

Please see the unit tests for more API details.

## Testing
```
gulp test
```

## License

MIT © [Troy Kinsella]()

[npm-image]: https://badge.fury.io/js/linked-map.svg
[npm-url]: https://npmjs.org/package/linked-map
