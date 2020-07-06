import { Container } from "../Container";

export function Inject(typeOrName): PropertyDecorator {
  return function (target: Object, propertyName: string, index?: number) {
    Container.registerHandler({
      object: target,
      propertyName,
      index,
      value: (containerInstance) => {
        return containerInstance.get(typeOrName);
      },
    });
  };
}
