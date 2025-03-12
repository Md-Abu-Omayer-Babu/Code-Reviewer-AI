def funcUnderClass(python_code: str):
    functions = {"Global_Functions": []}
    current_class = "Global_Functions"
    
    lines = python_code.split("\n")
    
    for line in lines:
        stripped_line = line.lstrip()
        indentation_level = len(line) - len(stripped_line)
        
        if stripped_line.startswith("class "):
            class_name = stripped_line.split()[1].split("(")[0].split(":")[0]
            current_class = class_name
            functions[current_class] = []
        
        elif stripped_line.startswith("def "):
            function_name = stripped_line.split()[1].split("(")[0]
            
            if indentation_level == 0:  # Function is at the global level
                functions["Global_Functions"].append(function_name)
            else:
                functions[current_class].append(function_name)
    
    return functions

sample_code = """
class Animal:
    def display(self):
        print("I am an animal.")

class Dog:
    def speak(self):
        print("Bark!")
"""

print(funcUnderClass(sample_code))
