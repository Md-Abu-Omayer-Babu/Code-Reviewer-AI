def functionFinder(python_code: str):
    functions = []
    lines = python_code.split("\n")
    
    for line in lines:
        parts = line.split()
        if "def" in parts:
            if len(parts) > 1:
                function_name = parts[1].split("(")[0]  # Extract function name correctly
                functions.append(function_name)
    return functions
