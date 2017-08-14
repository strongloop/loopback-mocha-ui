# loopback-mocha-ui
A custom Mocha BDD Interface that allows dynamic test skips via a global variable.

To skip a test, set the title of the `it` or `describe` test in an array stored in the environment variable `LOOPBACK_MOCHA_SKIPS`. Skipping a `describe` will skip all `it` tests under it. 

Skipped tests will be marked by `** SKIPPED BY LB-BDD **` in the Mocha run result.

## Example
`LOOPBACK_MOCHA_SKIPS=['test name', 'describe test']`

## Usage
```
npm install loopback-mocha-ui
mocha --require loopback-mocha-ui --ui lb-bdd
```
