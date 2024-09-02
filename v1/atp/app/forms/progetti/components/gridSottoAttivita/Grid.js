/**
 * Created by luke on 17/03/21.
 */
Ext.define("atp.app.forms.progetti.components.gridSottoAttivita.Grid", {
  extend: "portal.v1.view.forms.grids.DefaultGrid",

  xtype: "v1-atp-forms-progetti-components-gridSottoAttivita",
  requires: [
    "Ext.grid.column.Action",
    "Ext.grid.column.Date",
    'Ext.grid.plugin.CellEditing',
  ],
  minHeight: 120,
  flex: 1,
  bind: {
    store: '{storeSubActivity}'
  },

  plugins: {
    ptype: 'cellediting',
    clicksToEdit: 1
  },

  columns: [
    {
      xtype: 'actioncolumn',
      width: 30,
      menuDisabled: true,
      resizable: false,
      dataIndex: 'action',
      items: [
        {
          getClass: function (view, meta, record) {
            //ACTION 2=delete, 1=modificato, 0=invariato ?
            if (record.get('action') === 2) {
              meta.tdAttr = 'data-qtip="' + Locale.t("atp.forms.projects.components.gridsubactivity.resettodo") + '"';
              return 'x-fas fa-plus-circle';
            } else {
              if (record.get('isnew') === 0 || (record.get('isnew') === 1 && record.get('titolo') === "" && record.get('priorita') === 0 && record.get('priorita') === 0)) {
                meta.tdAttr = 'data-qtip="' + Locale.t("atp.forms.projects.components.gridsubactivity.deletetodo") + '"';
                return 'x-fas fa-minus-circle';
              }
            }
            return 'x-fas fa-user-plus';
          },
          handler: function (view, rowIndex, colIndex, item, event, record) {
            let vm = this.lookupViewModel(),
              contr = this.lookupController()

            if (vm.get('readOnly') === true) {
              return false
            }
            let gridVer = view.up('grid'),
              lastrecord = gridVer.getStore().last()
            if (record.get('action') === 2) {
              record.set('action', 0)
            } else {
              if (record.data.isnew === 0) {
                record.set('action', 2)
              } else {
                if (lastrecord !== record) {
                  view.getStore().remove(record);
                }
              }
            }
          }
        }
      ]
    },

    {
      flex: 1,
      menuDisabled: true,
      resizable: false,
      sortable: false,
      text: Locale.t("atp.forms.projects.components.gridsubactivity.columns.title"),
      minWidth: 150,
      dataIndex: "title",
      renderer: function (value, metaData, record) {
        return record.data.title
      },
      getEditor: function (record) {
        return {
          xtype: "textfield",
          bind: {
            disabled: '{readOnly}'
          },
        }
      },
    },
    {
      text: Locale.t("atp.forms.projects.components.gridsubactivity.columns.expiredate"),
      minWidth: 170,
      dataIndex: "expireDate",
      menuDisabled: true,
      resizable: false,
      sortable: false,
      renderer: function (value, metaData, record) {
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
      text: Locale.t("atp.forms.projects.components.gridsubactivity.columns.priority"),
      dataIndex: "priority",
      menuDisabled: true,
      resizable: false,
      sortable: false,
      renderer: function (value, metaData, record) {
        return record.data.priority
      },
      getEditor: function (record) {
        return {
          xtype: "numberfield",
          minValue: 0,
          maxValue: 10,
          defaultValue: null,
          bind: {
            disabled: '{readOnly}'
          },
        }
      },
    },
    {
      text: Locale.t("atp.forms.projects.components.gridsubactivity.columns.status"),
      dataIndex: "status",
      menuDisabled: true,
      resizable: false,
      sortable: false,
      renderer: function (value, metaData, record) {
        switch (value) {
          case 0:
            return "Da fare"
            break;
          case 1:
            return "In corso"
            break;
          case 2:
            return "Terminato"
            break;
          default:
            break;
        }
      },
      getEditor: function (record) {
        return {
          xtype: "numberfield",
          minValue: 0,
          maxValue: 2,
          defaultValue: null,
          bind: {
            disabled: '{readOnly}'
          },
        }
      },
    },
  ],

  listeners: {
    edit: "inserimentoRecordSubActivity",
    beforeEdit: "beforeEditGridSubActivity"
  }
});