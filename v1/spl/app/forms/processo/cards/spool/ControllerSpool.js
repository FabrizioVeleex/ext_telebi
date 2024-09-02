/**
 * Created by fabrizio on 08/12/2023.
 */
Ext.define("spl.forms.processo.controller.SpoolController", {
  managerViewSpool: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record'),
      readOnly = vm.get('readOnly');

    try {
      const pos = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'spool');

      // Ciclo l'array per generare le pagine dello spool
      let pag = 1, pages = [];
      for (const page of record.data.json.spool) {
        let card = {
          xtype: "panel",
          autoScroll: true,
          overflowY: 'scroll',
          title: "Pag. " + pag,
          html: "<pre>"
        }
        let numRow = 1;
        for (const row of page) {
          card.html += `${numRow.toString().padStart(3, "0")} ${row}\n`
          numRow++
        }
        card.html += "</pre>"
        pages.push(card);
        pag++
      }

      this.listForms[pos].card.add(pages)
      this.listForms[pos].card.setActiveTab(0)


    } catch (err) {
      console.log(arguments.callee.name, error)
    }
  },

});
