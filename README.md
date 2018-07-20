[![npm version](https://badge.fury.io/js/twf-cli.svg)](https://badge.fury.io/js/ts-web-framework)
[![dependencies Status](https://david-dm.org/olaferlandsen/twf-cli/status.svg)](https://david-dm.org/olaferlandsen/twf-cli)
[![Known Vulnerabilities](https://snyk.io/test/github/olaferlandsen/twf-cli/badge.svg?targetFile=package.json)](https://snyk.io/test/github/olaferlandsen/twf-cli?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/57e794f686735825e6d6/maintainability)](https://codeclimate.com/github/olaferlandsen/twf-cli/maintainability)
[![Documentation Status](https://readthedocs.org/projects/twf-cli/badge/?version=latest)](https://twf-cli.readthedocs.io/en/latest/?badge=latest)
[![Build Status](https://travis-ci.org/olaferlandsen/twf-cli.svg?branch=master)](https://travis-ci.org/olaferlandsen/twf-cli)

# twf-CLI
TypeScript Web Framework CLI


## Features
* [x] Create project
    * [x] Current Directory
    * [x] Own Directory
* [x] Generate API Controller
    * [x] Default CRUD
        * [x] @HttpPost `create()`
        * [x] @HttpGet `read()`
        * [x] @HttpPut `update()`
        * [x] @HttpDelete `delete()`
* [x] Remove API Controller
* [x] Verify project structure
    * [x] Verify existing `www`
    * [x] Verify existing `package.json`
    * [x] Verify existing `src`
    * [x] Verify existing `src/manifiest.json`
    * [x] Verify existing `src/controllers`
    * [x] Verify existing `src/annotations`
    * [x] Verify existing `src/core`
    * [x] Verify existing `src/app.ts`
    * [x] Verify existing `src/server.ts`
    * [x] Verify existing `src/typings.d.ts`
* [x] Version info & comparison
    * [x] CLI Version
    * [x] Project Version
    * [x] Node Version
    * [x] NPM Version
* [x] Clean project
    * [x] Remove `www`
    * [x] Remove `dist`
    * [x] Remove `temp`
    * [x] Remove `node_modules`
    * [x] Remove `package-lock.json`
* [x] Install dependencies
* [x] Serve project
* [ ] Generate http property on controller
* [ ] Remove http property on controller
* [x] Test Project(Unit Testing)
* [x] Build Project
* [x] Generate compiled binary package
    * [x] Windows
    * [x] Linux
    * [x] OSX

## Commands


### Start Project

To start a new project on current directory you don't need set project name
> **!IMPORTANT**
>
> twf-cli does not interpret `.` or `..`.

```bash
twf start
```

To start a new project on with a own directory you need set project name
```bash
twf start MyProject
```

### Clean Project
```bash
twf clean
```

### Install Dependencies
```bash
twf install
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
