/**
 * Created by fabrizio on 08/10/2022.
 */
Ext.define("spl.forms.documento.controller.ManagerBtn", {
  requires: [
    'Ext.toolbar.Fill'
  ],
  insertBtn: function (me, record) {
    const vm = me.getViewModel();
    vm.set("btn.close", true);
    vm.set("btn.cronology", true);

    if (record.data.x === 1) {
      vm.set("readOnly", true);

    } else {
      if (me.checkRuoli(["99", "10"])) {
        vm.set("readOnly", false);
        vm.set("btn.save", true);
        me.toolBar.add({
          ui: 'red',
          text: Locale.t('spl.forms.documento.btn.scarta.text'),
          tooltip: Locale.t('spl.forms.documento.btn.scarta.tooltip'),
          iconCls: 'x-fas fa-trash',
          handler: 'onScarta'
        });
      }
      if (record.data.tag === "BOL") {
        me.toolBar.add({
          ui: 'blue',
          tooltip: Locale.t("spl.grids.documenti.btn.firma.tooltip"),
          text: Locale.t("spl.grids.documenti.btn.firma.text"),
          iconCls: "x-fas fa-pen-square",
          handler: 'onSignPdf'
        });
      }

    }

    // Scaricamento excel
    if (record.data.tag === "BOL" || record.data.tag === "FAT" || record.data.tag === "ORD" || record.data.tag === "PAK") {
      me.toolBar.add({
        ui: 'blue',
        text: Locale.t('spl.forms.documento.btn.excel.text'),
        tooltip: Locale.t('spl.forms.documento.btn.excel.tooltip'),
        iconCls: 'x-fas fa-download',
        handler: 'onDwnExcel'
      });
    }

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
