/**
 * Created by fabrizio on 06/12/2023.
 */
Ext.define("spl.forms.processo.controller.ManagerBtn", {
  requires: [
    'Ext.toolbar.Fill'
  ],
  insertBtn: function (me, record) {
    const vm = me.getViewModel();
    vm.set("btn.close", true);
    vm.set("btn.cronology", true);

    if (me.checkRuoli(["99"])) {
      me.toolBar.add({ xtype: "tbfill" });
      me.toolBar.add({
        tooltip: "Spool OriginalePDF",
        ui: "blue",
        iconCls: "x-fas fa-download",
        handler: "onDownloafSpoolOriginPdf",
      });
    }

  },
});
