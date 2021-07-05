/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

const pageComponents = fs.readdirSync(
  path.join(__dirname, '../../../app/components'),
);
const pageContainers = fs.readdirSync(
  path.join(__dirname, '../../../app/containers'),
);
const domainContainers = fs.readdirSync(
  path.join(__dirname, '../../../app/domain'),
);
const components = domainContainers.concat(
  pageComponents.concat(pageContainers)
);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
