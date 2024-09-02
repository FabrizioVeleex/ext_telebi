Backend = (function () {
  if (!location.origin) {
    location.origin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
  }
  return {
    REST_VERSION: '/v1/',
    REST_API: '/api/v1/sdc/',
    API_URL: location.origin,
  };
})();
