import glob from 'glob';

export default function(apiPath) {
  let apiRouters = {}, apiVersion, router;

  const routersFilesPaths = glob.sync(`app/${apiPath}/**/routes/*.js`);

  routersFilesPaths.forEach(function(routerFilePath) {
    apiVersion = routerFilePath.match(/\/(v\d+)\//)[1];
    if (!apiRouters[apiVersion]) {
      apiRouters[apiVersion] = [];
    }

    router = require(routerFilePath.replace('app', '..'));
    apiRouters[apiVersion].push(router.default);
  });

  return apiRouters;
};