def classFinder(python_code: str):
    classes = []
    lines = python_code.split("\n")

    for line in lines:
        parts = line.split()
        if "class" in parts:
            if len(parts) > 1:
                class_name = parts[1].split(":")[0]
                class_name = class_name.split("(")[0]
                classes.append(class_name)
    return classes
