import json

from . import handler


def main() -> None:
    response = handler(None, None)
    print(json.dumps(response))


if __name__ == "__main__":
    main()
