
Ext.define('prd.global.cdl.cards.config.component.Agent', {
  extend: 'Ext.form.FieldSet',
  xtype: "global-cdl-cards-config-component-agent",
  collapsible: false, collapsed: false,
  title: `<span style="color: black;font-weight:bold">${Locale.t('prd.forms.cdl.cards.config.agent.title')}</span>`,
  style: { 'background-color': "transparent;" },
  items: [
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'displayfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.agent'),
          minWidth: 180,
          flex: 1,
          bind: {
            readOnly: '{readOnly}',
            value: '{record.agent__name}'
          }
        },
        {
          xtype: 'numberfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.interval'),
          width: 130,
          bind: {
            value: '{record.agent__interval}'
          }
        },
        {
          xtype: 'combobox',
          fieldLabel: Locale.t('prd.forms.cdl.cards.config.agent.status.title'),
          width: 300, forceSelection: true,
          allowBlank: false, blankText: Locale.t('global.form.blanktext'), autoLoadOnValue: true,
          displayField: 'value',
          valueField: 'id',
          editable: false,
          store: {
            xtype: "store",
            fields: ['id', 'share'],
            data: [
              { id: 0, value: Locale.t('prd.forms.cdl.cards.config.agent.status.list.c0') },
              { id: 1, value: Locale.t('prd.forms.cdl.cards.config.agent.status.list.c1') },
              { id: 2, value: Locale.t('prd.forms.cdl.cards.config.agent.status.list.c2') },
              { id: 3, value: Locale.t('prd.forms.cdl.cards.config.agent.status.list.c3') }
            ],

          },
          bind: {
            readOnly: '{readOnly}',
            value: '{record.agent__status}'
          },
        },
      ]
    },
  ]
})