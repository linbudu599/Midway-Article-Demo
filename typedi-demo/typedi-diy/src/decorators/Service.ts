import { Container } from "../Container";

export function Service(): any {
  return function (target: Function) {
    const service: any = {
      type: target,
    };
    Container.set(service);
  };
}
