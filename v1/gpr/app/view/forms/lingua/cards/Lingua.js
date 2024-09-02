/**
 * Created by luke on 12/02/21.
 */
Ext.define("gpr.view.forms.lingua.cards.Lingua", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.TextField",
    "Ext.layout.container.HBox",
  ],
  scrollable: "y",
  items: [
    {xtype: "container", flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: "top", msgTarget: "side" },
      items: [
        {xtype: "textfield", fieldLabel: Locale.t("gpr.forms.lingua.fields.codice"),
          width:300, allowBlank: false, blankText: Locale.t("global.form.blanktext"), maxLength: 5,
          maxLengthText: Locale.t("global.form.maxlengthtext"),
          bind: { readOnly: "{readOnly}", value: "{record.codice}" }
        }
      ]
    },
    {xtype: "container", flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: "top", msgTarget: "side" },
      items: [
        {xtype: "textfield", fieldLabel: Locale.t("gpr.forms.lingua.fields.descrizione"),
          flex: 1, maxLength: 250, maxLengthText: Locale.t("global.form.maxlengthtext"),
          bind: { readOnly: "{readOnly}", value: "{record.descrizione}" }
        }
      ]
    }
  ]
});
