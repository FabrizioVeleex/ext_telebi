/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stt.view.grids.clienti.Controller', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.stt-v1-grid-clienti',

  requires: [
    'Ext.grid.column.Action',
    'portal.util.Functions',
    'stt.view.forms.cliente.ModelForm',
    'stt.view.forms.cliente.Panel'
  ],
  init: function () {
    //gestione menu
    this.listBtnTop = [
      { handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' }
    ]
    if (this.checkRuoli(['99'])) {
      this.listBtnTop.push({
        tooltip: Locale.t('stt.grids.clienti.btn.new.tooltip'),
        text: Locale.t('stt.grids.clienti.btn.new.text'),
        ui: 'green',
        iconCls: 'x-fas fa-plus',
        handler: 'onImprtaMassivoClienti'
      });
      this.listBtnTop.push({
        tooltip: Locale.t('stt.grids.clienti.btn.importa.tooltip'),
        text: Locale.t('stt.grids.clienti.btn.importa.text'),
        ui: 'green',
        iconCls: 'x-fas fa-file-import',
        handler: 'onImprtaMassivoClienti'
      });
    }
    this.callParent(arguments)
  },
  onNew: function () {
    let view = this.getView().view; //view della grid
    let newRecord = Ext.create('stt.view.forms.cliente.ModelForm', {
      id: bdFunctions.bpRandomString(32),
      isnew: 1
    });
    this.createForm(view, newRecord, 1);
  },
  createForm: function (view, record, isnew) {
    let itemId = 'f' + record.data['id'];
    if (this.getView().fireEvent('checkForm', itemId)) {
      return
    }
    this.getView().fireEvent('createTab', Ext.create('stt.view.forms.cliente.Panel', {
      itemId: 'f' + record.data['id'],
      record: record,
      valori: {
        id: record.data['id'],
        isnew: isnew
      }
    }), view)
  },
  onImprtaMassivoClienti: function () {
    //FIXME recupera funzione da spl firma per presentare lista clienti da importare
    Ext.Msg.show({
      title: Locale.t('stt.forms.cliente.btn.importa.text'),
      iconCls: 'x-fas fa-trash',
      message: Locale.t('stt.forms.cliente.btn.importa.messaggio'),
      buttons: Ext.Msg.YESNO,
      icon: Ext.MessageBox.QUESTION,
      fn: function (b) {
        if (b === 'yes') {
          me.onRunImprtaMassivoClienti();
        }
      }
    });
  },
  onRunImprtaMassivoClienti: function () {
    Ext.Ajax.request({
      method: "GET",
      url: Backend.REST_API + "forms/cliente/getBtnImportaClienti/",
      success: function (response) {
        //TODO riporto lista clienti da selezionar eper l'importazione 

        Ext.Msg.show({
          title: Locale.t('stt.forms.cliente.btn.importa.text'),
          msg: Locale.t('stt.forms.cliente.btn.importa.response'),
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.INFO
        });
      },
      failure: function () {
        me.getView().el.unmask();
        Ext.Msg.show({
          title: Locale.t("global.attenzione"),
          message: Locale.t('stt.forms.cliente.btn.importa.error'),
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR,
        });
      },
    });
  },

  onafterrendergrid: function (grid) {
    grid.myColumns = [
      {
        xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
        items: [{ handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text') }]
      },
      {
        xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action2',
        items: [{
          getClass: function (view, meta, record) {
            if (record.get('aggiorna') === 1) {
              return 'x-fas fa-running bd-color-orange';
            } else {
              if (record.get('aggiorna') === 2) {
                return 'x-fas fa-exclamation-circle bd-color-red';
              }
            }
            return 'x-fas bp-action-null';

          }
        }]
      },
      { text: Locale.t('stt.grids.clienti.column.cdcli'), dataIndex: 'cdcli', width: 100 },
      { text: Locale.t('stt.grids.clienti.column.ragsoc'), dataIndex: 'ragsoc', flex: 1 },

    ]
    this.callParent(arguments)
  },
})