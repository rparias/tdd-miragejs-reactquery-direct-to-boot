import { createServer, Request, Response, Server } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { AnyRegistry } from 'miragejs/-types';

export function createMockServer(): Server<AnyRegistry> {
  return createServer({
    routes() {
      this.get('/api/orders/:id', (schema: Schema<AnyRegistry>, request: Request) => {
        if(['error-id'].includes(request.params.id)) {
          return new Response(500, {}, { error: 'something went wrong' })
        }
        return {
          id: request.params.id,
          status: 'ready'
        };
      });
    },
  });
}
