import readline from "readline";
import { Service } from "./Interfaces";
import Person from "./Models/Person";
/**
 * Function that keeps asking for next input in the console.
 */
export default function commandLineRunner(service: Service) {
  askForNextInput();
  function askForNextInput() {
    rl.question(
      `Select a choice
1.Add a person.
2.Add a relationship.
3.Connect relationship.
4.Count Sons.
5.Count all daughters.
6.List all people.
Anything else to exit.
Enter your choice
`,
      function (option) {
        console.clear();
        switch (option) {
          case "1": {
            rl.question("Enter the persons name.\n", (name) => {
              console.clear();
              rl.question("Enter the persons gender.\n", (gender) => {
                console.clear();
                try {
                  service.addPerson(new Person(name, gender));
                  console.log(`Person ${name} added successfully`);
                } catch (e) {
                  logError(e);
                }
                askForNextInput();
              });
            });
            break;
          }
          case "2": {
            rl.question("Enter the relationship name.\n", (name) => {
              console.clear();
              try {
                service.addRelationship(name);
                console.log(`Relationship ${name} added successfully`);
              } catch (e) {
                logError(e);
              }
              askForNextInput();
            });
            break;
          }
          case "3": {
            rl.question("Enter the first person to connect.\n", (firstName) => {
              console.clear();
              rl.question(
                "Enter the second person to connect.\n",
                (secondName) => {
                  console.clear();
                  rl.question(
                    "Enter the type of relationship between them.\n",
                    (relationship) => {
                      console.clear();
                      try {
                        service.setRelationship(
                          firstName,
                          secondName,
                          relationship
                        );
                        console.log(
                          `${firstName} connected as ${relationship} of ${secondName}`
                        );
                      } catch (e) {
                        logError(e);
                      }
                      askForNextInput();
                    }
                  );
                }
              );
            });
            break;
          }
          case "4": {
            rl.question("Enter the person's name.\n", (name) => {
              console.clear();
              try {
                const suns: String[] = service.findSons(name);
                console.log(suns);
                console.log("Count is " + suns.length);
              } catch (e) {
                logError(e);
              }
              askForNextInput();
            });
            break;
          }
          case "5": {
            rl.question("Enter the person's name.\n", (name) => {
              console.clear();
              try {
                const daughters: String[] = service.findAllDaughters(name);
                console.log(daughters);
                console.log("Count is " + daughters.length);
              } catch (e) {
                logError(e);
              }
              askForNextInput();
            });
            break;
          }
          case "6": {
            console.clear();
            try {
              const people: String[] = service.getAllPeople();
              people.map((elem, index) => {
                console.log(`${index + 1}.${elem}`);
              });
              console.log("");
              console.log("");
            } catch (e) {
              logError(e);
            }
            askForNextInput();
            break;
          }
          default: {
            process.exit();
          }
        }
      }
    );
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("close", function () {
  process.exit(0);
});

function logError(e) {
  console.log("Sorry! Error Occured: " + e.message + "\n");
}
