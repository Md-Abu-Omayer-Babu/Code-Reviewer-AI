def classFinder(python_file):
    # convert python_file to string
    python_code = str(python_file)
    classes = []
    class_name = ""
    i = 0
    while i < len(python_code) - 4:
        if python_code[i] == "c" and python_code[i+1] == "l" and python_code[i+2] == "a" and python_code[i+3] == "s" and python_code[i+4] == "s":
            i += 5
            while i < len(python_code) and python_code[i] == " ":
                i += 1
            while i < len(python_code) and (python_code[i] != ":" and python_code[i] != "("):  # Collect class name until ':' or '('
                class_name += python_code[i]
                i += 1
            if class_name:  
                classes.append(class_name) 
            class_name = "" 
        else:
            i += 1  
    return classes