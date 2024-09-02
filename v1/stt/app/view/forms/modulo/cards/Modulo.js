/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.modulo.cards.Modulo', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.TextField',
    'Ext.form.field.HtmlEditor',
    'Ext.layout.container.HBox'
  ],
  scrollable: 'y',
  items: [
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textfield', fieldLabel: Locale.t('stt.forms.modulo.fields.codice'),
          width: 200, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
          maxLength: 2, maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: { readOnly: '{readOnly}', value: '{record.codice}' }
        }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textfield', fieldLabel: Locale.t('stt.forms.modulo.fields.nome'),
          flex: 1, allowBlank: false, blankText: Locale.t('global.form.blanktext'),
          maxLength: 255, maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: { readOnly: '{readOnly}', value: '{record.nome}' }
        }
      ]
    },
    {
      xtype: "container", flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: "htmleditor", flex: 1, autoScroll: true, style: "font-size:14px;", minHeight: 200,
          itemId: 'descthtml', //id x problema getDoc
          bind: { readOnly: "{readOnly}", value: "{record.descrizione}" }
        }
      ]
    }
  ]
});