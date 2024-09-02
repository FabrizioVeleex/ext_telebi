/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define("prd.forms.tipologia.controller.ManagerBtn", {
  requires: [
    'Ext.toolbar.Fill'
  ],
  insertBtn: function (me, record) {
    const vm = me.getViewModel();
    vm.set("btn.close", true);
    vm.set("btn.cronology", true);


    if (me.checkRuoli(["99", "2"])) {
      vm.set("readOnly", false);
      vm.set("btn.save", true);
    }

  },
});
