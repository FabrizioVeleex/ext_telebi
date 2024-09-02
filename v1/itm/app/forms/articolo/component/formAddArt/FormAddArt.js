/**
 * Created by luke on 27/09/22.
 */
Ext.define('itm.forms.articolo.component.FormAddArt', {
  extend: 'Ext.grid.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.field.Text',
  ],
  viewConfig: {
    emptyText: Locale.t('global.grid.empty'),
    enableTextSelection: true,
  },
  scrollable: 'y',
  bind: {
    store: '{storeArtFor}',
  },
  dockedItems: [
    {
      xtype: 'toolbar',
      items: [
        {
          xtype: 'textfield', fieldLabel: Locale.t('itm.forms.attributo.fields.attributo'),
          width: 400,
          bind: {
            value: '{record.attributo}',
            readOnly: '{readOnly}'
          }
        },
        {
          text: 'nuovo articolo fornitore',
          handler: 'onOpenNewArt'
        }
      ]
    }
  ],
  columns: [
    {
      xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
      items: [{ handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text') }]
    },
    {
      text: Locale.t('itm.forms.attributo.gridarticolifornitore.column.azienda'),
      dataIndex: 'azienda',
      width: 70,
    },
    {
      text: Locale.t('itm.forms.attributo.gridarticolifornitore.column.cd_art'),
      dataIndex: 'cd_art',
      with: 120,

    },
    {
      text: Locale.t('itm.forms.attributo.gridarticolifornitore.column.descr_art'),
      dataIndex: 'descr_art',
      minWith: 200,
      flex: 2,
    },
    {
      text: Locale.t('itm.forms.attributo.gridarticolifornitore.column.um'),
      dataIndex: 'um',
      minWith: 150,
      flex: 1,
    },
    {
      text: Locale.t('itm.forms.attributo.gridarticolifornitore.column.data_start'),
      dataIndex: 'data_start',
      minWith: 150,
      flex: 1,
    },
    {
      text: Locale.t('itm.forms.attributo.gridarticolifornitore.column.data_end'),
      dataIndex: 'data_end',
      minWith: 150,
      flex: 1,
    },
    {
      text: Locale.t('itm.forms.attributo.gridarticolifornitore.column.prezzo'),
      dataIndex: 'prezzo',
      minWith: 150,
      flex: 1,
    },
  ]
});