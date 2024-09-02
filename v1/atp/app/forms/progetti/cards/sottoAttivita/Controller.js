/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.forms.progetti.cards.todo.Controller', {
  sottoAttivita_ManagerCard: function () {
    try {
      let me = this,
        vm = me.getViewModel(),
        record = vm.get('record');
    } catch (error) {
      console.log(arguments.callee.name, error)
    }
  }
});