/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.cont.Controller", {
  extend: "portal.v1.view.grids.DefaultController",
  alias: "controller.cont",
  mixins: ["portal.v1.global.Util"],

  init: function () {
    this.listBtnTop = [{ handler: "reloadGrid", iconCls: " pictos pictos-refresh" }];

    this.callParent(arguments);
  },

  onReloadGrid: function () {
    this.getView().getStore().load();
  },
  onAfterRender: function () { },
  onafterrendergrid: function (grid) { },
  onLoadStoreGrid: function (s) { },
});
