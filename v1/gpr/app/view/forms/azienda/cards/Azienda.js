/**
 * Created by luke on 12/02/21.
 */
Ext.define("gpr.view.forms.azienda.cards.Azienda", {
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
        {xtype: "textfield", fieldLabel: Locale.t("gpr.forms.azienda.fields.cdcli"),
          width:300, allowBlank: false, blankText: Locale.t("global.form.blanktext"), maxLength: 6,
          maxLengthText: Locale.t("global.form.maxlengthtext"),
          bind: { readOnly: "{readOnly}", value: "{record.cdcli}" }
        }
      ]
    },
    {xtype: "container", flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: "top", msgTarget: "side" },
      items: [
        {xtype: "textfield", fieldLabel: Locale.t("gpr.forms.azienda.fields.ragsoc"),
          flex: 1, maxLength: 250, maxLengthText: Locale.t("global.form.maxlengthtext"),
          bind: { readOnly: "{readOnly}", value: "{record.ragsoc}" }
        }
      ]
    },
    {xtype: "container", flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: "top", msgTarget: "side" },
      items: [
        {xtype: "textfield", fieldLabel: Locale.t("gpr.forms.azienda.fields.codifica"),
          width:300, allowBlank: false, blankText: Locale.t("global.form.blanktext"), maxLength: 6,
          maxLengthText: Locale.t("global.form.maxlengthtext"),
          bind: { readOnly: "{readOnly}", value: "{record.codifica}" }
        }
      ]
    }
  ]
});
