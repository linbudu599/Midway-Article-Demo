import { Connection, getConnection } from 'typeorm';

export default class BaseService {
  connection: Connection;

  constructor() {
    this.connection = getConnection();
  }
}
