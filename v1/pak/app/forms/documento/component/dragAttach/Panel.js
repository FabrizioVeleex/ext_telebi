Ext.define("pak.view.forms.documento.component.dragAttach.Panel", {
  extend: "Ext.panel.Panel",
  xtype: "v1-pak-dragattach",
  border: true,
  html: '<div class="drag-file-label" style="float:left;">' +
    Locale.t("pak.forms.documento.btn.tagattach.trascina") +
    '</div>' +
    '<div class="drag-file-icon"></div>',

});
