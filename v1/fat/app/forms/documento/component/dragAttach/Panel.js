Ext.define("fat.forms.documento.component.dragAttach.Panel", {
  extend: "Ext.panel.Panel",
  xtype: "v1-fat-dragattach",
  border: true,
  html: '<div class="drag-file-label" style="float:left;">' +
    Locale.t("fat.forms.documento.btn.tagattach.trascina") +
    '</div>' +
    '<div class="drag-file-icon"></div>',

});
