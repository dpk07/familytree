# Family Tree
A command line tool to build family tree.
## Running Family Tree locally
Family Tree system is a Node Js application.


```
git clone https://github.com/dpk07/familytree.git
cd familytree
npm install
npm start
```


## Working with Family Tree in your IDE

### Prerequisites
The following items should be installed in your system:
* Node 10 or newer.
* git command line tool (https://help.github.com/articles/set-up-git)

### Steps:

1) On the command line
    ```
    git clone https://github.com/dpk07/familytree.git
    ```
2) Inside VS Code
    ```
    File -> Open Folder -> familytree
    ```

    Run the application by running `npm start` in the console.


## Looking for something in particular?

| Important files  | Link                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------- |
| The Index File   | [index](https://github.com/dpk07/familytree/blob/master/index.ts)                     |
| Properties Files | [package.json](https://github.com/dpk07/familytree/blob/master/package.json)          |
| Unit Tests       | [service.test](https://github.com/dpk07/familytree/blob/master/Tests/Service.test.ts) |

## Relation types supported
husband, wife, partner, son, daughter, child, father, mother, parent


## Steps to create relationships
1. Select Option 1 to add a person.
2. Enter Person name and gender.
3. Select Option 1 to add another person.
4. Select Option 2 to create a relation type.
5. Enter one of the supported relation type.
6. Selection Option 3 to connection relations.
7. Enter the first person's name.
8. Enter the second person's name.
9. Enter the relation type which you have created.
    