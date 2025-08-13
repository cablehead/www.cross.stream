## Quick Start

```bash
npm install
http-nu :3021 {|req| .static "www" $req.path}
dumbpipe listen-tcp --host 127.0.0.1:3021
```

Visit http://localhost:3021
