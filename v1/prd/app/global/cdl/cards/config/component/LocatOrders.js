
Ext.define('prd.global.cdl.cards.config.component.LocalOrders', {
  extend: 'Ext.form.FieldSet',
  xtype: "global-cdl-cards-config-component-localorders",
  collapsible: false, collapsed: false, labelAlign: 'top',
  title: `<span style="color: black;font-weight:bold">${Locale.t('prd.forms.cdl.cards.config.localOrders.title')}</span>`,
  style: { 'background-color': "transparent;" },
  items: [
    {
      xtype: "container",
      html: `<span style="font-style:italic;">${Locale.t('prd.forms.cdl.cards.config.localOrders.subTitle')}</span>`
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, msgTarget: 'side', labelAlign: 'top' },
      items: [
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.host'),
          width: 200,
          bind: {
            readOnly: '{readOnly}',
            value: '{record.config__localOrders__host}'
          }
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.folder'),
          flex: 1,
          minWidth: 300,
          bind: {
            value: '{record.config__localOrders__folder}'
          }
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.protocol'),
          width: 100,
          bind: {
            value: '{record.config__localOrders__protocol}'
          }
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.port'),
          width: 100,
          bind: {
            value: '{record.config__localOrders__port}'
          }
        }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, msgTarget: 'side', labelAlign: 'top' },
      items: [
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.user'),
          flex: 1,
          minWidth: 200,
          bind: {
            readOnly: '{readOnly}',
            value: '{record.config__localOrders__credential__user}'
          }
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.domain'),
          flex: 1,
          minWidth: 200,
          bind: {
            value: '{record.config__localOrders__credential__domain}'
          }
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.password'),
          flex: 1,
          minWidth: 200,
          bind: {
            value: '{record.config__localOrders__credential__passwordNew}'
          }
        }
      ]
    }
  ]
})