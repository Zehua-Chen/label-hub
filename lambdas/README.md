# Dependencies

Install dependencies into `vendor/` folder.

```
pip install --target vendor/
```

In Python code, add /var/task/vendor to `sys.path`

```py
import sys
sys.path.append("/var/task/vendor")
```

# Functions

## `test_cloud`

Run tests that can only be run in the cloud
