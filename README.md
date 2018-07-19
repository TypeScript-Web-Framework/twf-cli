# twf-CLI
TypeScript Web Framework CLI


## Commands


### Start Project
```bash
# twf init [project]
twf init my-first-project
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
# twf add controller [name]
twf add controller index
```

### Add Action to Controller
```bash
# twf add action [property] [method] [controller] [route]
# twf add action [property] as [method] on [controller] with [route]
twf add action read get index /home
```

### Generate CRUD Controller
```bash
# twf add crud [controller]
twf add crud index
```

### Generate Test
```bash
twf test
```

### Generate Binary Package
```bash
twf package
```
