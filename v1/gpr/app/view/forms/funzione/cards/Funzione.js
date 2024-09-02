/**
 * Created by luke on 12/02/21.
 */
Ext.define("gpr.view.forms.funzione.cards.Funzione", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.TextField",
    "Ext.layout.container.HBox",
    'Ext.form.field.ComboBox'
  ],
  scrollable: "y",
  items: [
    {xtype: "container", flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: "top", msgTarget: "side" },
      items: [
        {xtype: "textfield", fieldLabel: Locale.t("gpr.forms.funzione.fields.codice"),
          width:300, allowBlank: false, blankText: Locale.t("global.form.blanktext"), maxLength: 4,
          maxLengthText: Locale.t("global.form.maxlengthtext"),
          bind: { readOnly: "{readOnly}", value: "{record.codice}" }
        }
      ]
    },
    {xtype: "container", flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: "top", msgTarget: "side" },
      items: [
        {xtype: "textfield", fieldLabel: Locale.t("gpr.forms.funzione.fields.descrizione"),
          flex: 1, maxLength: 250, maxLengthText: Locale.t("global.form.maxlengthtext"),
          bind: { readOnly: "{readOnly}", value: "{record.descrizione}" }
        }
      ]
    },
    {xtype: 'container', flex: 1,
      layout: {type: "hbox"},
      defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
      items: [
        {xtype: 'combo', fieldLabel: Locale.t('gpr.forms.funzione.fields.colonna'),
          width: 500,  allowBlank: false,blankText: Locale.t('global.form.blanktext'),
          displayField: 'descrizione', valueField: 'descrizione', queryMode: 'local', forceSelection: true,
          bind: {store: '{comboColonna}', value: '{record.colonna}', readOnly: '{readOnly}'}
        }
      ]
    }
  ]
});
