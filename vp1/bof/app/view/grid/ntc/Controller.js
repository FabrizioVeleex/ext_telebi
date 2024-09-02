/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.ntc.Controller", {
  extend: "portal.v1.view.grids.DefaultController",
  alias: "controller.ntc",
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
  //----------------------------------------------------------------
  // Scarco pdf o xlsx
  onDownloadFile: function (view, a, b, btn, d, record) {
    if (btn.typeFile==='pdf' && record.data.so === 'XA' && record.data.spool === 0) {
      return false
    }
    record.tag = btn.tag;
    record.typeFile = btn.typeFile;
    this.getView().fireEvent("dwnDocument", record);
  },
  onLoadStoreGrid: function (s) { },
});
