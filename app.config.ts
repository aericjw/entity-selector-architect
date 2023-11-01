import type { CliOptions } from 'dt-app';

const config: CliOptions = {
  environmentUrl: 'https://xle26845.sprint.apps.dynatracelabs.com/',
  app: {
    name: 'entity-selector-architect',
    version: '0.0.0',
    description: 'A starting project with routing, fetching data, and charting',
    id: 'my.entity.selector.architect',
    scopes: [{ name: 'storage:logs:read', comment: 'default template' }, { name: 'storage:buckets:read', comment: 'default template' }]
  },
};

module.exports = config;