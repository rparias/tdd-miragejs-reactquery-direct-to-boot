import { createServer, Request, Server } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { AnyRegistry } from 'miragejs/-types';

export function createMockServer(): Server<AnyRegistry> {
  return createServer({
    routes() {
      this.get('/api/orders/:id', (schema: Schema<AnyRegistry>, request: Request) => {
        return {
          id: request.params.id,
          status: 'ready'
        };
      });
    },
  });
}
