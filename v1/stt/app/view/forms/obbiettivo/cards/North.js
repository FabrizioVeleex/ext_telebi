/**
 * Created by fabrizio on 13/12/2022.
 */
Ext.define('stt.view.forms.obbiettivo.cards.North', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
  ],
  region: "north",
  collapsible: true,
  collapsed: true,
  bind: {
    title: '{record.rag_soc}'
  },
  items: [
    {
      xtype: 'fieldset', collapsible: false, collapsed: false,
      title: '<span style="color: black;font-weight: bold">Resoconto cliente</span>',
      style: { 'background-color': "transparent;" },
      items: [
        {
          xtype: 'displayfield',
          label: 'Cliente',
          bind: {
            value: '{record.rag_soc}'
          }
        }
      ]
    }
  ]
});