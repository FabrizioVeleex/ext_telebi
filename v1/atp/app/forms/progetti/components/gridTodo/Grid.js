/**
 * Created by luke on 17/03/21.
 */
Ext.define("atp.app.forms.progetti.components.gridTodo.Grid", {
  extend: "Ext.tree.Panel",
  xtype: "v1-atp-forms-progetti-components-gridTodo",
  controller: "treepaneltodo",

  requires: [
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tree.*',
    'Ext.grid.column.Check',
    'Ext.grid.plugin.CellEditing',
    'atp.app.forms.progetti.components.gridTodo.Controller',

  ],

  title: 'Segna Todo',
  flex: 1,
  minHeight: 350,

  bind: {
    store: '{storeTodo}'
  },

  store: {
    type: 'tree',
    folderSort: true,
    // proxy: {
    //   type: 'ajax',
    //   url: 'data/tree/treegrid.json'
    // }
  },

  plugins: {
    ptype: 'cellediting',
    clicksToEdit: 1
  },

  viewConfig: {
    listeners: {
      beforecellclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if (cellIndex === 0) { // Check if it's the Email column
          grid.grid.getPlugins()[0].clicksToEdit = 0;
        }
      }
    }
  },

  reserveScrollbar: true,
  useArrows: true,
  rootVisible: false,
  multiSelect: true,
  singleExpand: false,

  columns: [
    {
      xtype: "checkcolumn",
      dataIndex: "completed",
      width: 100,
      resizable: false,
      menuDisabled: true,
      stopSelection: false,
      // getEditor: function (record) {
      //   return {
      //     bind: {
      //       disabled: '{readOnly}',
      //     },
      //   }
      // }
    },
    {
      xtype: "treecolumn",
      text: "_Titolo",
      dataIndex: "title",
      flex: 1,
      getEditor: function (record) {
        return {
          xtype: "textfield",
          bind: {
            disabled: '{readOnly}'
          }
        }
      },
    },
    {
      text: "_Descrizione",
      hidden: false,
      dataIndex: "description",
      width: 0,
      getEditor: function (record) {
        return {
          xtype: "textfield",
          bind: {
            disabled: '{readOnly}'
          }
        }
      },
    },
    {
      text: "_Tipo di attività",
      hidden: true,
      dataIndex: "activityType",
      flex: 1,
      getEditor: function (record) {
        return {
          xtype: "textfield",
          bind: {
            disabled: '{readOnly}'
          }
        }
      },
    },
    {
      text: "_Data di scadenza",
      dataIndex: "expireDate",
      minWidth: 180,
      renderer: function (value, meta, record) {
        let data = Ext.Date.format(new Date(value), "d/m/Y");
        return data
      },
      getEditor: function (record) {
        return {
          xtype: "datefield",
          minValue: new Date(),
          bind: {
            disabled: '{readOnly}',
            maxValue: '{record.expireDate}'
          },
        }
      },
    },
    {
      text: "_Priorità",
      dataIndex: "priority",
      minWidth: 180,
      renderer: function (value, metaData, record) {
        if (value < 4) {
          return value + " - Bassa"
        } else if (value >= 4 && value < 8) {
          return value + " - Media"
        } else {
          return value + " - Alta"
        }
      },
      getEditor: function (record) {
        return {
          xtype: "numberfield",
          minValue: 0,
          maxValue: 10,
          defaultValue: null,
          bind: {
            disabled: '{readOnly}',
          },
        }
      },
    },
    {
      text: "_Avanzamento",
      dataIndex: "progress",
      minWidth: 180,
      getEditor: function (record) {
        return {
          xtype: "numberfield",
          minValue: 0,
          maxValue: 2,
          defaultValue: null,
          bind: {
            disabled: '{readOnly}',
          },
        }
      },
      renderer: function (value, metaData, record) {
        switch (value) {
          case 0:
            return value + " - Da fare"
            break;
          case 1:
            return value + " - In corso"
            break;
          case 2:
            return value + "- Terminato"
            break;
          default:
            break;
        }
      },
    },
  ],

  root: {
    text: "root",
    children: [
      {
        title: " ",
        emptyText: "...",
        expireDate: new Date(),
        priority: 8,
        progress: 0,
        completed: false,
        children: [
          {
            xtype: "actioncolumn",
            iconCls: "x-fas fa-plus bd-color-blue",
            dataIndex: "newTodo",
            handler: "onNewTodo",
            width: 30,
            align: "center"
          }
        ]
      },

    ]
  },

  listeners: {
    afterrender: "onAfterRender",
    // edit: "onEditTreeGrid",
    beforeactivate: "onBeforeActivate"
  }
});