
Ext.define('prd.global.cdl.cards.config.component.SyncSql', {
  extend: 'Ext.form.FieldSet',
  xtype: "global-cdl-cards-config-component-syncsql",
  collapsible: false, collapsed: false, labelAlign: 'top',
  title: `<span style="color: black;font-weight:bold">${Locale.t('prd.forms.cdl.cards.config.sync.title')}</span>`,
  style: { 'background-color': "transparent;" },
  items: [
    {
      xtype: 'numberfield',
      fieldLabel: Locale.t('prd.forms.cdl.fields.interval'),
      labelWidth: 180,
      width: 330,
      bind: {
        value: '{record.sync__interval}'
      }
    },
    {
      msgTarget: 'under',
      labelAlign: 'top',
      margin: 5,
      xtype: 'textareafield',
      grow: true,
      fieldLabel: Locale.t('prd.forms.cdl.fields.sql'),
      anchor: '100%',
      bind: {
        value: '{record.sync__sql}'
      }

    }
  ]
})