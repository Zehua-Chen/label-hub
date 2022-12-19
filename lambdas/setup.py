from setuptools import setup, find_packages

setup(
    name="label_hub",
    packages=find_packages(),
    install_requires=["requests", "requests-aws4auth", "opensearchpy"],
)
