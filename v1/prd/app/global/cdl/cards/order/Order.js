
Ext.define('prd.global.cdl.cards.order.Order', {
  extend: 'Ext.form.FieldSet',
  xtype: "global-cdl-cards-order-order",
  collapsible: false, collapsed: false, labelAlign: 'top',
  title: `<span style="color: black;font-weight:bold">${Locale.t('prd.forms.cdl.cards.order.status.title')}</span>`,
  style: { 'background-color': "transparent;" },
  items: [
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { readOnly: true, margin: 5, msgTarget: 'side', labelAlign: 'top' },
      items: [

        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.idMrp'),
          flex: 1,
          minWidth: 200,
          bind: {
            value: '{record.idMrp}'
          }
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.order'),
          flex: 1,
          minWidth: 200,
          bind: {
            value: '{record.order}'
          }
        },
        {
          xtype: 'datefield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.dataSend'),
          flex: 1,
          minWidth: 200,
          format: 'm/d/Y H:i',
          bind: {
            value: '{record.startDate}'
          }
        }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { readOnly: true, margin: 5, msgTarget: 'side', labelAlign: 'top' },
      items: [
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.durata'),
          flex: 1,
          minWidth: 120,
          bind: {
            value: '{record.durata}'
          }
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.qtaIni'),
          flex: 1,
          minWidth: 90,
          bind: {
            value: '{record.qtaIni}'
          }
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.qtaProd'),
          flex: 1,
          minWidth: 90,
          bind: {
            value: '{record.qtaProd}'
          }
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('prd.forms.cdl.fields.qtaRim'),
          flex: 1,
          minWidth: 90,
          bind: {
            value: '{record.qtaRim}'
          }
        }
      ]
    }
  ]
})