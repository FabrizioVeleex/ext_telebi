Ext.define("prd.global.cdl.cards.dashboard.Controller", {
  extend: 'Ext.app.ViewController',
  dashboard_mc: function () {
    let me = this,
      vm = me.getViewModel();

    this.onLoadProps();
    this.onLoadOrd();
  },

  onAfterRenderDashboard: function (panel) {
    let me = this,
      vm = me.getViewModel();
    vm.set("logoCdl", `<img style="height:50px;margin-top:14px;" src="/images/prd/logo_${me.globalImage}.png">`)
  },
  onLoadProps: function (btn) {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record"),
      storeProps = vm.getStore("storeProps");

    if (!storeProps.getProxy().extraParams) storeProps.getProxy().extraParams = {}
    storeProps.getProxy().extraParams.id = record.data.id

    // Controllo azione da utente per ricarico forzato remoto
    if (btn && btn.loadRemote) {
      storeProps.getProxy().extraParams.remote = true
    }
    storeProps.load({
      success: function () {
        storeProps.getProxy().extraParams.remote = false;
      }
    });

  },
  onLoadOrd: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record"),
      storeOrd = vm.getStore("storeOrd");

    if (!storeOrd.getProxy().extraParams) storeOrd.getProxy().extraParams = {}
    storeOrd.getProxy().extraParams.id = record.data.id
    storeOrd.load();

  },
  onSendOrd: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get("record"),
      itemId = "newOrd",
      tab = me.form.child('#' + itemId);

    if (tab) {
      me.form.setActiveItem(tab);
      return true
    }

    // --------------------------------------------
    // Recupero lista ordini selezionati
    const pos = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'dashboard');
    let grid = this.listForms[pos].card.down('#gridProps');

    let recordsGood = [],
      recordsDeny = [],
      records = grid.getSelectionModel().getSelection();

    if (records.length > 0) {
      for (let i = 0, len = records.length; i < len; i++) {
        if (records[i].data.info_blocco !== "") {
          recordsDeny.push(records[i].data);
        } else {
          recordsGood.push(records[i].data);
        }
      }
    } else {
      //TODO verifico se ho una riga selezionata
      console.log("recupero record selected se settato")
    }

    if (recordsGood.length === 0) {
      console.log("Nessun ordine pronto per l'invio")
      console.log(recordsDeny);
      return;
    }

    // creo oggetto FormSelected
    let formSelected = {
      idCdl: record.data.id,
      listOrders: recordsGood,
      listDeny: recordsDeny,
      status: 0,
      isNew: true
    }

    // avvio apertura card completamento invio proposta
    let newOrd = {
      posizione: "newOrd",
      backgroundColor: "LightBlue",
      card: Ext.create("prd.global.cdl.cards.send.Panel", {
        posizione: 'newOrd',
        itemId: "newOrd",
        valori: formSelected

      }),
      btn: {
        xtype: "splitbutton",
        text: "Nuovo ordine",
        iconCls: "fas fa-paper-plane bd-color-blue",
        posizione: 'newOrd',
        ui: 'ocra',
        handler: "onClickCardOrd",
        enableToggle: true,
        userCls: 'y-arrow-button-right',
        listeners: {
          arrowclick: "onClickCardOrdClose"
        }
      }
    }
    newOrd.card.on("closePanel", "onClickOrdClose");

    //Aggiungo cards
    me.toolBarCard.add(newOrd.btn)
    me.listForms.push(newOrd)

    me.form.add(newOrd.card);
    me.form.setActiveItem(newOrd.card);

    vm.set("disableBtnNewOrd", true)
    me.onClickCard({
      posizione: "newOrd"
    });

    grid.getSelectionModel().deselectAll()

  },
  onClickCardOrd: function (btn) {
    let me = this,
      itemId = btn['posizione'],
      tab = me.form.child('#' + itemId);

    me.form.setActiveItem(tab);

    me.onClickCard({
      posizione: btn['posizione'],
    });
  },
  // onOpenOrder: function (view, rowIndex, colIndex, item, opt, record) {
  //   let me = this,
  //     itemId = record.data.id,
  //     tab = me.form.child('#' + itemId);

  //   if (tab) {
  //     me.onClickCard({ posizione: itemId });
  //     me.form.setActiveItem(tab);
  //     return true
  //   }
  //   // avvio apertura card completamento invio proposta
  //   let newOrd = {
  //     posizione: itemId,
  //     backgroundColor: "LightBlue",
  //     card: Ext.create("prd.global.cdl.cards.order.Panel", {
  //       posizione: itemId,
  //       itemId: itemId,
  //       valori: {
  //         record: record.data
  //       }

  //     }),
  //     btn: {
  //       xtype: "splitbutton",
  //       text: record.data.order,
  //       iconCls: "fas fa-tools",
  //       posizione: itemId,
  //       ui: 'green',
  //       handler: "onClickCardOrd",
  //       enableToggle: true,
  //       userCls: 'y-arrow-button-right',
  //       listeners: {
  //         arrowclick: "onClickCardOrdClose"
  //       }
  //     }
  //   }

  //   newOrd.card.on("closePanel", "onClickOrdClose");
  //   //Aggiungo cards

  //   me.toolBarCard.add(newOrd.btn)
  //   me.listForms.push(newOrd)

  //   me.form.add(newOrd.card);
  //   me.form.setActiveItem(newOrd.card);
  //   me.onClickCard({ posizione: itemId });
  // },
  onClickOrdClose: function (record) {
    let me = this,
      btn = false;

    if (record.isNew) {
      btn = this.toolBarCard.items.items.find(e => e.posizione === "newOrd");
    } else {
      btn = this.toolBarCard.items.items.find(e => e.posizione === record.id);
    }


    if (btn) {
      if (record.reLoad) {
        me.onLoadOrd();
      }
      this.onClickCardOrdClose(btn);
    }

  },
  onClickCardOrdClose: function (btn) {
    let me = this,
      vm = me.getViewModel(),
      storeOrd = vm.getStore("storeOrd"),
      storeProps = vm.getStore("storeProps"),
      itemId = btn['posizione'],
      tab = me.form.child('#' + itemId);


    if (btn.posizione === "newOrd") {
      vm.set("disableBtnNewOrd", false);
      storeOrd.load();
      storeProps.load();
    }
    me.form.remove(tab);
    me.toolBarCard.remove(btn)
    me.listForms = me.listForms.filter((obj) => {
      return obj.posizione !== btn.posizione;
    });

    me.onClickCard({
      posizione: "dashboard",
    });
  }
})