const apiHost = process.env.API_HOST || '';
const apiSchema = process.env.API_SCHEMA || 'https';

const generateUri = (path: string) => `${apiSchema}://${apiHost}/${path}`;

const apiUrlBuilder = {
  exampleEndpoint: generateUri(`example`),
  attachmentStream: (attachmentId: string) => generateUri(`attachment/${attachmentId}/stream`),
  attachmentBase64: (attachmentId: string) => generateUri(`attachment/${attachmentId}/b64`),
}

export default apiUrlBuilder;
