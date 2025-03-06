# def classFinder(python_file):
#     classes = []

#     with open(python_file, "r") as file:
#         python_code = file.read()

#     lines = python_code.split("\n")
#     for line in lines:
#         parts = line.split()
#         if("class" in parts):
#             if(len(parts) > 1):
#                 class_name = parts[1].split("(")[0]
#             classes.append(class_name)
#     return classes
    
def classFinder(python_code):
    classes = []
    lines = python_code.split("\n")
    for line in lines:
        parts = line.split()
        if "class" in parts:
            if len(parts) > 1:
                class_name = parts[1].split("(")[0]
                classes.append(class_name)
    return classes
