/**
 * Created by luke on 17/03/21.
 */
Ext.define("atp.app.forms.progetti.components.grisAssociazioneRuoli.Grid", {
  extend: "portal.v1.view.forms.grids.DefaultGrid",
  xtype: "v1-atp-forms-projects-components-gridConnectedUsers",
  requires: [
    "Ext.grid.column.Action",
    "Ext.grid.column.Date",
    'Ext.grid.plugin.CellEditing',
    'atp.forms.progetti.components.comboUsers.Combo',
    'atp.forms.progetti.components.comboRuoli.Combo',
  ],
  minHeight: 120,
  selType: 'cellmodel',
  bind: {
    store: '{storeConnectedUsers}'
  },
  plugins: {
    ptype: 'cellediting',
    clicksToEdit: 1
  },

  columns: [
    {
      xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false, dataIndex: 'action',
      items: [
        {
          getClass: function (view, meta, record) {
            //ACTION 2=delete, 1=modificato, 0=invariato ?

            if (record.get('action') === 2) {
              meta.tdAttr = 'data-qtip="' + Locale.t("atp.forms.projects.components.gridconnectedusers.resettodo") + '"';
              return 'x-fas fa-plus-circle';
            } else {
              if (record.get('isnew') === 0 || (record.get('isnew') === 1 && record.get('idUser') === null && record.get('idRuolo') === null)) {
                meta.tdAttr = 'data-qtip="' + Locale.t("atp.forms.projects.components.gridconnectedusers.deletetodo") + '"';
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
      flex: 1, menuDisabled: true, resizable: false, sortable: false,
      text: Locale.t('atp.forms.projects.components.gridconnectedusers.columns.users'),
      renderer: function (value, metaData, record) {
        return record.data.nominativo
      },
      getEditor: function (record) {
        return Ext.create('atp.forms.progetti.components.comboUsers.Combo', {
          listeners: {
            change: function (combo, newValue, oldValue, opts) {
              if (newValue !== null && newValue !== "") {
                let controller = this.lookupController()
                vm = controller.getViewModel()
                storeAssociazioneRuoli = controller.getStore("storeConnectedUsers"), storeData = storeAssociazioneRuoli.data.items
                gridRecord = controller.gridRecord
                let pos = storeData.map((el) => el.data.id).indexOf(gridRecord.id)

                if (pos !== -1 && storeData[pos]) {
                  storeData[pos].data.nominativo = combo.rawValue;
                  storeData[pos].data.idUser = newValue;
                  storeAssociazioneRuoli.setData(storeData)
                }
              }
            }
          }
        })

      }
    },
    {
      flex: 1, menuDisabled: true, resizable: false, sortable: false,
      text: Locale.t('atp.forms.projects.components.gridconnectedusers.columns.role'),
      renderer: function (value, metaData, record) {
        return record.data.role
      },
      getEditor: function (record) {
        return Ext.create('atp.forms.progetti.components.comboRuoli.Combo', {
          listeners: {
            change: function (combo, newValue, oldValue, opts) {
              if (newValue !== null && newValue !== "") {
                let controller = this.lookupController()
                vm = controller.getViewModel()
                storeAssociazioneRuoli = controller.getStore("storeConnectedUsers"), storeData = storeAssociazioneRuoli.data.items
                gridRecord = controller.gridRecord
                let pos = storeData.map((el) => el.data.id).indexOf(gridRecord.id)

                if (pos !== -1 && storeData[pos]) {
                  storeData[pos].data.role = combo.rawValue;
                  storeData[pos].data.idRole = newValue;
                  storeAssociazioneRuoli.setData(storeData)
                }
              }
            }
          }
        })

      }
    },
  ],
  listeners: {
    edit: "inserimentoRecordAssociazioneRuoli",
    beforeEdit: "beforeEditGridAssociazioneRuoli"
  }
});