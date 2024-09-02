/**
 * Created by fabrizio on 08/03/2022.
 */

Ext.define('pak.view.forms.config.cards.Email', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.TextField',
    'Ext.layout.container.HBox',
    'Ext.panel.Panel',
    'pak.view.forms.config.cards.email.TreePanel'
  ],
  scrollable: 'y',
  items: [
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textfield', fieldLabel: Locale.t('pak.forms.config.fields.mittente'),
          flex: 1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
          maxLength: 100, maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: { readOnly: '{readOnly}', value: '{record.email.mittente}' }
        }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textfield', fieldLabel: Locale.t('pak.forms.config.fields.replyto'),
          flex: 1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
          maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: { readOnly: '{readOnly}', value: '{record.email.replyTo}' }
        }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textfield', fieldLabel: Locale.t('pak.forms.config.fields.email'),
          flex: 1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
          maxLength: 250, maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: { readOnly: '{readOnly}', value: '{record.email.email}' }
        }
      ]
    },
    {
      xtype: 'panel',
      padding: 15,
      title: 'Traduzione', //TODO traduci
      items: [
        {
          xtype: 'v1-pak-tree-grid',
          bind: {
            store: '{email}'
          }
        }
      ]
    }
  ]
});