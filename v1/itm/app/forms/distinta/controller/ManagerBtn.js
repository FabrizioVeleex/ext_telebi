Ext.define("itm.forms.distinta.controller.ManagerBtn", {
  requires: [
    'Ext.toolbar.Fill'
  ],
  insertBtn: function () {
    let me = this;
    const vm = me.getViewModel();
    vm.set("btn.close", true);
    vm.set("btn.closeAllert", true);
    vm.set("btn.cronology", true);

    if (me.checkRuoli(["99", "1"])) {
      vm.set("readOnly", false);
      vm.set("btn.save", true);
      me.toolBar.add(this.btnGetattributi)
    }
  }
});
