import "reflect-metadata";
import { Container, Service } from "../src";
@Service()
class SomeClass {
  someMethod() {
    console.log("wuhu");
  }
}

let someClass = Container.get(SomeClass);
// @ts-ignore
someClass.someMethod();
