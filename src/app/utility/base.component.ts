import { constants, endpoints } from "./constants";

export abstract class BaseComponent {
  public get constants() {
    return constants;
  }

  public get endpoints() {
    return endpoints;
  }
}
