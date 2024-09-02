
Ext.define('prd.global.cdl.cards.config.component.Info', {
  extend: 'Ext.form.FieldSet',
  xtype: "global-cdl-cards-config-component-info",
  collapsible: false, collapsed: false,
  title: `<span style="color: black;font-weight:bold">${Locale.t('prd.forms.cdl.cards.config.info.title')}</span>`,
  style: { 'background-color': "transparent;" },
  items: [
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'displayfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.idCdl'),
          minWidth: 180,
          flex: 1,
          bind: {
            value: '{record.id}'
          }
        },
        {
          xtype: 'displayfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.brand'),
          minWidth: 180,
          flex: 1,
          bind: {
            value: '{record.brand}'
          }
        },
        {
          xtype: 'displayfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.model'),
          minWidth: 180,
          flex: 1,
          bind: {
            readOnly: '{readOnly}',
            value: '{record.model}'
          }
        },
      ]
    }
  ]
})