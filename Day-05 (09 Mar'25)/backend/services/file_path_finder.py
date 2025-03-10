from pathlib import Path

def PathFinder(filename: str, uploaded_dir: str):
    return Path(uploaded_dir) / filename