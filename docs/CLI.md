# Usage

## Create a new project
This command create a new project on a new folder with `camelized` project name.
> **IMPORTANT!**
> If the project alread exists, this command can't overwrite this.

`twf start [project name]`

## Create a new controller
This command create a new empty controller.

`twf add controller [name] [default route]`

## Create a new CRUD controller
This command create a new controller with CRUD properties like `create`, `read`, `update` and `delete`

`twf add crud [controller name]`

## Append new property to controller
This command append a new http property to you controller.
> IMPORTANT!
> This command can't create a new controller.

`twf add http [property] [method] [controller] [route]`

## Verify project
This command verify if the current project is valid, checking structure and checksum.

`twf verify`

## Test project
Test the current project.

`twf test`

## Packing project as binary single file
This command create a single binary file for Windows, Linux or OSX.

`twf package`

## Serve project

`twf serve`

## Get Information & Version

`twf info`
