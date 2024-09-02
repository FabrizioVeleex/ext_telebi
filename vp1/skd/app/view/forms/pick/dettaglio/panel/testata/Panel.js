Ext.define('skd.view.forms.pick.dettaglio.panel.testata.Panel', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.button.Button',
    'Ext.container.Container',
    'Ext.form.field.Checkbox',
    'Ext.form.field.Date',
    'Ext.form.field.Display',
    'Ext.form.field.Text',
    'Ext.layout.container.HBox',
  ],
  bodyPadding: 5,
  items: [
    {
      xtype: 'container', layout: 'hbox', padding: '0 0 5 0',
      defaults: {
        msgTarget: 'under',
        labelAlign: 'left',
        userCls: 'goma-date-filter'
      },
      items: [

        {
          xtype: 'button',
          iconCls: 'fas ',
          bind: {
            iconCls: '{iconCls}'
          },
          style: 'background:transparent; border:none;',
          handler: 'onOpenNote'
        },
        {
          fieldLabel: Locale.t('skd.forms.pick.dettaglio.fields.list'),
          xtype: 'textfield',
          editable: false,
          value: '',
          bind: {
            readOnly: '{readOnly}',
            value: '{record.lista_preparatori}'
          },
          triggers: {
            foo: {
              // cls: 'fas fa-plus',
              handler: 'onAddPreparatore'
            }
          },
          minWidth: 300,
          flex: 1
        },
        // { xtype: 'displayfield', width: 20 },
        // {
        //   xtype: 'checkboxfield',
        //   width: 130,
        //   boxLabel: Locale.t('skd.forms.pick.dettaglio.fields.in_prod'),
        //   name: 'in_produzione',
        //   itemId: 'in_produzione',
        //   bind: {
        //     disabled: '{in_produzione}',
        //     value: '{record.in_produzione}'
        //   },
        //   listeners: {
        //     change: 'onCheckChange'
        //   },
        //   inputValue: '1'
        // }
      ]
    }
  ]


})