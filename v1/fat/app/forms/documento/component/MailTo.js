Ext.define("fat.forms.documento.component.MailTo", {
  extend: "Ext.form.field.Tag",
  xtype: "v1-fat-mailtag",
  filterPickList: true,
  displayField: "email",
  valueField: "email",
  createNewOnEnter: true,
  minChars: 3,
  queryMode: "remote",
  hideTrigger: true,
  emptyText: Locale.t("fat.forms.documento.btn.inseriscimail"),
  fieldLabel: Locale.t("fat.forms.documento.fields.mailto"),
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
          validate = Locale.t("fat.forms.documento.cards.newmail.invalidemail");
        }
      });
    }
    return validate;
  },
});
