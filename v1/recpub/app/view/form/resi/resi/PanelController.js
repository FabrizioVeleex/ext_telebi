/**
 * Created by fabrizio on 19/02/17.
 */
Ext.define("recpub.view.form.resi.resi.PanelController", {
  extend: "Ext.app.ViewController",
  alias: "controller.resi",
  requires: [
    "Ext.panel.Panel",
    "Ext.container.Container",
    "Ext.button.Button",
    "recpub.view.form.resi.resi.GridOpen",
    "Ext.toolbar.Fill",
    "Ext.toolbar.Toolbar",
    "Ext.form.field.Display",
  ],

  init: function () {
    this.panelNew = Ext.create("Ext.panel.Panel", {
      style: {
        padding: "20px 0",
      },
      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          border: 2,
          style: {
            borderColor: "#bfbfbf",
            borderStyle: "solid",
            "border-width": "1px !important",
            "background-color": "#E4E5E4",
          },
          items: [
            { xtype: "displayfield", cls: "textwelcome", value: Locale.t("recpub.textwelcome") },
            { xtype: "tbfill" },
            { xtype: "button", ui: "acblue", text: Locale.t("recpub.grids.resi.btn.new"), handler: "onNewPratica" },
          ],
        },
      ],
    });

    this.panelOpen = Ext.create("recpub.view.form.resi.resi.GridOpen", {
      height: 450,
    });
  },

  onReloadGrid: function () {
    this.panelOpen.getStore().load();
  },
  onNewPratica: function () {
    this.getView().fireEvent("onNewPratica");
  },
  onDettaglioOpen: function (view, rowIndex, colIndex, item, opt, record) {
    this.getView().fireEvent("onDettaglioOpen", record.id);
  },

  onAfterRender: function () {
    this.getView().add([
      {
        xtype: "panel",
        cls: "inner",
        items: [
          this.panelNew,
          { xtype: "container", height: 50, html: '<span class="titleactive">' + Locale.t("recpub.forms.attive") + "</span>" },
          this.panelOpen,
        ],
      },
    ]);
  },
  onAfterRenderGrid: function (grid) {
    var store = grid.getStore();
  },
});
