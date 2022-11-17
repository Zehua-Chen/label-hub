import sys


_vendor_added = False

__all__ = ["add_vendor_to_path"]


def add_vendor_to_path() -> None:
    global _vendor_added

    if _vendor_added:
        return

    _vendor_added = True
    sys.path.append("vendor")
