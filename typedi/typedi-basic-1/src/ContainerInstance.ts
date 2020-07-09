import { Container } from "./Container";

export class ContainerInstance {
  id: any;

  private services = [];

  constructor(id: any) {
    this.id = id;
  }

  get<T>(identifier): T {
    const globalContainer = Container.of(undefined);
    let service = globalContainer.findService(identifier);

    return this.getServiceValue(identifier, service);
  }

  set(service, value?: any): this {
    const newService = service;
    this.services.push(newService);
    return this;
  }

  private findService(identifier) {
    return this.services.find((service) => {
      if (service.id) {
        return service.id === identifier;
      }

      return false;
    });
  }

  private getServiceValue(identifier, service) {
    let type = identifier;
    let params: any[] = [null, this];
    return new (type.bind.apply(type, params))();
  }
}
