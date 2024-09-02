/**
 * Created by fabrizio on 29/12/17.
 * TODO
 * gestire chiusura e rimozione polling
 * inserire tasti sto servizio
 */
Ext.define('skd.view.forms.top.grids.WinNoteOpeData.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.grid-noteOpeData',
  requires: [
    'Ext.Container',
    'Ext.button.Button',
    'Ext.layout.container.Card',
    'Ext.toolbar.Fill',
    'Ext.toolbar.Toolbar',
    'Ext.ux.DateTimeField',
    'Ext.ux.DateTimePicker'
  ],
  mixins: ['portal.v1.global.Util'],

  init: function () {
    let vm = this.getViewModel();
    vm.set('record', this.getView().payload.record)

    let readOnly = false;
    let abilitato = false;
    let changeDate = false;
    let storeGridPreparatorePick = vm.getStore('storeGridPreparatorePick');

    let record = this.getView().payload.record

    if (this.checkRuoli(['99', '5'])) {
      abilitato = true;
    }
    if (abilitato === false) {
      readOnly = false;
    }

    // Controllo modifica data preparazione
    if (record.data['data_ini_effettivo'] !== null) {
      changeDate = true;
    }
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
      fieldLabel: Locale.t('skd.forms.pick.dettaglio.fields.list'),
      queryMode: 'remote',
      labelWidth: 120,
      flex: 1,
      minWidth: 300,
      minChars: 2,
      store: storeComboOperatore,
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
        select: 'onSelectFilterPreparatore'
      }
    });

    this.gridPreparatori = Ext.create('Ext.grid.Panel', {
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

    this.winNota = Ext.create('Ext.form.field.TextArea', {
      readOnly: readOnly,
      msgTarget: 'under',
      width: 370,
      height: 240,
      margin: 2,
      labelAlign: 'top',
      value: record.data['nota']
    });


    this.field_data_ini_preparazione = Ext.create('Ext.ux.DateTimeField', {
      padding: '0 5',
      margin: '5 5',
      fieldLabel: Locale.t('skd.forms.pick.dettaglio.fields.data_pre_prog'),
      format: 'd/m/Y H:i',
      hourText: 'HH',
      minuteText: 'Min',
      width: 320,
      labelWidth: 150,
      startDay: 1,
      name: 'data_ini_preparazione',
      bind: {
        value: '{record.data_ini_preparazione}'
      },
      readOnly: changeDate,
      onChange: function (newValue, oldValue, c, d) {
        if (newValue !== '') {
          const y = newValue.substr(6, 4)
          const m = newValue.substr(3, 2)
          const d = newValue.substr(0, 2)
          const h = newValue.substr(11, 2)
          const i = newValue.substr(14, 2)
          const dd = new Date(y, m, d, h, i)
          if (dd.toString() === 'Invalid Date') return
        }
        // me.onCheckChangeAwait(this, newValue, 'data_ini_preparazione', oldValue)
      }
    })


    this.getView().add({
      xtype: 'panel',
      region: 'north',
      style: 'text-align:center;',
      padding: 3,
      bodyStyle: 'background-color: transparent !important',
      html: '<div class="goma-window-title">' + Locale.t('skd.grids.columns.lab') + ': ' + record.data['sc_op_lab'] + '</div>',
      height: 40
    },
      {
        xtype: 'toolbar',
        region: 'north',
        dock: 'top',
        items: [
          {
            text: 'Chiudi',
            action: 'close',
            handler: 'onCloseWindow'
          },
          {
            text: 'Salva chiudi',
            lab: record.data['sc_op_lab'],
            action: 'save',
            handler: 'onCloseWindow'
          }
        ]
      },
      {
        xtype: 'panel',
        region: 'east',
        width: 400,
        height: 250,
        bodyPadding: 10,
        items: [
          this.winCombo,
          this.gridPreparatori
        ]
      },
      {
        xtype: 'panel',
        region: 'center',
        width: 780,
        height: 250,
        bodyPadding: 10,
        items: [
          { xtype: 'container', html: 'Note', height: 30 },
          this.winNota
        ]
      },
      {
        xtype: 'panel',
        region: 'south',
        height: 50,
        bodyPadding: 10,
        layout: 'hbox',
        items: [
          this.field_data_ini_preparazione
        ]
      })

  },

  onRemoveFilterPreparatore: function (view, rowIndex) {
    view.getStore().removeAt(rowIndex);

    let vm = this.getViewModel(),
      storeGridPreparatorePick = vm.getStore('storeGridPreparatorePick'),
      list = [];
    for (let i = 0; i < storeGridPreparatorePick.data.length; i++) {
      list.push(storeGridPreparatorePick.data.items[i].data.ope_operatore);
    }
    //TODO  this.onCheckChange(this.winCombo, list);
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
    //TODO  this.onCheckChange(combo, list);
  },
  onBeforeNota: function (resp, nota) {
    let me = this,
      record = this.recordNote.record,
      s = this.grid.getStore();
    s.suspendEvents();
    record.set('nota', nota);
    s.resumeEvents();
    this.grid.getView().refreshNode(record);

  },

  onCloseWindow: function (btn) {
    let me = this,
      vm = this.getViewModel(),
      storeGridPreparatorePick = vm.getStore('storeGridPreparatorePick'),
      list = [];

    for (let i = 0; i < storeGridPreparatorePick.data.length; i++) {
      list.push(storeGridPreparatorePick.data.items[i].data.ope_operatore);
    }

    if (btn.action === 'save') {
      this.getView().response = {
        action: 'save',
        nota: me.winNota.getValue().trim(),
        lista_preparatori: list,
        data_ini_preparazione: this.field_data_ini_preparazione.getValue()
      }
      this.getView().close();

    } else {
      this.getView().response = {
        action: 'close'
      }
      this.getView().close();
    }
  },

});
