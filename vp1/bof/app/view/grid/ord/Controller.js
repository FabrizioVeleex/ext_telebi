/**
 * Created by fabrizio on 27/06/22.
 */
Ext.define("bofpub.view.grid.ord.Controller", {
  extend: "portal.v1.view.grids.DefaultController",
  mixins: ["portal.v1.global.Util"],
  alias: "controller.ord",

  init: function () {
    this.listBtnTop = [{ handler: "reloadGrid", iconCls: " pictos pictos-refresh" },
      { xtype:'box', html: Locale.t('bofpub.grids.ord.range')}
    ];
    this.callParent(arguments);
  },

  onReloadGrid: function () {
    this.getView().getStore().load();
  },
  onAfterRender: function () { },
  onAfterRenderGrid: function (grid) { },
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
});
