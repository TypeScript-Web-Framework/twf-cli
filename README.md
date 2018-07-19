# twf-CLI
TypeScript Web Framework CLI


## Features
* [x] Generate controller
* [ ] Remove controller
* [x] Verify project structure
* [ ] Clean project
    * [ ] Remove `www`
    * [ ] Remove `node_modules`
    * [ ] Remove `package-lock.json`
* [ ] Install dependencies
* [ ] Serve project
* [ ] Generate http property on controller
* [ ] Remove http property on controller
* [ ] Generate compiled binary package

## Commands


### Start Project
```bash
# twf start [project]
twf start my-first-project
```

### Clean Project
```bash
twf clean
```

### Verify Project 
```bash
twf verify
```

### Serve
```bash
# twf serve [port]
twf serve 8080
```

### Generate Controller
```bash
# twf add controller [name] [default route]
twf add controller index
twf add controller index /profile/:id
twf add controller main/index /profile/:id
```
