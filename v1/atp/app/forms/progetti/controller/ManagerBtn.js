/**
 * Created by fabrizio on 08/10/2022.
 */
Ext.define("atp.forms.progetti.controller.ManagerBtn", {
  requires: [
    'Ext.toolbar.Fill'
  ],
  insertBtn: function (me, record, toolBar) {
    const vm = me.getViewModel()
    vm.set("btn.close", true);
    vm.set("btn.cronology", true);
    vm.set("btn.save", true)
    vm.set("btn.delete", true)

    if (vm.get('isnew') === 1) {
      vm.set("btn.delete", false)
    }

    //* Gestione ruolo di sola lettura --> 0
    if (me.checkRuoli(["0"])) {
      vm.set("readOnly", true)
    }
    if (me.checkRuoli(["99"])) {
      vm.set("readOnly", false)
    }
  }
});
