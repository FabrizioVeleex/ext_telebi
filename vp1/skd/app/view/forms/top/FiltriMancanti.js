/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.forms.top.FiltriMancanti', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.form.Checkbox',
    'Ext.form.FieldSet',
    'Ext.form.field.ComboBox',
    'Ext.form.field.Date',
    'Ext.form.field.Text',
    'Ext.layout.container.HBox',
    'Ext.layout.container.VBox',
    'Ext.panel.Panel',
    'skd.view.grids.mancanti.tagope.Combo',
    'skd.view.grids.mancanti.tagope.Store'
  ],
  collapsible: false,
  layout: {
    type: 'hbox'
  },
  scrollable: 'x',
  style: 'border:none',
  defaults: {
    userCls: 'goma-filtri-grid'
  },
  frame: true,
  items: [
    {
      fieldLabel: Locale.t('skd.forms.pick.dettaglio.fields.list'),
      xtype: 'v1-skd-forms-mancanti-tagope',
      store: Ext.create("skd.view.grids.mancanti.tagope.Store"),
      flex: 1,
      bind: {
        value: '{filtriMancanti.operatore}'
      },
    },
  ]
});
