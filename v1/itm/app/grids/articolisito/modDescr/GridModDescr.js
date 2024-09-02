/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("itm.grids.articolisito.modDescr.GridModDescr", {
  extend: "Ext.grid.Panel",
  alias: "widget.gridmoddescr",
  plugins: {
    ptype: 'cellediting',
    clicksToEdit: 1,
  },
  viewConfig: {
    enableTextSelection: true,
  },
  columns: [
    {
      text: Locale.t("itm.grids.articoli.moddesc.columns.description"),
      dataIndex: "descrizione",
      flex: 1
    },
    {
      text: Locale.t("itm.grids.articoli.moddesc.columns.changeddescription"),
      dataIndex: "descrizioneMod",
      flex: 1,
      getEditor: function () {
        return { xtype: 'textfield' }
      }
    },
    {
      xtype: "actioncolumn",
      maxWidth: 30,
      minWidth: 30,
      menuDisabled: true,
      dataIndex: "pubblica_sito",
      resizable: false,
      items: [
        {
          handler: 'onRestoreDescriptionSingle',
          getClass: function (v, metadata, r) {
            if (r.data.descrizione !== r.data.descrizioneMod) {
              metadata.tdAttr = `data-qtip="${Locale.t('itm.grids.articoli.moddesc.columns.undo')}"`;
              return "bd-action-null x-fas fa-undo y-icon-color-orange";
            }
            return "bd-action-null ";
          },
        },
      ],
    }
  ],
});
