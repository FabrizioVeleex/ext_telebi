/**
 * Created by fabrizio on 16/02/2024.
 */
Ext.define("spl.forms.documento.component.indirizzoSpedizione.Panel", {
  extend: "Ext.form.FieldSet",
  xtype: "v1-spl-forms-documento-indirizzospedizione",

  requires: [
    'Ext.container.Container',
    'Ext.form.field.HtmlEditor',
    'Ext.layout.container.HBox',
  ],
  title: Locale.t('spl.forms.documento.fields.destinazione.title'),
  defaults: { msgTarget: "side" },
  hidden: true,
  bind: {
    hidden: '{noDdt}'
  },
  items: [
    {
      xtype: 'container', flex: 1,
      layout: {
        type: "hbox"
      },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textfield', fieldLabel: Locale.t('spl.forms.documento.fields.destinazione.destinatario'),
          flex: 1, maxLength: 250, maxLengthText: Locale.t('global.maxlengthtext'),
          bind: { value: '{destinazione.destinatario}', readOnly: '{readOnly}' }
        },
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: {
        type: "hbox"
      },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textfield', fieldLabel: Locale.t('spl.forms.documento.fields.destinazione.indirizzo'),
          flex: 1, maxLength: 250, maxLengthText: Locale.t('global.maxlengthtext'),
          bind: { value: '{destinazione.indirizzo}', readOnly: '{readOnly}' }
        },
        {
          xtype: 'textfield', fieldLabel: Locale.t('spl.forms.documento.fields.destinazione.cap'),
          width: 250, maxLength: 10, maxLengthText: Locale.t('global.maxlengthtext'),
          bind: { value: '{destinazione.cap}', readOnly: '{readOnly}' }
        }
      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: {
        type: "hbox"
      },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textfield', fieldLabel: Locale.t('spl.forms.documento.fields.destinazione.localita'),
          flex: 1,
          width: 180,
          maxLength: 50,
          maxLengthText: Locale.t('global.maxlengthtext'),
          bind: {
            readOnly: '{readOnly}',
            value: '{destinazione.localita}'
          },
        },
        {
          xtype: 'textfield', fieldLabel: Locale.t('spl.forms.documento.fields.destinazione.provincia'),
          width: 90, maxLength: 4, maxLengthText: Locale.t('global.maxlengthtext'),
          bind: { value: '{destinazione.provincia}', readOnly: '{readOnly}' }
        },
        {
          xtype: 'textfield', fieldLabel: Locale.t('spl.forms.documento.fields.destinazione.regione'),
          flex: 1,
          bind: {
            readOnly: '{readOnly}',
            value: '{destinazione.regione}'
          }
        },
        {
          xtype: 'textfield', fieldLabel: Locale.t('spl.forms.documento.fields.destinazione.nazione'),
          flex: 1,
          bind: {
            readOnly: '{readOnly}',
            value: '{destinazione.nazionalita}'
          }
        }
      ]
    },
  ],
});
