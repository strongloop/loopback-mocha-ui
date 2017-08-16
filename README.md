# strong-mocha-interfaces
A custom Mocha BDD Interface that allows dynamic test skips via a global variable.

To skip a test, set the title of the `it` or `describe` test in an array string (It'll be parsed as an array automatically) stored in the environment variable `LOOPBACK_MOCHA_SKIPS`. Skipping a `describe` will skip all `it` tests under it. 

Skipped tests will be marked by `** SKIPPED BY LB-BDD **` in the Mocha run result.

## Example
`LOOPBACK_MOCHA_SKIPS='["test name", "describe test"]'`

If defining the global variable as part of a test script, be sure to convert `LOOPBACK_MOCHA_SKIPS` to a string to ensure test names are preserved as string. 

`LOOPBACK_MOCHA_SKIPS=JSON.stringify(['test name', 'describe test'])`

## Usage
```
npm install strong-mocha-interfaces
mocha --require strong-mocha-interfaces --ui strong-bdd
```
