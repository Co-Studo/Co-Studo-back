import swaggereJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Co-Studo API',
      version: '1.0.0',
      description: 'Co-Studo API with express',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  },
  apis: ['./src/app.ts', './src/routers/*', './src/entities/*'],
};

const specs = swaggereJsdoc(options);
const swagger = [swaggerUi.serve, swaggerUi.setup(specs)];

export default swagger;
