# twf-CLI
TypeScript Web Framework CLI


## Features
* [x] Generate controller
* [x] Remove controller
* [x] Verify project structure
* [x] Clean project
    * [x] Remove `www`
    * [x] Remove `dist`
    * [x] Remove `temp`
    * [x] Remove `node_modules`
    * [x] Remove `package-lock.json`
* [ ] Install dependencies
* [x] Serve project
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
twf serve
```

### Generate Controller
```bash
# twf add controller [name] [default route]
twf add controller index
twf add controller index /profile/:id
twf add controller main/index /profile/:id
```
