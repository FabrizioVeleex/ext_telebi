/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("atp.forms.progetti.components.comboUsers.Combo", {
  requires: [
    "atp.forms.progetti.components.comboUsers.Store"
  ],
  extend: "Ext.form.ComboBox",
  xtype: "comboUsers",
  // fieldLabel: Locale.t("gec.global.comboUser.label"),
  labelWidth: 150,
  displayField: "nominativo",
  valueField: "id",
  // emptyText: Locale.t("global.grid.store.emptytext"),
  queryMode: "remote",
  forceSelection: true,
  bind: {
    readOnly: "{readOnly}",
  },
  initComponent: function () {
    this.store = Ext.create("atp.forms.progetti.components.comboUsers.Store");
    this.callParent()
  },
  listeners: {
    afterrender: function (combo) {
      let record = this.lookupViewModel().get("record"),
        store = this.getStore(),
        proxy = store.getProxy();
      if (record && record.data.idUser && record.data.idUser.length === 32) {
        proxy.extraParams.id = record.data.idUser
        store.load(function () {
          delete proxy.extraParams.id
        })
      }
    }
  }
});
