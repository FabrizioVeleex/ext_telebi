Ext.define("itm.forms.articolo.controller.ControllerAttributi", {
  managerViewAttributi: function () {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record'),
      readOnly = vm.get('readOnly');
    let storeClassi = vm.getStore('storeClassi') //store x la combo classe
    let storeFamiglie = vm.getStore('storeFamiglie') //store x la combo famiglia
    let storeGruppi = vm.getStore('storeGruppi') //store x la combo gruppo
    let storeSottogruppi = vm.getStore('storeSottogruppi') //store x la combo gruppo
    let storeAttributi = vm.getStore('storeAttributi') //store attributi
    let storeArtFor = vm.getStore('storeArtFor') //store attributi

    try {
      storeClassi.loadData(record.data['storeclassi'])
      storeFamiglie.loadData(record.data['storefamiglie'])
      storeGruppi.loadData(record.data['storegruppi'])
      storeSottogruppi.loadData(record.data['storesottogruppi'])
      storeArtFor.loadData(record.data['storeartfor'])

      storeAttributi.loadData(record.data['gridattributi'])
      if (readOnly === false) {
        storeAttributi.add(Ext.create('itm.forms.articolo.component.gridAttributi.ModelAttributi', {
          action: 1, isnew: 1, id: me.randomString(32), id_art: record.data.id, id_atr: '', valore: '', attributo: ''
        })
        )
      }

      // aggiorno testo card
      me.updTextCard()
      // const pos = Object.keys(this.toolBarCard.items.items).find(key => this.toolBarCard.items.items[key]['posizione'] === 'attributi');
      // if (pos !== -1) {
      //   this.toolBarCard.items.items[1].setText(Locale.t("itm.forms.articolo.cards.attributi.text") + ' [' + record.data['gridattributi'].length + ']')
      // }

    } catch (err) {
      console.log(err)
      //TODO gestire errore
    }
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
      grid.getStore().add(Ext.create('forms.articolo.component.gridAttributi.ModelAttributi', {
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
  },
  //recupero attributi da altro articolo
  onGetAttributi: function () {
    let me = this, vm = this.getViewModel();
    let record = vm.get('record');

    //Carico attributi attuali se vuole mantenerli (potrebbe averne di nuovi)
    record.data.gridattributi = []
    let storeattributi = vm.getStore('storeAttributi')
    storeattributi.each(function (rec) {
      if (rec.data.attributo !== '') {
        record.data.gridattributi.push(rec.data)
      }
    })
    let btnX = new Ext.Button({
      text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
        wndw.destroy();
      }
    });
    let btnConfirm = new Ext.Button({
      text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
        let ff = wdwpanel.getForm();
        let idart = ff.findField('idart').getValue();
        if (!idart) {//verifico che sia stato assegnato un esito
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            msg: Locale.t('itm.forms.articolo.btn.getattributi.obbarticolo'),
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
          return;
        }
        let valori = ff.findField('valori').getValue();
        let mantieni = ff.findField('mantieni').getValue();
        me.getView().el.mask(Locale.t("global.actions.incorso"));
        Ext.Ajax.request({
          method: "POST",
          jsonData: { data: record.data, idart: idart, valori: valori, mantieni: mantieni },
          url: Backend.REST_API + "forms/articolo/getattributi",
          success: function () {
            me.view.el.unmask()
            wndw.destroy();
            me.loadData() //ricarico i dati
          },
          failure: function (response) {
            me.getView().el.unmask();
            let resp = Ext.decode(response.responseText);
            Ext.Msg.show({
              title: Locale.t("global.errore"),
              msg: resp["msg"],
              buttons: Ext.Msg.OK,
              icon: Ext.MessageBox.ERROR
            })
          }
        })
      }
    });
    let wdwpanel = Ext.create('Ext.form.Panel', {
      border: false, items: [
        {
          xtype: 'combo',
          editable: true, width: 700, labelWidth: 180,
          fieldLabel: Locale.t('itm.forms.articolo.btn.getattributi.articolo'), minChars: 3,
          name: 'idart', displayField: 'descrizione', valueField: 'id', value: '',
          tpl: Ext.create('Ext.XTemplate',
            '<ul class="x-list-plain"><tpl for=".">',
            '<li role="option" class="x-boundlist-item" style="border-bottom: 1px solid black"><b>Codice: {cd_art} </b><br>{descrizione}</li>',
            '</tpl></ul>'
          ),
          store: Ext.create('itm.forms.articolo.component.comboArticoli.storeArticolo')
        },
        {
          xtype: 'radiogroup', labelWidth: 180, fieldLabel: Locale.t('itm.forms.articolo.btn.getattributi.valori'), name: 'valori',
          columns: 2, width: 500, simpleValue: true,
          items: [
            { boxLabel: Locale.t('global.radio.si'), inputValue: 1 },
            { boxLabel: Locale.t('global.radio.no'), inputValue: 0, checked: true }
          ]
        },
        {
          xtype: 'radiogroup', labelWidth: 180, fieldLabel: Locale.t('itm.forms.articolo.btn.getattributi.mantieni'), name: 'mantieni',
          columns: 2, width: 500, simpleValue: true,
          items: [
            { boxLabel: Locale.t('global.radio.si'), inputValue: 1 },
            { boxLabel: Locale.t('global.radio.no'), inputValue: 0, checked: true }
          ]
        },
        {
          xtype: 'container',
          style: { 'padding': '5px' },
          html: '<span style="font-weight:bold;color:blue;font-size:12px;" >' + Locale.t('itm.forms.articolo.btn.getattributi.msg') + '</span>'
        }
      ]
    });
    let wndw = Ext.create('Ext.Window', {
      tbar: [btnX, btnConfirm], title: Locale.t('itm.forms.articolo.btn.getattributi.text'),
      width: 750, autoHeight: true, closable: true,
      bodyStyle: { 'padding': '10px', 'background-color': '#ffffff' },
      modal: true, border: false, resizable: false, draggable: false,
      items: [wdwpanel]
    });
    wndw.show();
  }



});
