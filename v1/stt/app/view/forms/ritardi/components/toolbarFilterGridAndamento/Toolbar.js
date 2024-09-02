/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.ritardi.components.toolbarFilterGridAndamento.Toolbar", {
  extend: "Ext.Toolbar",

  items: [
    {
      xtype: "combobox",
      minChars: 3,
      width: 200,
      matchFieldWidth: false,
      emptyText: Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.cli") + ": " + Locale.t("global.form.combo.combo"),
      forceSelection: true,
      allowBlank: true,
      bind: {
        store: "{storeSoggetti}",
        // value: "{record.idsoggetto}",
      },
      triggers: {
        clear: {
          cls: "x-form-clear-trigger",
          hidden: true,
          handler: "onClearTriggetCombo",
        },
      },
      valueField: "codice",
      displayField: "rag_soc",
      nameColumn: 'cdcli',
      tpl: Ext.create(
        "Ext.XTemplate",
        '<ul class="x-list-plain"><tpl for=".">',
        '<li role="option" class="x-boundlist-item"><i>{codice}</i> - <b>{rag_soc}</b></li>',
        "</tpl></ul>"
      ),
      listeners: {
        select: "onFilterCombo",
        afterRender: function (combo) {
          combo.getTrigger("picker").hide();
        },
        beforequery: function (qe) {
          delete qe.combo.lastQuery;
        },
      },
    },
    {
      xtype: "combobox",
      minChars: 3,
      width: 200,
      matchFieldWidth: false,
      emptyText: Locale.t("stt.forms.ritardi.dettaglio.gridandamento.columns.art") + ": " + Locale.t("global.form.combo.combo"),
      forceSelection: true,
      bind: {
        store: "{storeItems}",
      },
      triggers: {
        clear: {
          cls: "x-form-clear-trigger",
          hidden: true,
          handler: "onClearTriggetCombo",
        },
      },
      valueField: "cd_art",
      displayField: "cd_art",
      nameColumn: 'cd_art',
      tpl: Ext.create(
        "Ext.XTemplate",
        '<ul class="x-list-plain"><tpl for=".">',
        '<li role="option" class="x-boundlist-item"><i>{cd_art}</i> - <b>{descr_art}</b></li>',
        "</tpl></ul>"
      ),
      listeners: {
        afterRender: function (combo) {
          combo.getTrigger("picker").hide();
        },
        select: "onFilterCombo",
        beforequery: function (qe) {
          delete qe.combo.lastQuery;
        },
      },
    },
    {
      xtype: "combobox",
      minChars: 1,
      width: 90,
      matchFieldWidth: false,
      emptyText: "Cl.Mer.: " + Locale.t("global.form.combo.combo"),
      forceSelection: true,
      value: null,
      bind: {
        store: "{storeClasseMerceologica}",
      },
      triggers: {
        clear: {
          cls: "x-form-clear-trigger",
          hidden: true,
          handler: "onClearTriggetCombo",
        },
      },
      tpl: Ext.create(
        "Ext.XTemplate",
        '<ul class="x-list-plain"><tpl for=".">',
        '<li role="option" class="x-boundlist-item"><i>{cd_clm}</i> - <b>{descr_clm}</b></li>',
        "</tpl></ul>"
      ),
      valueField: "cd_clm",
      displayField: "cd_clm",
      nameColumn: 'cd_clm',
      listeners: {
        afterRender: function (combo) {
          combo.getTrigger("picker").hide();
        },
        select: "onFilterCombo",
        beforequery: function (qe) {
          delete qe.combo.lastQuery;
        },
      },
    },
  ],
});
