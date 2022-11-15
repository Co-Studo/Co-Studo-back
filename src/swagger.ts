import swaggereJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const apisRoot = process.env.DEPLOY === 'yes' ? './build/src' : './src';

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
  apis: [`${apisRoot}/routers/*`, `${apisRoot}/entities/*`],
};

const specs = swaggereJsdoc(options);
const swagger = [swaggerUi.serve, swaggerUi.setup(specs)];

export default swagger;
