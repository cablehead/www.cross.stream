## Quick Start

```bash
npm install
cargo install m2h
eget mitsuhiko/minijinja --asset linux-musl -f minijinja-cli

cat serve.nu | http-nu :3021 -
dumbpipe listen-tcp --host 127.0.0.1:3021
```

locally:

```bash
dumbpipe connect-tcp --addr 127.0.0.1:3021 nodxxx
```

Visit http://localhost:3021
