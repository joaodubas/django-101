# Diary training log

Keep track of your daily aerobic trainings in this simple log.

## Installation

You will need `node.js` to run the test server and to install all the
dependencies of the project. The installation of `node.js` is beyond the scope
of this guide, if you don't have node installed, follow the [joyent
guide][node-install].

To verify if `node.js` is running, run the command:

```bash
$ node --version
```

If everything is ok, you should see something like:

```bash
v.0.10.3
```

To install the project dependencies, run the command:

```bash
$ npm install
```

To verify the installed packages, run the commands:

```bash
$ npm ls
$ bower ls
```

## Usage

You can start the test server using the command:

```bash
$ npm start
```

The server can be stopped by hitting `CTRL`+`C`.

### Components

The application is composed by several components. Those components comunicate
with each other via emit/listen events (as imposed by [flight][flight]).

#### `LogData`

Component responsible for the log manipulations, has methods responsibles for
create, remove and load log entries.

Emit the events:

1. `dataLogCreated` with an object containing the key `html` with the log entry
   rendered as html,
2. `dataLogUpdated` with an object containing the keys `_id` that represents
   the originalId and the `html` rendered entry.
3. `dataLogRemoved` with an object containing the key `_id` of the deleted
   entry.
4. `dataLogRefreshed` with an object containing the key `html` and all the log
   entries rendered as html.
5. `dataLogLoaded` with the loaded entry.

Listen to:

1. `uiCreateLogRequested` react emitting a `dataLogCreated`
2. `uiUpdateLogRequested` react emitting a `dataLogUpdated`
3. `uiRemoveLogRequested` react emitting a `dataLogRemoved`
4. `uiLoadLogRequested` react emitting a `dataLogLoaded`
5. `uiRefreshLogRequested` react emitting a `dataLogRefreshed`
6. `dataRefreshLogRequested` react emitting a `dataLogRefreshed`

#### `ReportData`

Component responsible for generate resumed information for the log entries.

Emit the events:

1. `dataReportCreated` with the statistical info for all the trainings.

Liste to:

1. `dataLogCreated` react emitting a `dataReportCreated`
2. `dataLogUpdated` react emitting a `dataReportCreated`
3. `dataLogRemoved` react emitting a `dataReportCreated`
4. `dataLogRefreshed` react emitting a `dataReportCreated`

#### `EntryUI`

Component responsible for controlling the form that allow the creation of a new
log entry.

Emit the events:

1. `uiCreateLogRequested` with an object containing the log data
2. `uiUpdateLogRequested` with an object containing the log data
3. `uiActivateTabRequested` with an object containing the key `key` and the tab
   to be changed.

Listen to:

1. `submit` of the form, react emitting a `uiActivateTabRequested` and
   `uiCreateLogRequested`
2. `dataLogLoaded` loads the passed data into a form for edition.

#### `EntryControlUI`

Component responsible for controlling the actions of a given log entry.

Emit the events:

1. `uiRemoveLogRequested` with the `\_id` of the entry to be removed.
2. `uiLoadLogRequested` with the `\_id` of the entry to be loaded.

Listen to:

1. `click` in the buttons emitting the events shown above.

#### `TableUI`

Component responsible for controlling the log entries presentation.

Emit the events:

1. `uiRefreshLogRequested` during the initialization process this event is sent
to load the content.

Listen to:

1. `dataLogRefreshed` refresh the node content with the passed info
2. `dataLogCreated` render the created entry
3. `dataLogUpdated` replace a node with the updated entry
4. `dataLogRemoved`remove a given node

#### `TabUI`

Component responsible for controlling the state of tab widgets.

Emit the events:

1. `uiTabChanged` with an object with the keys `button` and `content` containing
the id's of the activated nodes.

Listen to:

1. `click` on a button, react emitting a `uiTabChanged`
2. `uiActivateTabRequested` react emitting a `uiTabChanged`

## License

Copyright (c) 2013 João Paulo Dubas <joao.dubas@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[node-install]: https://github.com/joyent/node/wiki/Installation
[flight]: https://github.com/twitter/flight
