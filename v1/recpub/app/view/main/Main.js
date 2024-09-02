Ext.define("recpub.view.main.Main", {
  extend: "portal.v1.view.main.Main",
  xtype: "app-main",
  heigth: 600,
  requires: ["recpub.view.main.Controller", "recpub.view.main.Model"],
  controller: "main",
  viewModel: "main",
  listeners: {
    afterrender: "onAfterRender",
    runapertura: "onRunApertura",
  },
});
