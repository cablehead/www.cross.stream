Requires [http-nu](https://github.com/cablehead/http-nu) >= 0.10.2

## Quick Start

```nushell
do { cd www; cat serve.nu | http-nu :3021 - }
```

Visit http://localhost:3021

## Tests

```nushell
do { cd www; http-nu eval test.nu } | bat -l html
```
