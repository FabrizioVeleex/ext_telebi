Ext.define("t40.view.forms.documento.component.MailTo", {
  extend: "Ext.form.field.Tag",
  xtype: "v1-t40-mailtag",
  filterPickList: true,
  displayField: "email",
  valueField: "email",
  createNewOnEnter: true,
  minChars: 3,
  queryMode: "remote",
  hideTrigger: true,
  emptyText: "Inserire email...",
  fieldLabel: Locale.t("t40.forms.documento.fields.mailto"),
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
          validate = "Email non valida";
        }
      });
    }
    return validate;
  },
});
