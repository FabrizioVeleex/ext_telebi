/**
 * Created by fabrizio on 20/12/23.
 */
Ext.define('spl.global.filtri.combo_fat.Fieldset', {
  extend: 'Ext.form.FieldSet',
  require: [
    "spl.forms.documento.component.fieldAssociazione.ComboSoggetto"
  ],
  // layout: {
  //   type: 'vbox'
  // },
  title: Locale.t("spl.grids.documenti.fat.fieldset") + "/" + Locale.t("spl.grids.documenti.filtrocli"),
  userCls: "y-filtri-panel-default y-filtri-panel-date",
  defaults: {
    width: 260,
  },

  items: [
    {
      xtype: 'panel',
      userCls: 'y-filtri-panel-field-transparent',
      layout: {
        type: 'vbox'
      },
      defaults: {
        width: 260,
        labelAlign: "top",
      },
      items: [
        {
          fieldLabel: Locale.t("spl.grids.documenti.fat.fieldset"),
          labelCls: "y-filtri-panel-field-label-date",
          userCls: 'y-filtri-panel-field-transparent',
          xtype: "combo",
          editable: false,
          displayField: "name", valueField: "id",
          bind: {
            value: "{filtri.params.combo_fat}",
            store: "{storeComboFat}",
          },
        },
        {
          xtype: "v1-spl-global-filtri-combocli",
          fieldLabel: Locale.t("spl.grids.documenti.filtrocli"),
          labelCls: "y-filtri-panel-field-label-date",
          userCls: 'y-filtri-panel-field-transparent',
          displayField: "ragsoc", valueField: "id",
          bind: {
            value: "{filtri.params.id_sogg_fat}",
            store: "{storeComboCli}",
          },
        },
      ]
    }

  ],
  listeners: {

  }
});