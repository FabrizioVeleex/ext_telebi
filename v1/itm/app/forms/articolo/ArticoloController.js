/**
 * Created by luca on 16/07/2018.
 */
Ext.define('itm.forms.articolo.ArticoloController', {
  extend: 'portal.v1.view.forms.mainCard.Controller',
  mixins: [
    'portal.v1.global.Util',
    'itm.forms.articoli.mixins.Renaudo',
    'itm.forms.articoli.mixins.Telebi',
    'itm.forms.articolo.controller.ManagerCards',
    'itm.forms.articolo.controller.ManagerBtn',
    'itm.forms.articolo.controller.ControllerAttributi',
    'itm.forms.articolo.controller.ControllerDashboard',
    'itm.forms.articolo.controller.ControllerForniture',
    'itm.forms.articolo.controller.ControllerDocs',
  ],
  alias: 'controller.v1-itm-form-articolo',
  requires: [
    'Ext.container.Container',
    'Ext.form.FieldSet',
    'Ext.form.Panel',
    'Ext.form.RadioGroup',
    'Ext.form.field.ComboBox',
    'Ext.util.Format',
    'Ext.window.Window',
    'itm.model.forms.articolo.ArticoloModel',
    'itm.forms.articolo.component.gridAttributi.ModelAttributi',
    'itm.forms.articolo.component.gridForniture.ModelForniture',
    'itm.forms.articolo.component.gridlegami.GridLegami',
    'itm.forms.articolo.component.comboArticoli.storeArticolo',
    'itm.forms.articolo.cards.GridAttributi',
    'itm.forms.articolo.component.gridDocs.PanelPreview',
    'portal.v1.view.main.global.upload.Image',
    'Ext.button.Split'
  ],
  init: function () {
    let vm = this.getViewModel();
    this.btnGetattributi = {
      xtype: 'button',
      hidden: true,
      bind: { hidden: '{hide.attributi}' },
      ui: 'blue',
      text: Locale.t('itm.forms.articolo.btn.getattributi.text') + '...',
      tooltip: Locale.t('itm.forms.articolo.btn.getattributi.tooltip'),
      iconCls: 'x-fas fa-clone',
      handler: 'onGetAttributi'
    };
    vm.set('isnew', this.getView().valori.isnew);
    vm.set('id', this.getView().valori.id);
    vm.set('record', Ext.create('itm.model.forms.articolo.ArticoloModel', {
      id: this.getView().valori.id,
      isnew: this.getView().valori.isnew
    }))
    this.callParent(arguments)

    this.toolBarCard.setScrollable(true)
  },
  managerView: function (origin_record) {
    let me = this, vm = me.getViewModel(), record = vm.get('record')

    this.callParent(arguments)
    try {

      if (me.checkRuoli(["99", "1"])) {
        vm.set("readOnly", false);

      } else {
        vm.set("readOnly", true);
      }

      // duplico i dato del record per la verifica su chiusura
      this.origin_record = { ...origin_record.data };

      this.origin_attributi = [];
      for (let rec of origin_record.data.gridattributi) {
        this.origin_attributi.push({ id: rec.id, valore: rec.valore });
      }

      this.insertBtn(record); // Gestione tasti
      this.managercards(record); // Gesione Cards

      //titolo tab
      //TODO + ' - ' + Locale.t('itm.forms.articolo.fields.dateupdate') + ': ' + Ext.util.Format.date(record.data.dateupdate, 'd/m/Y H:i:s') || 'n.d.'
      vm.set('title', `<b>${record.data['cd_art']}</b> <i>${record.data['descrizione']}</i>`)
      vm.set('label', Locale.t('itm.forms.articolo.title'))
      vm.set("toolbar.hideCard", false);

    } catch (err) {
      console.log(err)
      // Nascondo tutti i tasti
      this.errorCard(vm);
      vm.set("panelinfo.consoleInfo", "<h3>" + Locale.t("global.error.form.open") + "</h3>");
      this.getView().setActiveItem(this.panelInfo);
      this.onAfterLoadFailure();
    }
  },
  onSave: function () {
    let me = this, vm = me.getViewModel(), record = vm.get("record");
    if (!this.obb()) {
      return false;
    }


    //attributi
    let err = ''
    record.data.gridattributi = []
    let storeattributi = vm.getStore('storeAttributi')
    storeattributi.each(function (rec) {
      if (rec.data.attributo !== '') {
        record.data.gridattributi.push(rec.data)
        /* //TODO  Tolgo controllo, al momento possono inserire attributi senza valore
        if (rec.data.valore.trim()==='') {
            err+= Locale.t('itm.forms.articolo.gridattributi.errvalore')+rec.data.attributo+'<br>'
        }
         */
      }
    })

    const posCard = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'docs');
    if (posCard !== -1) {
      let card = this.listForms[posCard].card;
      let storeDocs = card.getViewModel().getStore('storeDocs')
      record.data.griddocs = []
      storeDocs.each(function (rec) {
        // if (rec.data.attributo !== '') {
        record.data.griddocs.push(rec.data)
        // }
      })
    }
    if (err !== '') {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        msg: err,
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
      });
    }

    //recupero i campi Html x distruggerli e farli ricreare
    const pos = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'dashboard');

    if (pos !== -1) {
      let htmlfield = this.listForms[pos].card.down('#deschtml')
      if (htmlfield) {
        htmlfield.destroy()
      }
    }
    this.callParent(arguments)
  },

  onClose: function (btn) {
    let me = this,
      msgAlert = false,
      vm = me.getViewModel(),
      record = vm.get('record'),
      storeattributi = vm.getStore('storeAttributi');

    if (record !== null) {
      // verifico campi
      for (const [key, value] of Object.entries(record.data)) {
        if (me.origin_record) {
          if (key !== 'gridattributi') {
            if (me.origin_record[key] && record.data[key] !== me.origin_record[key]) {
              msgAlert = true
            };
          }
        }
      }

      // verifico attributi
      storeattributi.each(function (rec) {
        if (rec.data.attributo !== '') {
          let check = me.origin_attributi.find(el => el.id === rec.data.id);
          if (check === undefined) {
            msgAlert = true;
          } else {
            if (check.valore !== rec.data.valore) {
              msgAlert = true;
            }
          }
        }
      })
    }
    if (msgAlert) {
      Ext.Msg.show({ //chiedo conferma x eseguire la cancellazione
        title: Locale.t('itm.forms.articolo.btn.close.chiudi'), iconCls: 'x-fas fa-trash', msg: Locale.t('itm.forms.articolo.btn.close.chiuditext'),
        buttons: Ext.Msg.YESNO, icon: Ext.MessageBox.QUESTION, fn: function (b) {
          if (b === 'yes') {
            me.getView().refreshGrid = me.refreshGrid;
            me.getView().fireEvent('closeForm', me);
            me.getView().destroy(); //distruggo panel
          }
        }
      });
    } else {
      me.getView().refreshGrid = me.refreshGrid;
      me.getView().fireEvent('closeForm', me);
      me.getView().destroy(); //distruggo panel
    }
  },

  obb: function () {

    let msg = ''

    // controllo card dashboard
    const pos = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'dashboard');
    const dashboard = this.listForms[pos].card.getForm();
    if (!dashboard.isValid()) {
      msg += Locale.t('global.form.validation.modulo') + '<br>';
    }

    // controllo card docs
    const posCard = Object.keys(this.listForms).find(key => this.listForms[key]['posizione'] === 'docs');
    let cardDocs = this.listForms[posCard].card;
    let storeDocs = cardDocs.getViewModel().getStore('storeDocs')


    // controlare se ho il predefinito cancellato
    let delPre = storeDocs.data.items.filter(el => el.data.action === 2 && el.data.predefinito === 1)

    if (delPre.length === 1) {
      // Recupero qta immagini rimanenti
      let listImg = storeDocs.data.items.filter(el => el.data.documento !== '' && el.data.action !== 2 && el.data.type === "img")

      // Setto predefinito l'unica rimasta
      if (listImg.length === 1) {
        delPre[0].set('predefinito', 0)
        listImg[0].set('predefinito', 1)
      }
      // Presento finestra scelta predefinito
      if (listImg.length > 1) {
        this.alertPredefinitoDel(delPre, listImg)
        return false;
      }
    }

    if (msg !== '') {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        msg: Locale.t('global.form.validation.modulo'),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
      });
      return false;
    }
    return true;
  },

  alertPredefinitoDel: function (delPre, listImg) {
    let me = this;
    let records = []
    let btnX = new Ext.Button({
      text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
        wndw.destroy();
      }
    });
    let btnConfirm = new Ext.Button({
      text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check',
      disabled: true,
      handler: function () {
        delPre[0].set('predefinito', 0)
        me.onSave();
        wndw.destroy()
      }
    });
    for (let rec of listImg) {
      records.push(rec.data)
    }

    let store = Ext.create("Ext.data.Store")
    store.loadData(records)

    let gridPanel = Ext.create('Ext.grid.Panel', {
      scrollable: 'y',
      store: store,

      columns: [
        {
          text: Locale.t('itm.forms.articolo.cards.docs.columns.predefinito'),
          xtype: 'widgetcolumn',
          widget: {
            height: 140,
            xtype: 'button',
            userCls: 'y-predefinito',
            iconCls: '',
            handler: function (obj) {
              let grid = obj.up('grid'),
                store = grid.getStore();

              let record = obj.getWidgetRecord()
              if (['png', 'jpg', 'gif', 'jpeg'].includes(record.data.estensione.replace('.', ''))) {
                if (record.data.predefinito !== 1) {
                  for (let row of store.data.items) {
                    if (row.id !== record.data.id) {
                      row.data.predefinito = 0
                      let a = grid.down(`button[userCls~=pred_${row.id}]`)
                      a.fireEvent('updateIcon')
                    } else {
                      obj.setIconCls('x-fas fa-star fa-xl y-predefinito-icon-active')
                      obj.setTooltip('Predefinito')
                      row.data.predefinito = 1
                    }
                  }
                  btnConfirm.enable()
                }
              } else {
                obj.setIconCls('y-predefinito-icon')
                obj.setTooltip('Disabilitato')
              }
            },
            bind: {
              userCls: 'y-predefinito pred_{record.id}'
            },
            listeners: {
              updateIcon: function () {
                this.setTooltip('Setta come predefinito')
                this.setIconCls('')
              },
              beforerender: function (obj) {
                let record = obj.getWidgetRecord()

                if (['png', 'jpg', 'gif', 'jpeg'].includes(record.data.estensione.replace('.', ''))) {
                  if (record.data.predefinito === 0) {
                    obj.setIconCls('y-predefinito-icon')
                    obj.setTooltip('Setta come predefinito')
                  } else {
                    obj.setIconCls('x-fas fa-star fa-xl y-predefinito-icon-active')
                    obj.setTooltip('Predefinito')
                  }
                } else {
                  obj.setIconCls('y-predefinito-icon')
                  obj.setTooltip('Disabilitato')
                }
              }
            }
          }
        },
        {
          text: Locale.t('itm.forms.articolo.cards.docs.columns.immagine'),
          width: 148,
          resizable: false,
          xtype: 'widgetcolumn',
          dataIndex: 'id',
          widget: {
            xtype: 'panel',
            header: false,
            bind: {
              hidden: '{record.columnLink && record.isnew}',
            },
            items: [],
            listeners: {
              afterrender: function (obj) {
                let widget = obj.getWidgetRecord();
                obj.add(
                  {
                    xtype: 'image',
                    width: 128,
                    height: 128,
                    alt: 'Default image',
                    src: widget.data.image
                  },
                )
              }
            }
          }
        },
        {
          text: Locale.t('itm.forms.articolo.cards.docs.columns.dettaglio'),
          xtype: 'widgetcolumn',
          flex: 1,
          widget: {
            xtype: 'component',
            bind: {
              hidden: '{record.columnLink}',
              html: 'Oggetto {record.oggetto} <br>Dimensione {record.dimensione}'
            }
          },
          minWidth: 300
        },
      ]
    });
    let wndw = Ext.create('Ext.Window', {
      tbar: [btnX, btnConfirm], title: Locale.t('itm.forms.articolo.cards.docs.titlepred'),
      width: 750, autoHeight: true, closable: true,
      bodyStyle: { 'padding': '10px', 'background-color': '#ffffff' },
      modal: true, border: false, resizable: false, draggable: false,
      items: [
        {
          xtype: 'panel',
          html: '<b>' + Locale.t('itm.forms.articolo.cards.docs.msgpred') + '</b>'
        },
        gridPanel
      ]
    });
    wndw.show();

  },
  onClickCard: function (btn) {
    this.callParent(arguments)
    let me = this,
      vm = me.getViewModel(),
      cardactive = vm.get('cardactive');

    // Gestione tasti cards
    if (cardactive === 'attributi') {
      vm.set('hide.attributi', false)
      vm.set('hide.forniture', true)
    } else if (cardactive === 'forniture') {
      vm.set('hide.attributi', true)
    } else {
      vm.set('hide.attributi', true)
      vm.set('hide.forniture', true)
    }
  },

  // Controllo lunghezza campo maxLength obbligatorio
  onKeyupField: function (field) {
    let length = field.getValue().length;
    let max = field.maxLength
    let fieldLabel = field.getFieldLabel()
    if (field.fieldLabel_old && field.fieldLabel_old !== fieldLabel) {
      fieldLabel = field.fieldLabel_old
    } else {
      field.fieldLabel_old = fieldLabel
    }
    field.setFieldLabel(`${fieldLabel} <span style="font-size:xx-small;">[${length}/${max}]</style>`)
  },

})