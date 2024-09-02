/**
 * Created by Fabrizio on 19/12/2016.
 */
Ext.define("sdcpub.view.main.DocumentiUpload", {
  extend: "Ext.grid.Panel",
  requires: [
      "Ext.grid.ActionColumn"
  ],
  minHeight: 100,
  columns: [
    {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
      items: [{
        getClass: function( view, meta, record){
          return 'x-fas fa-trash bd-color-red'
        },
        handler: "onDeleteAttach"
      }]
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
