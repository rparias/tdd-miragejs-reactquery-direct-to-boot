import { createServer, Request, Response, Server } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { AnyRegistry } from 'miragejs/-types';

let count: number = 0

export function createMockServer(): Server<AnyRegistry> {
  return createServer({
    routes() {
      this.get('/api/orders/:id', (schema: Schema<AnyRegistry>, request: Request) => {
        if(['error-id'].includes(request.params.id)) {
          return new Response(500, {}, { error: 'something went wrong' })
        }

        if(['long-order'].includes(request.params.id)) {
          if(count < 3) {
            count = count + 1
            return {
              id: request.params.id,
              status: 'initialized'
            };
          } else {
            count = 0;
            return {
              id: request.params.id,
              status: 'ready'
            };
          }
        }

        return {
          id: request.params.id,
          status: 'ready'
        };
      });
    },
  });
}
