Ext.define("bol.view.forms.documento.component.dragAttach.Panel", {
  extend: "Ext.panel.Panel",
  xtype: "v1-bol-dragattach",
  border: true,
  html: '<div class="drag-file-label" style="float:left;">' +
    Locale.t("bol.forms.documento.btn.tagattach.trascina") +
    '</div>' +
    '<div class="drag-file-icon"></div>',

});
