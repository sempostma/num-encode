# num-encode

num-encode is a zero dependency 1kb module that converts javascript base 10 numbers
to utf-8 strings with any base up to the safe limit of 65535.

## Getting Started

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/num-encode@1.0.0/dist/num-encode.min.js"></script>
```

### NPM
```shell
npm i -S num-encode
```

## Usage

```javascript
const { encode, decode } = require('num-encode');
// or
import { encode, decode } from 'num-encode' // if you're using es6
// or
const { encode, decode } = window.numEncode; // if you're using a cdn

const encoded = encode(3123123123321, 256);
console.log(encoded);               // ╗×(¤ôy
console.log(decode(encoded, 256));  // 3123123123321
```
