import { Container } from "../Container";

export function Inject(
  typeOrName?: ((type?: any) => Function) | string
): Function {
  return function (target: Object, propertyName: string, index?: number) {
    if (!typeOrName)
      typeOrName = () =>
        (Reflect as any).getMetadata("design:type", target, propertyName);

    Container.registerHandler({
      object: target,
      propertyName: propertyName,
      index: index,
      value: (containerInstance) => {
        let identifier: any;
        if (typeof typeOrName === "string") {
          identifier = typeOrName;
        } else {
          identifier = typeOrName();
        }

        return containerInstance.get(identifier);
      },
    });
  };
}
