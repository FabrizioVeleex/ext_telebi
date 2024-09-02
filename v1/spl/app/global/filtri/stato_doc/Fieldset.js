/**
 * Created by fabrizio on 31/12/23.
 */
Ext.define('spl.global.filtri.stato_doc.Fieldset', {
  extend: 'Ext.form.FieldSet',
  requires: [],
  layout: {
    type: 'hbox'
  },
  title: Locale.t('spl.grids.documenti.column.status_doc.title'),
  userCls: "y-filtri-panel-default y-filtri-panel-date",
  defaults: {
    width: 180,
  },
  items: [
    {
      xtype: 'checkboxgroup',
      columns: 1,
      vertical: true,
      items: [
        { boxLabel: Locale.t('spl.grids.documenti.column.status_doc.attivo'), name: 'status_doc_0' },
        { boxLabel: Locale.t('spl.grids.documenti.column.status_doc.annullato'), name: 'status_doc_1' },
      ]
    }
  ]
});