Ext.define("bol.forms.documento.component.tagEmail.Combo", {
  extend: "Ext.form.field.Tag",
  xtype: "v1-bol-forms-documnto-tagmail",
  filterPickList: true,
  displayField: "email",
  valueField: "email",
  createNewOnEnter: true,
  minChars: 3,
  queryMode: "remote",
  hideTrigger: true,
  emptyText: Locale.t("bol.forms.documento.btn.inseriscimail"),
  fieldLabel: Locale.t("bol.forms.documento.fields.mailto"),
  tpl: Ext.create(
    "Ext.XTemplate",
    '<ul class="x-list-plain"><tpl for=".">',
    '<li role="option" class="x-boundlist-item"><i>{nominativo}</i> - <b>{email}</b></li>',
    "</tpl></ul>"
  ),
  validator: function (val) {
    let validate = true;
    if (typeof val === "object") {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      val.forEach(function (string) {
        if (!re.test(String(string).trim().toLowerCase())) {
          validate = Locale.t("bol.forms.documento.cards.newmail.invalidemail");
        }
      });
    }
    return validate;
  },
});
