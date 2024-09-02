/**
 * Created by luke on 21/07/21.
 */
Ext.define('amm.view.grids.alberomenu.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.alberomenu',
  requires: [
    'Ext.button.Button',
    'Ext.container.Container',
    'Ext.form.Panel',
    'Ext.form.field.ComboBox',
    'Ext.menu.Menu',
    'Ext.window.Window',
    'amm.store.grids.alberomenu.ComboVoce'
  ],
  reloadGrid: function () {
    this.getView().getStore().load()
  },
  onAfterRender: function () {
    //carico lo store al render
    let store = this.getView().getStore()
    store.load()
  },
  //visualizzazione help gestione menù
  onHelp: function () {
    let wdwpanel = Ext.create('Ext.form.Panel', {
      border: false, items: [
        {
          xtype: 'container',
          style: { 'padding': '5px' },
          html: '<span style="font-weight:bold;color:blue;font-size:12px;" >' + Locale.t('amm.grids.alberomenu.help.newroot.title') + '</span><br>' + Locale.t('amm.grids.alberomenu.help.newroot.desc')
        },
        {
          xtype: 'container',
          style: { 'padding': '5px' },
          html: '<span style="font-weight:bold;color:blue;font-size:12px;" >' + Locale.t('amm.grids.alberomenu.help.etichetta.title') + '</span><br>' + Locale.t('amm.grids.alberomenu.help.etichetta.desc')
        },
        {
          xtype: 'container',
          style: { 'padding': '5px' },
          html: '<span style="font-weight:bold;color:blue;font-size:12px;" >' + Locale.t('amm.grids.alberomenu.help.addmenu.title') + '</span><br>' + Locale.t('amm.grids.alberomenu.help.addmenu.desc')
        },
        {
          xtype: 'container',
          style: { 'padding': '5px' },
          html: '<span style="font-weight:bold;color:blue;font-size:12px;" >' + Locale.t('amm.grids.alberomenu.help.addvoce.title') + '</span><br>' + Locale.t('amm.grids.alberomenu.help.addvoce.desc')
        },
        {
          xtype: 'container',
          style: { 'padding': '5px' },
          html: '<span style="font-weight:bold;color:blue;font-size:12px;" >' + Locale.t('amm.grids.alberomenu.help.movevoce.title') + '</span><br>' + Locale.t('amm.grids.alberomenu.help.movevoce.desc')
        },
        {
          xtype: 'container',
          style: { 'padding': '5px' },
          html: '<span style="font-weight:bold;color:blue;font-size:12px;" >' + Locale.t('amm.grids.alberomenu.help.delvoce.title') + '</span><br>' + Locale.t('amm.grids.alberomenu.help.delvoce.desc') + '<br><span style="font-weight:bold;color:red;font-size:12px;" >' + Locale.t('amm.grids.alberomenu.help.delvoce.msg') + '</span>'
        }
      ]
    })
    let wndw = Ext.create('Ext.Window', {
      closable: true, bodyStyle: { 'padding': '10px', 'background-color': '#ffffff' },
      modal: true, border: false, resizable: false, draggable: false,
      items: [wdwpanel]
    })
    wndw.show();
  },
  //tasto destro
  onItemContext: function (node, record, item, index, e) {
    e.stopEvent()
    let items = []
    items.push({
      scope: this, text: Locale.t('amm.grids.alberomenu.changedesc'), iconCls: 'x-fas fa-pencil-alt', handler: function () {
        this.onChangeDesc(record)
      }
    })
    items.push({
      scope: this, text: Locale.t('amm.grids.alberomenu.addmenu'), iconCls: 'x-fas fa-plus', handler: function () {
        this.onAddMenu(record)
      }
    })
    items.push({
      scope: this, text: Locale.t('amm.grids.alberomenu.addvoce'), iconCls: 'x-fas fa-plus', handler: function () {
        this.onAddVoce(record)
      }
    })
    //cancellazione se non è Principale/Applicazioni
    if (record.data.id !== 'P' && record.data.id !== 'A') {
      items.push({
        scope: this, text: Locale.t('amm.grids.alberomenu.delvoce'), iconCls: 'x-fas fa-trash', handler: function () {
          this.onDelVoce(record)
        }
      })
    }
    if (items.length > 0) {
      let contextMenu = Ext.create('Ext.menu.Menu', {
        items: items
      });
      contextMenu.showAt(e.getXY())
    }
  },
  onChangeDesc: function (record) {
    let me = this
    let btnX = new Ext.Button({
      text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
        wndw.destroy()
      }
    });
    let btnConfirm = new Ext.Button({
      text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
        //recupero id evento selezionato
        let ff = wdwpanel.getForm()
        let descrizione = ff.findField('descrizione').getValue()
        if (!descrizione || descrizione === '') {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            msg: Locale.t('amm.grids.alberomenu.descrizioneobb'),
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
          return
        }
        wndw.destroy()
        me.getView().el.mask(Locale.t('global.actions.incorso'))
        Ext.Ajax.request({
          method: 'PUT',
          params: { descrizione: descrizione, id: record.data.itemId },
          url: Backend.REST_API + 'grids/changedesc',
          success: function () {
            me.getView().el.unmask()
            me.getView().getStore().load() //ricarico
          },
          failure: function (response) {
            me.getView().el.unmask()
            let resp = Ext.decode(response.responseText)
            Ext.Msg.show({
              title: Locale.t('global.errore'),
              msg: resp['msg'],
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
          xtype: 'textfield',
          fieldLabel: Locale.t('amm.grids.alberomenu.descrizione'), width: 500,
          name: 'descrizione', value: record.data.text
        }
      ]
    });
    let wndw = Ext.create('Ext.Window', {
      tbar: [btnX, btnConfirm], title: Locale.t('amm.grids.alberomenu.changedesc'),
      closable: true, width: 700,
      bodyStyle: { 'padding': '10px', 'background-color': '#ffffff' },
      modal: true, border: false, resizable: false, draggable: false,
      items: [wdwpanel]
    });
    wndw.show();
  },
  onAddMenu: function (record) {
    let me = this; //controller
    let btnX = new Ext.Button({
      text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
        wndw.destroy();
      }
    });
    let btnConfirm = new Ext.Button({
      text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
        //recupero id evento selezionato
        let ff = wdwpanel.getForm();
        let descrizione = ff.findField('descrizione').getValue(); //id evento
        if (!descrizione || descrizione === '') {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            msg: Locale.t('amm.grids.alberomenu.descrizioneobb'),
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
          return;
        }
        wndw.destroy()
        me.getView().el.mask(Locale.t('global.actions.incorso'))
        Ext.Ajax.request({
          method: 'PUT',
          params: { descrizione: descrizione, id: record.data.itemId, padre: record.data.padre },
          url: Backend.REST_API + 'grids/addmenu',
          success: function () {
            me.getView().el.unmask()
            me.getView().getStore().load() //ricarico
          },
          failure: function (response) {
            me.getView().el.unmask()
            let resp = Ext.decode(response.responseText)
            Ext.Msg.show({
              title: Locale.t('global.errore'),
              msg: resp['msg'],
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
          xtype: 'displayfield', labelWidth: 120,
          fieldLabel: Locale.t('amm.grids.alberomenu.selezionato'), anchor: '100%',
          value: record.data.text
        },
        {
          xtype: 'textfield', labelWidth: 120,
          fieldLabel: Locale.t('amm.grids.alberomenu.descrizione'), width: 500,
          name: 'descrizione', value: ''
        }
      ]
    });
    let wndw = Ext.create('Ext.Window', {
      tbar: [btnX, btnConfirm], title: Locale.t('amm.grids.alberomenu.addmenu'),
      closable: true, width: 700,
      bodyStyle: { 'padding': '10px', 'background-color': '#ffffff' },
      modal: true, border: false, resizable: false, draggable: false,
      items: [wdwpanel]
    });
    wndw.show()
  },
  onAddVoce: function (record) {
    let me = this; //controller
    let btnX = new Ext.Button({
      text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
        wndw.destroy();
      }
    });
    let btnConfirm = new Ext.Button({
      text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
        //recupero id evento selezionato
        let ff = wdwpanel.getForm();
        let descrizione = ff.findField('descrizione').getValue(); //id evento
        if (!descrizione || descrizione === '') {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            msg: Locale.t('amm.grids.alberomenu.descrizioneobb'),
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
          return;
        }
        let idmodulo = ff.findField('idmodulo').getValue(); //id evento
        if (!idmodulo || idmodulo === '') {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            msg: Locale.t('amm.grids.alberomenu.moduloobb'),
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
          return;
        }
        wndw.destroy()
        me.getView().el.mask(Locale.t('global.actions.incorso'))
        Ext.Ajax.request({
          method: 'PUT',
          params: {
            descrizione: descrizione, idmodulo: idmodulo,
            tipo: record.data.tipo, id: record.data.itemId, padre: record.data.padre
          },
          url: Backend.REST_API + 'grids/addvoce',
          success: function () {
            me.getView().el.unmask()
            me.getView().getStore().load() //ricarico
          },
          failure: function (response) {
            me.getView().el.unmask()
            let resp = Ext.decode(response.responseText)
            Ext.Msg.show({
              title: Locale.t('global.errore'),
              msg: resp['msg'],
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
          xtype: 'displayfield', labelWidth: 120,
          fieldLabel: Locale.t('amm.grids.alberomenu.selezionato'), width: 500,
          value: record.data.text
        },
        {
          xtype: 'textfield', labelWidth: 120,
          fieldLabel: Locale.t('amm.grids.alberomenu.descrizione'), width: 500,
          name: 'descrizione', value: ''
        },
        {
          xtype: 'combo', labelWidth: 120,
          fieldLabel: Locale.t('amm.grids.alberomenu.modulo'), width: 600,
          name: 'idmodulo', displayField: 'titolo', valueField: 'id',
          store: Ext.create('amm.store.grids.alberomenu.ComboVoce')
        }
      ]
    });
    let wndw = Ext.create('Ext.Window', {
      tbar: [btnX, btnConfirm], title: Locale.t('amm.grids.alberomenu.addvoce'),
      closable: true, width: 700,
      bodyStyle: { 'padding': '10px', 'background-color': '#ffffff' },
      modal: true, border: false, resizable: false, draggable: false,
      items: [wdwpanel]
    });
    wndw.show();
  },
  onDelVoce: function (record) {
    let me = this; //controller
    let btnX = new Ext.Button({
      text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
        wndw.destroy();
      }
    });
    let btnConfirm = new Ext.Button({
      text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
        //recupero id evento selezionato
        wndw.destroy();
        me.getView().el.mask(Locale.t('global.actions.incorso'))
        Ext.Ajax.request({
          method: 'PUT',
          params: { id: record.data.itemId },
          url: Backend.REST_API + 'grids/delvoce',
          success: function () {
            me.getView().el.unmask()
            me.getView().getStore().load() //ricarico
          },
          failure: function (response) {
            me.getView().el.unmask()
            let resp = Ext.decode(response.responseText)
            Ext.Msg.show({
              title: Locale.t('global.errore'),
              msg: resp['msg'],
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
          xtype: 'displayfield',
          fieldLabel: Locale.t('amm.grids.alberomenu.descrizione'), width: 500,
          value: record.data.text
        }
      ]
    });
    let wndw = Ext.create('Ext.Window', {
      tbar: [btnX, btnConfirm], title: Locale.t('amm.grids.alberomenu.delvoce'),
      closable: true, width: 700,
      bodyStyle: { 'padding': '10px', 'background-color': '#ffffff' },
      modal: true, border: false, resizable: false, draggable: false,
      items: [wdwpanel]
    });
    wndw.show();
  },
  //inserimento voce principale
  onAddMenuTop: function (record) {
    let me = this; //controller
    let btnX = new Ext.Button({
      text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
        wndw.destroy();
      }
    });
    let btnConfirm = new Ext.Button({
      text: Locale.t('global.btn.conferma'), iconCls: 'x-fas fa-check', handler: function () {
        //recupero id evento selezionato
        let ff = wdwpanel.getForm();
        let descrizione = ff.findField('descrizione').getValue(); //id evento
        if (!descrizione || descrizione === '') {
          Ext.Msg.show({
            title: Locale.t('global.attenzione'),
            msg: Locale.t('amm.grids.alberomenu.descrizioneobb'),
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.ERROR
          });
          return;
        }
        wndw.destroy()
        me.getView().el.mask(Locale.t('global.actions.incorso'))
        Ext.Ajax.request({
          method: 'PUT',
          params: { descrizione: descrizione },
          url: Backend.REST_API + 'grids/addmenutop',
          success: function () {
            me.getView().el.unmask()
            me.getView().getStore().load() //ricarico
          },
          failure: function (response) {
            me.getView().el.unmask()
            let resp = Ext.decode(response.responseText)
            Ext.Msg.show({
              title: Locale.t('global.errore'),
              msg: resp['msg'],
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
          xtype: 'textfield',
          fieldLabel: Locale.t('amm.grids.alberomenu.descrizione'), width: 500,
          name: 'descrizione', value: ''
        }
      ]
    });
    let wndw = Ext.create('Ext.Window', {
      tbar: [btnX, btnConfirm], title: Locale.t('amm.grids.alberomenu.btn.new.text'),
      closable: true, width: 700,
      bodyStyle: { 'padding': '10px', 'background-color': '#ffffff' },
      modal: true, border: false, resizable: false, draggable: false,
      items: [wdwpanel]
    });
    wndw.show()
  },
  onBeforeDrop: function (node, data, overModel, dropPosition) {
    //il parametro data è il record che si sposta, overModel.data dove si sposta, dropPosition se prima o dopo
    if (data.records[0].data.padre === 'root') {
      Ext.Msg.show({
        title: Locale.t('global.attenzione'),
        msg: Locale.t('amm.grids.alberomenu.sposta.errore'),
        buttons: Ext.Msg.OK,
        icon: Ext.MessageBox.ERROR
      });
      return false;
    }
    let me = this; //controller
    let posizione = Locale.t('amm.grids.alberomenu.sposta.sopra');
    let idposizione = '0';
    if (overModel.data.tipo === "SUB") {
      idposizione = '2';
    } else {
      //verifico se lo spostamento è sopra o sotto il nodo
      if (dropPosition === 'after') {
        posizione = Locale.t('amm.grids.alberomenu.sposta.sotto');
        idposizione = '1';
      }
    }

    let idsposta = data.records[0].data.itemId; //id da spostare
    let sposta = data.records[0].data.text;
    let iddestino = overModel.data.itemId; //id destinazione
    let destino = overModel.data.text;
    let padre = overModel.data.padre; //padre destinazione
    let btnX = new Ext.Button({
      text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban', handler: function () {
        wndw.destroy();
      }
    });
    let btnConfirm = new Ext.Button({
      text: posizione, iconCls: 'x-fas fa-list', ui: 'green', handler: function () {
        wndw.destroy();
        me.getView().el.mask(Locale.t('global.actions.incorso'))
        Ext.Ajax.request({
          method: 'PUT',
          params: { idsposta: idsposta, iddestino: iddestino, padre: padre, idposizione: idposizione },
          url: Backend.REST_API + 'grids/movemenu',
          success: function () {
            me.getView().el.unmask()
            me.getView().getStore().load() //ricarico
          },
          failure: function (response) {
            me.getView().el.unmask()
            let resp = Ext.decode(response.responseText)
            Ext.Msg.show({
              title: Locale.t('global.errore'),
              msg: resp['msg'],
              buttons: Ext.Msg.OK,
              icon: Ext.MessageBox.ERROR
            })
          }
        })
      }
    });

    let btnConfirmSub = new Ext.Button({
      text: Locale.t('amm.grids.alberomenu.sposta.sub'),
      hidden: overModel.data.tipo !== "SUB",
      ui: "green",
      iconCls: 'x-fas fa-stream',
      handler: function () {
        wndw.destroy();

        me.getView().el.mask(Locale.t('global.actions.incorso'))
        Ext.Ajax.request({
          method: 'PUT',
          params: { idsposta: idsposta, iddestino: iddestino, padre: padre, idposizione: idposizione },
          url: Backend.REST_API + 'grids/movemenu',
          success: function () {
            me.getView().el.unmask()
            me.getView().getStore().load() //ricarico
          },
          failure: function (response) {
            me.getView().el.unmask()
            let resp = Ext.decode(response.responseText)
            Ext.Msg.show({
              title: Locale.t('global.errore'),
              msg: resp['msg'],
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
          xtype: 'displayfield',
          fieldLabel: Locale.t('amm.grids.alberomenu.sposta.origine'), width: 500, labelWidth: 150,
          value: sposta
        },
        {
          xtype: 'displayfield',
          fieldLabel: Locale.t('amm.grids.alberomenu.sposta.sotto'),
          width: 500, labelWidth: 150,
          value: destino
        }
      ]
    });
    let wndw = Ext.create('Ext.Window', {
      tbar: [btnX, btnConfirm, btnConfirmSub], title: Locale.t('amm.grids.alberomenu.help.movevoce.title'),
      closable: true, width: 700,
      bodyStyle: { 'padding': '10px', 'background-color': '#ffffff' },
      modal: true, border: false, resizable: false, draggable: false,
      items: [wdwpanel]
    });
    wndw.show()
    return false
  }
});