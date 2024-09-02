Ext.define('skd.view.forms.pick.dettaglio.panel.testata.Controller', {
  onOpenNote: function (btn) {
    let me = this,
      vm = me.getViewModel();
    let readOnly = vm.get('readOnly'),
      record = vm.get('record');

    this.recordNote = {
      view: btn,
      record: record
    };

    this.winNota = Ext.create('Ext.form.field.TextArea', {
      readOnly: readOnly,
      msgTarget: 'under',
      width: 370,
      height: 240,
      margin: 2,
      labelAlign: 'top',
      value: record.data['nota']
    });
    this.winNote = Ext.create('Ext.window.Window', {
      width: 400,
      title: 'Note',
      height: 360,
      userCls: 'goma-window-materiali',
      modal: true,
      header: false,
      border: false,
      shadow: true,
      bodyStyle: 'background-color: transparent !important;',
      layout: {
        type: 'border'
      },
      items: [
        {
          xtype: 'panel',
          region: 'north',
          style: 'text-align:center;',
          padding: 3,
          bodyStyle: 'background-color: transparent !important',
          html: '<div class="goma-window-title">' + Locale.t('skd.grids.columns.lab') + ': ' + record.data['lab'] + '</div>',
          height: 40
        },
        {
          xtype: 'toolbar',
          region: 'north',
          dock: 'top',
          items: [
            {
              text: 'Chiudi',
              scope: this,
              action: 'close',
              handler: 'onCloseWindowN'
            },
            {
              text: 'Salva chiudi',
              lab: record.data['sc_op_lab'],
              scope: this,
              action: 'save',
              handler: 'onCloseWindowN'
            }]
        },
        {
          xtype: 'panel',
          region: 'center',
          height: 250,
          bodyPadding: 10,
          items: [
            this.winNota
          ]
        }
      ]
    });

    this.winNote.show();
  },
  onCloseWindowN: function (btn) {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record');

    if (btn.action === 'save') {
      let nota = this.winNota.getValue().trim();

      Ext.Ajax.request({
        method: 'POST',
        jsonData: { nota: nota, lab: record.data['lab'] },
        url: Backend.REST_API + 'forms/cruscotto/setnota/',
        success: function (response) {
          let resp = Ext.decode(response.responseText);
          if (resp['success'] === true) {
            me.onBeforeNota(resp, nota);
          } else {
            //     TODO messaggio errore su loaddata gtid
            // me.getView().el.unmask();
          }
        },
        failure: function (response) {
          //TODO messaggio errore su loaddata gtid
          // me.panelDet.el.unmask();
        }
      });

      this.winNote.close();
    } else {
      this.winNote.close();
    }
  },
  onBeforeNota: function (resp, nota) {
    let me = this,
      vm = me.getViewModel(),
      record = vm.get('record');

    record.data['nota'] = nota;
    vm.set('record', record);

  },
  onAddPreparatore: function () {
    let me = this,
      vm = this.getViewModel(),
      record = vm.get('record'),
      storeGridPreparatorePick = vm.getStore('storeGridPreparatorePick');

    storeGridPreparatorePick.removeAll();
    let lista_preparatori = record.data['lista_preparatori'];
    lista_preparatori = lista_preparatori.split(',');
    if (lista_preparatori.length > 0) {
      for (let i = 0; i < lista_preparatori.length; i++) {
        if (lista_preparatori[i] !== '') {
          storeGridPreparatorePick.add({ 'ope_operatore': lista_preparatori[i] });
        }
      }
    }

    let storeComboOperatore = Ext.create('skd.store.forms.filtri.ComboOperatore')
    this.winCombo = Ext.create('Ext.form.ComboBox', {
      scope: me,
      fieldLabel: Locale.t('skd.forms.pick.dettaglio.fields.list'),
      queryMode: 'remote',
      labelWidth: 120,
      flex: 1,
      minWidth: 300,
      minChars: 2,
      store: storeComboOperatore,
      scope: this,
      // bind:{
      //     store:'{storeComboOperatore}'
      // },
      name: 'lista_preparatori',
      displayField: 'ope_operatore',
      valueField: 'ope_operatore',
      emptyText: Locale.t('skd.top.filtri.seleziona'),
      listConfig: {
        emptyText: Locale.t('skd.top.filtri.grids.operatore.emptyText'),
        getInnerTpl: function () {
          return '<div class="item">' +
            '<b>{ope_operatore}</b>' +
            ' </div>';
        }
      },
      listeners: {
        scope: me,
        select: 'onSelectFilterPreparatore'
      }
    });

    this.gridPreparatori = Ext.create('Ext.grid.Panel', {
      scope: me,
      height: 220,
      hideHeaders: true,
      requires: [
        'Ext.grid.column.Action'
      ],
      viewConfig: {
        emptyText: Locale.t('skd.top.filtri.grids.preparatore.emptyText')
      },
      columns: [
        {
          width: 25,
          align: 'center',
          sortable: false,
          hideable: false,
          menuDisabled: true,
          draggable: false,
          groupable: false,
          xtype: 'actioncolumn',
          items: [
            {
              getClass: function (v, meta, r) {
                meta.tdAttr = 'data-qtip=\"' + r.data['ope_operatore'] + ':<br>Rimuovi questo filtro\"';
                return 'icon-chiudi';
              },
              scope: me,
              handler: 'onRemoveFilterPreparatore'
            }
          ]
        },
        {
          text: 'ope_operatore',
          dataIndex: 'ope_operatore',
          flex: 1
        }
      ],
      store: storeGridPreparatorePick
    });

    this.winNote = Ext.create('Ext.window.Window', {
      width: 400,
      title: 'Note',
      height: 360,
      userCls: 'goma-window-materiali',
      modal: true,
      header: false,
      border: false,
      shadow: true,
      bodyStyle: 'background-color: transparent !important;',
      layout: {
        type: 'border'
      },
      items: [
        {
          xtype: 'panel',
          region: 'north',
          style: 'text-align:center;',
          padding: 3,
          bodyStyle: 'background-color: transparent !important',
          html: '<div class="goma-window-title">' + Locale.t('skd.grids.columns.lab') + ': ' + record.data['lab'] + '</div>',
          height: 40
        },
        {
          xtype: 'toolbar',
          region: 'north',
          dock: 'top',
          items: [
            {
              text: 'Chiudi',
              scope: me,
              action: 'close',
              handler: 'onCloseWindow'
            }
          ]
        },
        {
          xtype: 'panel',
          region: 'center',
          height: 250,
          bodyPadding: 10,
          items: [
            me.winCombo,
            me.gridPreparatori
          ]
        }
      ]
    });

    this.winNote.show();
  },
  onCloseWindow: function () {
    this.winNote.close();
  },
  onSelectFilterPreparatore: function (combo, record) {

    let vm = this.getViewModel(),
      storeGridPreparatorePick = vm.getStore('storeGridPreparatorePick');
    if (!record.data) return;
    for (let i = 0; i < storeGridPreparatorePick.data.length; i++) {
      if (storeGridPreparatorePick.data.items[i].data.ope_operatore === record.data.ope_operatore) return;
    }
    storeGridPreparatorePick.insert(0, record);
    this.onChangePreparatore(combo);
  },
  onChangePreparatore: function (combo) {
    let vm = this.getViewModel(),
      storeGridPreparatorePick = vm.getStore('storeGridPreparatorePick'),
      list = [];
    for (let i = 0; i < storeGridPreparatorePick.data.length; i++) {
      list.push(storeGridPreparatorePick.data.items[i].data.ope_operatore);
    }
    this.onCheckChange(combo, list);
  },

})