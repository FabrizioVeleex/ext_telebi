Ext.define("bol.forms.documento.controller.ManagerBtn", {
  requires: [
    'Ext.toolbar.Fill'
  ],
  insertBtn: function (me, record) {
    const vm = me.getViewModel();
    vm.set("btn.close", true);
    vm.set("btn.cronology", true);


    if (me.checkRuoli(["99", "10"])) {
      vm.set("readOnly", false);
      vm.set("btn.save", true);
      me.toolBar.add({
        ui: 'red',
        text: Locale.t('bol.forms.documento.btn.scarta.text'),
        tooltip: Locale.t('bol.forms.documento.btn.scarta.tooltip'),
        iconCls: 'x-fas fa-trash',
        handler: 'onScarta'
      });
    }

    // Scaricamento excel
    me.toolBar.add({
      ui: 'blue',
      text: Locale.t('bol.forms.documento.btn.excel.text'),
      tooltip: Locale.t('bol.forms.documento.btn.excel.tooltip'),
      iconCls: 'x-fas fa-download',
      bind: {
        hidden: "{!record.imported}"
      },
      handler: 'onDwnExcel'
    });


    if (me.checkRuoli(["99"])) {
      me.toolBar.add({ xtype: "tbfill" });
      me.toolBar.add({
        tooltip: "_Rigenera PDF",
        ui: "blue",
        iconCls: "x-fas fa-wrench",
        handler: "onBuildPdf",
      });
      me.toolBar.add({
        tooltip: "Spool OriginalePDF",
        ui: "blue",
        iconCls: "x-fas fa-download",
        handler: "onDownloafSpoolOriginPdf",
      });
    }

  },
});
