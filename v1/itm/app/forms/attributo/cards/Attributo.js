/**
 * Created by luke on 27/09/22.
 */
Ext.define('itm.forms.attributo.cards.Attributo', {
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
    store: '{storeArticoli}',
  },
  columns: [
    {
      xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action1',
      items: [{ handler: 'onOpen', iconCls: 'x-fas fa-eye', tooltip: Locale.t('global.btn.open.text') }]
    },
    {
      text: Locale.t('itm.forms.attributo.gridarticoli.column.stato'),
      dataIndex: 'cd_stato',
      width: 70,
    },
    {
      text: Locale.t('itm.forms.attributo.gridarticoli.column.cd_art'),
      dataIndex: 'cd_art',
      with: 120,

    },
    {
      text: Locale.t('itm.forms.attributo.gridarticoli.column.descrizione'),
      dataIndex: 'descrizione',
      minWith: 200,
      flex: 2,
    },
    {
      text: Locale.t('itm.forms.attributo.gridarticoli.column.classe'),
      dataIndex: 'descr_clm',
      minWith: 150,
      flex: 1,
    },
    {
      text: Locale.t('itm.forms.attributo.gridarticoli.column.famiglia'),
      dataIndex: 'descr_fam',
      minWith: 150,
      flex: 1,
    },
    {
      text: Locale.t('itm.forms.attributo.gridarticoli.column.gruppo'),
      dataIndex: 'descr_gruppo',
      minWith: 150,
      flex: 1,
    },
    {
      text: Locale.t('itm.forms.attributo.gridarticoli.column.sottogruppo'),
      dataIndex: 'descr_sottogruppo',
      minWith: 150,
      flex: 1,
    },
  ]
});