/**
 * Created by fabrizio on 08/12/2023.
 */
Ext.define("spl.forms.processo.controller.JsonController", {
  managerViewJson: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record');

    try {
      const pos = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'json');

      let card = {
        xtype: "panel",
        html: "<PRE>" + JSON.stringify(record.data.json, null, 2) + "</PRE>"
      }
      this.listForms[pos].card.add(card)

    } catch (err) {
      console.log(arguments.callee.name, error)
    }
  },

});
