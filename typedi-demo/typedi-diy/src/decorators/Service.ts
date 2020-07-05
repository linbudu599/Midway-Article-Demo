import { Container } from "../Container";
import { ContainerInstance } from "../ContainerInstance";

export type ObjectType<T1> = { new (...args: any[]): T1 } | { service: T1 };

export function Service(
  optionsOrServiceName?: string | any[] | (() => any),
  maybeFactory?: (...args: any[]) => any
): any {
  return function (target: Function) {
    const service: any = {
      type: target,
    };

    if (typeof optionsOrServiceName === "string") {
      service.id = optionsOrServiceName;
      service.multiple = (optionsOrServiceName as any).multiple;
      service.global = (optionsOrServiceName as any).global || false;
      service.transient = (optionsOrServiceName as any).transient;
    } else if (optionsOrServiceName) {
      service.id = (optionsOrServiceName as any).id;
      service.factory = (optionsOrServiceName as any).factory;
      service.multiple = (optionsOrServiceName as any).multiple;
      service.global = (optionsOrServiceName as any).global || false;
      service.transient = (optionsOrServiceName as any).transient;
    }

    Container.set(service);
  };
}
