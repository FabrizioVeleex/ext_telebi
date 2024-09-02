/**
 * Created by fabrizio on 20/02/17.
 */
Ext.define("recpub.view.form.resi.dettaglio.PanelController", {
  extend: "Ext.app.ViewController",
  alias: "controller.dettaglio",
  requires: [
    "recpub.view.form.resi.dettaglio.ViewModel",
    "recpub.view.form.resi.info",
    "recpub.view.form.resi.dettaglio.GridArticoli",
    "Ext.form.FieldSet",
    "Ext.form.field.Display",
    "Ext.button.Button",
    "Ext.layout.container.Fit",
    "Ext.toolbar.Toolbar",
    "Ext.form.Panel",
    "Ext.container.Container",
    "Ext.layout.container.HBox",
    "Ext.form.field.Text",
    "Ext.panel.Panel",
  ],
  /**
   * Called when the view is created
   */

  init: function () {
    this.indexItems = 0;
  },

  /*
    creo primo container per inserirmento valori
     */
  onAfterRender: function () {
    let me = this;
    this.info = Ext.create("recpub.view.form.resi.info");
    me.getView().add(this.info);
    if (!this.dataForm) {
      this.dataForm = Ext.create("recpub.view.form.resi.dettaglio.ViewModel");
      this.dataForm.setId(this.getView().idDettaglio);
      this.dataForm.load();
    }

    // debugger;
    let storeArticoli = me.getViewModel().getStore("storearticoli");
    storeArticoli.getProxy().extraParams.id = this.getView().idDettaglio;
    storeArticoli.load();

    let gridArticolo = Ext.create("recpub.view.form.resi.dettaglio.GridArticoli", {
      bind: {
        store: "{storearticoli}",
      },
    });
    // this.dataForm.load({
    //     failure: function (record) {
    //         debugger;
    //         console.log('error');
    //     },
    //     success: function (record) {
    //         debugger;
    //         me.info.hide();
    //         me.getViewModel().set('record',record.data);
    //         let storeArticoli = me.getViewModel().getStore('storearticoli');
    //         storeArticoli.removeAll(); //cancello tutti i record in frontend
    //         //ricreo nello store i records dal backend
    //         record.data.dataArticoli.forEach(function (rec) {
    //             storeArticoli.add(Ext.create('recpub.model.form.GridArticoli', rec));
    //         });
    //
    //         let gridArticolo = Ext.create('recpub.view.form.resi.dettaglio.GridArticoli',{
    //
    //         });
    this.form = Ext.create("Ext.form.Panel", {
      scrollable: "y",
      items: [
        {
          xtype: "panel",
          reference: "info-dett",
          bodyCls: "innerGrid",
          defaults: { labelWidth: 100 },
          items: [
            {
              xtype: "panel",
              bodyCls: "fieldsetGrid",
              dockedItems: [
                {
                  xtype: "toolbar",
                  dock: "top",
                  items: [
                    { xtype: "button", text: Locale.t("recpub.main.btn.torna.text"), ui: "acblue", cls: "btnupper", handler: "onBtnCloseDettaglio" },
                  ],
                },
              ],
            },
            {
              xtype: "container",
              layout: "hbox",
              bodyCls: "fieldsetGrid",
              items: [
                {
                  xtype: "textfield",
                  fieldLabel: Locale.t("recpub.grids.articoli.fields.numero"),
                  width: 400,
                  readOnly: true,
                  bind: { value: "{record.progressivo}" },
                },
                { xtype: "displayfield", width: 50 },
                {
                  xtype: "textfield",
                  fieldLabel: Locale.t("recpub.grids.articoli.fields.datadoc"),
                  width: 300,
                  readOnly: true,
                  bind: { value: "{record.datadoc}" },
                },
              ],
            },
            {
              xtype: "fieldset",
              layout: "fit",
              cls: "fieldsetGrid",
              collapsible: false,
              collapsed: false,
              minHeight: 150,
              title: Locale.t("recpub.grids.articoli.title"),
              items: [{ xtype: "panel", bodyCls: "gridArticoli", items: [gridArticolo] }],
            },
          ],
        },
      ],
      listeners: {
        //resize:'onResize'
      },
    });

    me.getView().add(this.form);
    me.getView().setActiveItem(this.form);
    // }
    // });
  },
  onBtnCloseDettaglio: function () {
    this.getView().fireEvent("onBtnCloseDettaglio", this);
  },
});
