Ext.define("itm.forms.articolo.controller.ManagerCards", {
  requires: [
    'Ext.form.Panel',
    'itm.forms.articolo.cards.PanelArticolo',
    'itm.forms.articolo.cards.GridAttributi',
    'itm.forms.articolo.cards.GridForniture',
    'itm.forms.articolo.cards.GridDocs',
  ],

  managercards: function () {
    let me = this,
      vm = me.getViewModel(),
      readOnly = vm.get("readOnly")

    this.rnd_managercards()

    //Aggiungo cards
    me.form.add(me.listForms);
    me.toolBarCard.add(me.listForms.map((el) => el.btn));
    me.getView().setActiveItem(me.form);

    // attivo card
    me.onClickCard({
      posizione: vm.get("cardactive"),
    });


    this.managerViewDashboard();
    this.managerViewAttributi();
    this.managerViewForniture();
    this.managerViewDocs();
  },
  errorCard: function (vm) {
    vm.set("btn.delete", false);
    vm.set("btn.cronology", false);
    vm.set("btn.close", false);
    vm.set("btn.save", false);
  },
});
