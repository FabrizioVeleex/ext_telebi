/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("atp.forms.progetti.components.comboRuoli.Combo", {
  requires: [
    "atp.forms.components.comboRuoli.Store"
  ],
  extend: "Ext.form.ComboBox",
  xtype: "comboRuoli",
  labelWidth: 150,
  displayField: "role",
  valueField: "idRole",
  emptyText: Locale.t("global.grid.store.emptytext"),
  queryMode: "local",
  forceSelection: true,
  autoLoadOnValue: true,
  bind: {
    readOnly: "{readOnly}", //TODO gestire in base al ruolo
  },
  initComponent: function () {
    this.store = Ext.create("atp.forms.components.comboRuoli.Store");
    this.callParent()
    //TODO ho id???
  }
});
