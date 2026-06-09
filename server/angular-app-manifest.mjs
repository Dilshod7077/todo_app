
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/todo_app/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/todo_app"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 604, hash: 'f68f066ec43ff0c94dbccae7a2f94510fdc82eced75a654a23f962f75b71d394', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 962, hash: '3b69f8539972b7ec2c6ebea30d7af92af2d7bef23a584c1690d21f4211700c4a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 6991, hash: 'f72e42f8b80c55bac01892e5176af14a200641c9b6463d2e28cdc3d4987aaef4', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-IR5HP2WZ.css': {size: 30, hash: '+W59G9J3gC8', text: () => import('./assets-chunks/styles-IR5HP2WZ_css.mjs').then(m => m.default)}
  },
};
