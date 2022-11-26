# Dependencies

Install dependencies into `vendor/` folder.

```
pip install --target vendor/
```

Lambdas will have their `PYTHONPATH` environment variable configured to
`/var/task/vendor/` so that Python can load dependencies from `vendor/`

# Functions

## `test_cloud`

Run tests that can only be run in the cloud
