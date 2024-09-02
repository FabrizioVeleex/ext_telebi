
Ext.define('prd.global.cdl.cards.config.component.Programs', {
  extend: 'Ext.form.FieldSet',
  xtype: "global-cdl-cards-config-component-programs",
  collapsible: false, collapsed: false, labelAlign: 'top',
  title: '<span style="color: black;font-weight:bold">' + Locale.t('prd.forms.cdl.cards.config.programs.title') + '</span>',
  style: { 'background-color': "transparent;" },
  items: [
    {
      xtype: "container",
      html: `<span style="font-style:italic;">${Locale.t('prd.forms.cdl.cards.config.programs.subTitle')}</span>`
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, msgTarget: 'side', labelAlign: 'top' },
      items: [
        {
          xtype: 'combobox', fieldLabel: Locale.t('prd.forms.cdl.fields.share'),
          flex: 1, forceSelection: true,
          allowBlank: false, blankText: Locale.t('global.form.blanktext'), autoLoadOnValue: true,
          displayField: 'share',
          valueField: 'id',
          editable: false,
          store: {
            xtype: "store",
            fields: ['id', 'share'],
            proxy: {
              type: 'ajax',
              url: Backend.REST_API + "functions/getShare/",
              reader: {
                type: 'json',
                rootProperty: 'data'
              }
            }
          },
          bind: {
            readOnly: '{readOnly}',
            value: '{record.config__programs__share}'
          },
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.folder'),
          flex: 1,
          minWidth: 300,
          bind: {
            value: '{record.config__programs__folder}'
          }
        }
      ]
    },
  ]
})