
import os

def removeExtension(name):
    return name.split('.')[0]

def to_camel_case(snake_str):
    components = snake_str.split('-')
    # We capitalize the first letter of each component except the first one
    # with the 'title' method and join them together.
    name = components[0] + ''.join(x.title() for x in components[1:])
    return removeExtension(name)

def importCommand(f):
    fileName = to_camel_case(f)
    path = "\'../assets/icons/${0}\'".format(f)
    command = "import {0} from {1};".format(fileName, path)
    print(command)

def exportCommand(f):
    fileName = to_camel_case(f)
    command = "\'{0}\': {1},".format(removeExtension(f), fileName)
    print(command)

files = [f for f in os.listdir('.') if os.path.isfile(f)]
for f in files:
    exportCommand(f)
    # do something