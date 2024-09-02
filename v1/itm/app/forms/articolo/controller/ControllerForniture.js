Ext.define("itm.forms.articolo.controller.ControllerForniture", {
  managerViewForniture: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record'),
      readOnly = vm.get('readOnly');


    try {
      this.toolbarForniture = Ext.create("Ext.Toolbar", {
        items: [
          {
            text: '__Aggiungi articolo fornitore',
            handler: 'onOpenAddAtr'
          }
        ]
      })
      let pnl = me.listForms.find((el) => el.posizione === 'forniture')
      pnl.card.addDocked(this.toolbarForniture)
      // aggiorno testo card
      me.updTextCard()


    } catch (err) {
      console.log(err)
      //TODO gestire errore
    }
  },

  onOpenNewArt: function (btn) {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record'),
      readOnly = vm.get('readOnly');
    let storeArtForLotti = vm.getStore('storeArtForLotti')

    this.FormNewArt = Ext.create('itm.forms.articolo.component.FormNewArt')

    // let pnl = me.listForms.find((el) => el.posizione === 'forniture')
    this.cardAddArt.setActiveItem(this.FormNewArt)

    //pulisco form inserimemnto appena aperto.
    var defaultObj = {
      acqlist01: {
        azienda: "",
        id_for: "",
        cd_art: "",
        descr_art: "",
        um: "",
        data_start: "",
        data_end: "",
        prezzo: ""
      },
      acqlist02: []
    };
    var emptyObj = Ext.apply({}, defaultObj);
    vm.set('newArticoloFornitore', emptyObj);

    var dirtyStore = vm.getStore('storeArtForLotti');
    dirtyStore.removeAll();

    storeArtForLotti.add(Ext.create('itm.forms.articolo.component.gridAttributi.ModelAttributi', {
      action: 1, isnew: 1, id: me.randomString(32), id_art: record.data.id, id_atr: '', valore: '', attributo: ''
    })
    )
  },
  onOpenAddAtr: function () {
    let itemId = 'addArt'
    let me = this;

    if (!me.form.items.keys.includes("faddArt")) {
      this.cardAddArt = Ext.create("itm.forms.articolo.component.CardAddArt", {
        itemId: 'f' + itemId,
        posizione: itemId,
      });

      this.toolBarCard.add({
        xtype: "splitbutton",
        itemId: 'f' + itemId,
        text: '__nuovo art',
        // iconCls: "icon-" + record.data.estensione.replace(".", ""),
        posizione: itemId,
        enableToggle: true,
        ui: 'ocra',
        handler: "onClickCardArt",
        userCls: 'y-arrow-button-right',
        listeners: {
          arrowclick: "onClickCardArtClose"
        }
      })
      me.form.add(this.cardAddArt);
    }
    me.form.setActiveItem(this.cardAddArt);
    me.onClickCard({ posizione: itemId });
  },
  onClickCardArt: function (btn) {
    let me = this,
      itemId = 'f' + btn['posizione'],
      tab = me.form.child('#' + itemId);

    me.form.setActiveItem(tab);
    me.onClickCard({ posizione: btn['posizione'] });
  },
  onClickCardArtClose: function (btn) {
    let me = this,
      itemId = 'f' + btn['posizione'],
      tab = me.form.child('#' + itemId);

    me.form.remove(tab);
    this.toolBarCard.remove(btn)
    me.onClickCard({
      posizione: "forniture",
    });
  },
  onCloseFormAddArtFor: function (panel) {
    this.cardAddArt.setActiveItem(this.FormAddArt)
  },
  onAfterRenderCardAddArt: function () {
    this.FormAddArt = Ext.create('itm.forms.articolo.component.FormAddArt')

    this.cardAddArt.add(this.FormAddArt)
    // this.cardAddArt.add()
    this.cardAddArt.setActiveItem(this.FormAddArt)
  },
  updTextCard: function () {
    let store = this.getViewModel().getStore('storeAttributi');
    let qta = Object.keys(store.data.items).filter(key => store.data.items[key].data['id_atr'] !== '' && store.data.items[key].data['action'] !== 2);
    const pos = Object.keys(this.toolBarCard.items.items).find(key => this.toolBarCard.items.items[key]['posizione'] === 'attributi');
    if (pos !== -1) {
      this.toolBarCard.items.items[pos].setText(Locale.t("itm.forms.articolo.cards.attributi.text") + ' [' + qta.length + ']')
    }
  },
  onSelectAttributo: function (cmb, record) {
    let me = this,
      vm = me.getViewModel(),
      rec = vm.get('record'),
      grid = cmb.up('grid');

    let row = grid.getSelectionModel().getSelection()[0];
    row.data['id_atr'] = record.data['id'];
    grid.getView().refreshNode(row)
    let task = new Ext.util.DelayedTask(function (cmb) {
      cmb.ownerCt.completeEdit();
    }, this, [cmb])
    task.delay(100)

    let lastrecord = grid.getStore().last()
    if (lastrecord === row) {
      grid.getStore().add(Ext.create('itm.forms.articolo.component.gridForniture.ModelForniture', {
        action: 1, isnew: 1, id: bdFunctions.bpRandomString(32), id_art: rec.data.id, id_atr: '', valore: '', attributo: ''
      }))
      me.updTextCard();
    }
  },
  onHandlerAction: function (view, rowIndex, colIndex, item, event, record) {
    let me = this, vm = this.getViewModel()
    if (vm.get('readOnly')) {
      return false;
    }
    let grid = view.up('grid'),
      lastrecord = grid.getStore().last();

    if (record.get('action') === 2) {
      record.set('action', 0)
    } else {
      if (record.data.isnew === 0) {
        record.set('action', 2)
      } else {
        if (lastrecord !== record) {
          view.getStore().remove(record);
        }
      }
    }
    me.updTextCard();
  }



});
