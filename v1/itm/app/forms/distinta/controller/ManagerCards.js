Ext.define("itm.forms.distinta.controller.ManagerCards", {
  requires: [
    'Ext.form.Panel',
    'itm.forms.distinta.cards.PanelArticolo',
    'itm.forms.distinta.cards.GridParts',
  ],


  managercards: function () {
    let me = this;
    const vm = me.getViewModel();

    //Aggiungo cards
    me.form.add(me.listForms);
    me.toolBarCard.add(me.listForms.map((el) => el.btn));
    me.getView().setActiveItem(me.form);

    // attivo card
    me.onClickCard({
      posizione: vm.get("cardactive"),
    });


    this.managerViewDashboard();
    this.managerViewParts();
  },
  errorCard: function (vm) {
    vm.set("btn.delete", false);
    vm.set("btn.cronology", false);
    vm.set("btn.close", false);
    vm.set("btn.save", false);
  },
});
