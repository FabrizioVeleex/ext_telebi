Ext.define("sdcpub.view.start.Panel", {
  extend: 'portal.v1.public.start.Panel',
  requires: [
      "sdcpub.view.start.Controller",
      "sdcpub.view.start.Model"
  ],
  controller: "start",
  viewModel: "start",
});
