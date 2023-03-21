import fastify, { FastifyRequest } from 'fastify';
import {
  deleteApplicationById,
  createApplication,
  updateApplication,
  getApplications,
} from './service/application';
import { createFarmer, getFarmers, deleteFarmerById } from './service/farmer';
import { getApplicationCount } from './storage/local';
import { IApplication, IFarmerRest, IParams, IQueryParams } from './types/rest';

const server = fastify();

server.get(
  '/farms/applications',
  async (
    request: FastifyRequest<{
      Params: {
        pageSize: string;
      };
    }>,
    reply,
  ) => {
    reply.code(201).send(getApplications(<IQueryParams>request.query));
  },
);

server.post('/farms/applications', async (request, reply) => {
  const { body } = request;
  try {
    reply.code(201).send(createApplication(<IApplication>body));
  } catch (error) {
    reply.code(400).send({ message: error.message });
  }
});

server.put('/farms/applications/:id', async (request, reply) => {
  const { params } = <IParams>request;
  const { body } = request;

  try {
    reply.code(201).send(updateApplication(<IApplication>body, <number>params.id));
  } catch (error) {
    reply.code(400).send({ message: error.message });
  }
});

server.delete('/farms/applications/:id', async (request, reply) => {
  const { params } = <IParams>request;
  try {
    reply.code(202).send(deleteApplicationById(<number>params.id));
  } catch (error) {
    reply.code(400).send({ message: error.message });
  }
});

server.get('/farms/applications/count', async (request, reply) => {
  reply.code(201).send({
    applicationCount: getApplicationCount(),
  });
});

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

server.get(
  '/farms/farmers',
  async (
    request: FastifyRequest<{
      Params: {
        pageSize: string;
      };
    }>,
    reply,
  ) => {
    reply.code(201).send(getFarmers(<IQueryParams>request.query));
  },
);

server.post('/farms/farmers', async (request, reply) => {
  const { body } = request;
  try {
    reply.code(201).send(createFarmer(<IFarmerRest>body));
  } catch (error) {
    reply.code(400).send({ message: error.message });
  }
});

server.delete('/farms/farmers/:id', async (request, reply) => {
  const { params } = <IParams>request;
  try {
    reply.code(202).send(deleteFarmerById(<number>params.id));
  } catch (error) {
    reply.code(400).send({ message: error.message });
  }
});
