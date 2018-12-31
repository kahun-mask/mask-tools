# base64-arraybuffer

Base64 encode and decode

Based on original [Base64URL-ArrayBuffer](https://github.com/herrjemand/Base64URL-ArrayBuffer) by [@herrjemand](https://github.com/herrjemand)

## Usage

```
import {
  encode,
  decode,
} from '@mask-tools/base64-arraybuffer';

const buffer: ArrayBuffer = new Uint8Array(32);

const encodeResult: string = encode(buffer);
const decodeResult: ArrauBuffer = decode(encodeResult);
```
