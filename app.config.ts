import type { CliOptions } from 'dt-app';

const config: CliOptions = {
  environmentUrl: 'https://xle26845.sprint.apps.dynatracelabs.com/',
  app: {
    name: 'Entity Selector Architect',
    version: '1.0.0',
    description: 'Assisted building and preview of entity selectors',
    id: 'my.entity.selector.architect',
    scopes: [{ name: 'storage:entities:read', comment: 'Read Environment Entities via DQL'}, { name: 'environment-api:entities:read', comment: 'Read Environment Entities via API'}]
  },
  icon: './src/assets/architect-app-icon.png'
};

module.exports = config;