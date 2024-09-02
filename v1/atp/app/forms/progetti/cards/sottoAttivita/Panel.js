/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.forms.progetti.cards.sottoAttivita.Panel', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.TextField',
    'Ext.form.field.Date',
    'Ext.layout.container.HBox',
    "Ext.grid.column.Date",
    'atp.app.forms.progetti.components.gridSottoAttivita.Grid'
  ],
  scrollable: 'y',
  bodyPadding: 15,
  items: [
    {
      //Sezione trasferta e conferma trasferta
      xtype: 'container',
      layout: {
        type: "hbox"
      },
      defaults: { margin: 5, labelWidth: 150 },
      items: [
        {
          xtype: 'v1-atp-forms-progetti-components-gridSottoAttivita'
        }
      ]
    },
  ]
});