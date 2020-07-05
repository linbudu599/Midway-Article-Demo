import { Container } from "./Container";

export class ContainerInstance {
  id: any;

  private services = [];

  constructor(id: any) {
    this.id = id;
  }

  has<T>(identifier): boolean {
    return !!this.findService(identifier);
  }

  get<T>(identifier): T {
    const globalContainer = Container.of(undefined);
    let service = globalContainer.findService(identifier);
    let scopedService = this.findService(identifier);

    if (service && service.global === true)
      return this.getServiceValue(identifier, service);

    if (scopedService) return this.getServiceValue(identifier, scopedService);

    if (service && this !== globalContainer) {
      const clonedService = Object.assign({}, service);
      clonedService.value = undefined;
      const value = this.getServiceValue(identifier, clonedService);
      this.set(identifier, value);
      return value;
    }

    return this.getServiceValue(identifier, service);
  }

  set(identifierOrServiceMetadata, value?: any): this {
    if (identifierOrServiceMetadata instanceof Array) {
      identifierOrServiceMetadata.forEach((v: any) => this.set(v));
      return this;
    }
    if (typeof identifierOrServiceMetadata === "string") {
      return this.set({ id: identifierOrServiceMetadata, value: value });
    }

    if (identifierOrServiceMetadata instanceof Function) {
      return this.set({
        type: identifierOrServiceMetadata,
        id: identifierOrServiceMetadata,
        value: value,
      });
    }

    const newService = identifierOrServiceMetadata as any;
    const service = this.findService(newService.id);
    if (service && service.multiple !== true) {
      Object.assign(service, newService);
    } else {
      this.services.push(newService);
    }

    return this;
  }

  private findService(identifier) {
    return this.services.find((service) => {
      if (service.id) {
        if (identifier instanceof Object) {
          return service.id === (identifier as any).service;
        }

        return service.id === identifier;
      }

      if (service.type && identifier instanceof Function)
        return service.type === identifier;

      return false;
    });
  }

  private getServiceValue(identifier, service) {
    if (service && service.value !== undefined) return service.value;

    if (
      (!service || !service.type) &&
      (!service || !service.factory) &&
      typeof identifier === "string"
    )
      return;

    let type = undefined;
    if (service && service.type) {
      type = service.type;
    } else if (service && service.id instanceof Function) {
      type = service.id;
    } else if (identifier instanceof Function) {
      type = identifier;

      if (!service) {
        service = { type: type };
        this.services.push(service);
      }

      const paramTypes =
        type && Reflect && (Reflect as any).getMetadata
          ? (Reflect as any).getMetadata("design:paramtypes", type)
          : undefined;
      let params: any[] = paramTypes
        ? this.initializeParams(type, paramTypes)
        : [];

      let value: any;
      if (service.factory) {
        params = params.filter((param) => param !== undefined);

        if (service.factory instanceof Array) {
          value = (this.get(service.factory[0]) as any)[service.factory[1]](
            ...params
          );
        } else {
          value = service.factory(...params, this);
        }
      } else {
        params.unshift(null);

        params.push(this);

        value = new (type.bind.apply(type, params))();
      }

      if (service && !service.transient && value) service.value = value;

      if (type) this.applyPropertyHandlers(type, value);

      return value;
    }
  }

  private initializeParams(type: Function, paramTypes: any[]): any[] {
    return paramTypes.map((paramType, index) => {
      const paramHandler = Container.handlers.find(
        (handler) => handler.object === type && handler.index === index
      );
      if (paramHandler) return paramHandler.value(this);

      if (
        paramType &&
        paramType.name &&
        !this.isTypePrimitive(paramType.name)
      ) {
        return this.get(paramType);
      }

      return undefined;
    });
  }

  private isTypePrimitive(param: string): boolean {
    return (
      ["string", "boolean", "number", "object"].indexOf(param.toLowerCase()) !==
      -1
    );
  }

  private applyPropertyHandlers(
    target: Function,
    instance: { [key: string]: any }
  ) {
    Container.handlers.forEach((handler) => {
      if (typeof handler.index === "number") return;
      if (
        handler.object.constructor !== target &&
        !(target.prototype instanceof handler.object.constructor)
      )
        return;

      instance[handler.propertyName] = handler.value(this);
    });
  }
}
