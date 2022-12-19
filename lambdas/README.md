# Dependencies

## Listing

Dependencies are listed in [`setup.py`](setup.py)

```py
from setuptools import setup, find_packages

setup(
    name="label_hub",
    packages=find_packages(),
    install_requires=["requests"],
)
```

## Installation

Install dependencies into `vendor/` folder.

```
pip install --target vendor/
```

## Loading

In Python code, add /var/task/vendor to `sys.path`

```py
import sys
sys.path.append("/var/task/vendor")
```

# Functions

## `test_cloud`

Run tests that can only be run in the cloud
