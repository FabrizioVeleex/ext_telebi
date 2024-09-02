/**
 * Created by fabrizio on 16/06/22.
 */
Ext.define("bofpub.view.main.Main", {
  extend: "portal.v1.view.main.Main",
  xtype: "app-main",
  requires: ["bofpub.view.main.Controller", "bofpub.view.main.Model"],
  controller: "main",
  viewModel: "main",
  listeners: {
    afterrender: "onAfterRender",
  },
});
