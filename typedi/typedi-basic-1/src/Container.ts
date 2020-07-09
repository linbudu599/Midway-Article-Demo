import { ContainerInstance } from "./ContainerInstance";
export class Container {
  private static readonly globalInstance: ContainerInstance = new ContainerInstance(
    undefined
  );

  private static readonly instances: ContainerInstance[] = [];

  static readonly handlers = [];

  static of(instanceId: any): ContainerInstance {
    if (instanceId === undefined) return this.globalInstance;

    let container = this.instances.find(
      (instance) => instance.id === instanceId
    );

    return container;
  }

  static get<T>(identifier): T {
    return this.globalInstance.get(identifier as any);
  }

  static set(identifierOrServiceMetadata, value?: any): Container {
    this.globalInstance.set(identifierOrServiceMetadata as any, value);
    return this;
  }

  static registerHandler(handler): Container {
    this.handlers.push(handler);
    return this;
  }
}
