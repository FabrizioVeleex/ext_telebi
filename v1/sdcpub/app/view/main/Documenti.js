/**
 * Created by Fabrizio on 19/12/2016.
 */
Ext.define("sdcpub.view.main.Documenti", {
  extend: "Ext.grid.Panel",
  requires: [
      "Ext.grid.ActionColumn"
  ],
  minHeight: 100,
  xtype: "gridallegati",
  columns: [
    {xtype: "actioncolumn", menuDisabled: true, resizable: false, sortable: false, width: 30,
      items: [
        {getClass: function () {
            return "x-fas fa-download";
          },
          getTip: function (v, meta, record) {
            return Locale.t('global.download.startdownload')+': <b>' + record.get('nomefile') + '</b>';
          },
          handler: "onGetAttach"
        }
      ]
    },
    {xtype: "actioncolumn", menuDisabled: true, resizable: false, sortable: false, width: 30,
      items: [
        {getClass: function (view, meta, record) {
            return "bd-action-null icon-" + record.get("estensione").replace('.', '')
          }
        }
      ]
    },
    {width: 120, menuDisabled: true, resizable: false, sortable: false, dataIndex: "dimensione",
      align: "right", renderer: "sizeFormat", text: Locale.t("sdcpub.forms.documento.columns.dimensione")
    },
    {flex: 1, menuDisabled: true, resizable: false, sortable: false, dataIndex: "nomefile",
      text: Locale.t("sdcpub.forms.documento.columns.nomefile")
    }
  ]
});
