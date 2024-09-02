/**
 * Created by luke on 29/09/21.
 */
Ext.define("stver.view.forms.filtri.Anno", {
  extend: "Ext.form.field.ComboBox",
  bind: {
    store: "{filtroAnno}",
  },
  queryMode:'remote',
  fieldLabel: Locale.t("stver.forms.filtri.anno"),
  displayField: "anno",
  valueField: "anno",
  matchFieldWidth: true,
  width: 350,
  editable:false,
  listeners: {
    select: "onChangeAnno",
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    },
  },
});
