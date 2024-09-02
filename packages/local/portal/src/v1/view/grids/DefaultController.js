Ext.define('portal.v1.view.grids.DefaultController', {
  extend: 'Ext.app.ViewController',
  requires: [
    'Ext.Toolbar',
    'Ext.form.DisplayField',
    'Ext.form.TextField',
    'Ext.toolbar.Fill',
    'Ext.util.DelayedTask',
    'Ext.util.Format',
    'portal.util.Locale'
  ],
  init: function () {
    this.setConfModRun = 0;
    this.listRecords = [];
    this.toolbar = Ext.create('Ext.Toolbar', {
      dock: 'top',
      bind: {
        hidden: '{toolbar}'
      },
      items: this.listBtnTop
    })

    this.toolbarFooter = Ext.create('Ext.Toolbar', {
      dock: 'bottom',
      bind: {
        hidden: '{toolbarFooter}'
      },
      items: [
        {
          xtype: 'textfield',
          width: 300,
          hasSearch: false,
          paramName: 'query',
          bind: {
            value: "{pattern}"
          },
          triggers: {
            clear: {
              cls: 'x-form-clear-trigger',
              hidden: true,
              handler: 'onClearTriggetSearch'
            },
            search: {
              cls: 'x-form-search-trigger',
              handler: 'onSearchTriggetSearch'
            }
          },
          listeners: {
            specialkey: 'onSpecialkeySearch'
          }
        },
        { xtype: 'tbfill' },
        {
          xtype: 'displayfield',
          itemId: 'totalCount'
        }
      ]
    })

    this.getView().addDocked(this.toolbar)
    this.getView().addDocked(this.toolbarFooter)
  },
  reloadGrid: function () {
    this.getView().getStore().load();
  },
  onGenExcel: function () {
    let me = this
    let list = []
    for (let record of this.listRecords) {
      list.push(record.data)
    }
    Ext.Ajax.request({
      method: 'POST',
      jsonData: list,
      binary: true,
      url: Backend.REST_VERSION + 'generateexcel',
      success: function (response) {
        //imposto un elemento nascosto x fare il download con il nome file che mi arriva
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        let headers = response.getAllResponseHeaders()
        let fileName = response.getResponseHeader('Content-Disposition').split("filename=")[1]
        if (fileName === '') { //se non ho filename di ritorno (eccezione) do un nome generico
          fileName = 'Download_file.xlsx'
        }
        let blob = new Blob([response.responseBytes], { type: headers['content-type'] })
        let binaryFile = window.URL.createObjectURL(blob)
        a.href = binaryFile
        a.download = fileName
        a.click()
        window.URL.revokeObjectURL(binaryFile)
      },
      failure: function (response) {
        Ext.Msg.show({
          title: Locale.t('global.errore'),
          msg: response.statusText,
          buttons: Ext.Msg.OK,
          icon: Ext.MessageBox.ERROR
        })
      }
    });


  },
  onitemdblclick: function (view, record) {
    this.createForm(view, record, 0);
  },
  onOpen: function (view, rowIndex, colIndex, item, opt, record) {
    this.createForm(view, record, 0);
  },


  onSearchTriggetSearch: function (item) {
    let grid = item.up('grid');
    if (!grid) grid = this.grid
    let store = grid.getStore();
    let proxy = store.getProxy();
    let value = item.getValue();
    if (value.length < 1) {
      if (item.hasSearch) {
        this.onClearTriggetSearch(item);
      }
      return;
    }
    item.getTrigger('clear').show();
    proxy.extraParams.pattern = value;
    store.load();
    item.hasSearch = true;
  },
  onSpecialkeySearch: function (item, e) {
    if (e.getKey() === e.ENTER) {
      this.onSearchTriggetSearch(item);
    }
  },
  onClearTriggetSearch: function (item) {
    let grid = item.up('grid');
    if (!grid) grid = this.grid
    let store = grid.getStore();
    let proxy = store.getProxy();
    if (item.hasSearch) {
      item.setValue('');
      proxy.extraParams.pattern = '';
      store.load();
      item.hasSearch = false;
      item.getTrigger('clear').hide();
    }
  },
  onLoadStore: function (store, records, success) {
    this.listRecords = records
    if (success) {
      let totalCount = this.getView().down('#totalCount')
      if (totalCount) {
        if (store.totalCount) {
          totalCount.setValue(Locale.t('global.grid.total') + ' ' + Ext.util.Format.number(store.totalCount, '0,000'))
        } else {
          totalCount.setValue(Locale.t('global.grid.total') + ' 0')
        }
      }
    }
  },
  onBeforeLoad: function (store, operations, opt) {
    if (store.isLoading()) return false
  },


  onColumnMove: function (ct, column, fromIdx, toIdx) {
    let columns = []
    for (let column of ct.items.items) {
      for (let r of Ext.global.Vars.confMod.grids[ct.grid.itemId].columns) {
        if (r.dataIndex === column.dataIndex) {
          columns.push(r)
        }
      }
    }
    this.saveImpGrid(ct.grid, columns)
  },
  onColumnhide: function (ct, column) {
    let c = Ext.global.Vars.confMod.grids[ct.grid.itemId].columns.find(x => x.dataIndex === column.dataIndex)
    if (c) {
      c.hidden = true
      this.saveImpGrid(ct.grid, Ext.global.Vars.confMod.grids[ct.grid.itemId].columns)
    }
  },
  onColumnshow: function (ct, column) {
    let c = Ext.global.Vars.confMod.grids[ct.grid.itemId].columns.find(x => x.dataIndex === column.dataIndex)
    if (c) {
      c.hidden = false
      this.saveImpGrid(ct.grid, Ext.global.Vars.confMod.grids[ct.grid.itemId].columns)
    }
  },
  onResizeColumn: function (ct, column) {
    let c = Ext.global.Vars.confMod.grids[ct.grid.itemId].columns.find(x => x.dataIndex === column.dataIndex)
    if (c) {
      if (Ext.global.Vars.theme === 'medium') {
        if (!column.flex) {
          c.width = column.width / 1.1
        } else {
          c.width = column.flex / 1.1
        }

      } else if (Ext.global.Vars.theme === 'big') {
        if (!column.flex) {
          c.width = column.width / 1.2
        } else {
          c.width = column.flex / 1.2
        }
      } else {
        if (!column.flex) {
          c.width = column.width
        } else {
          c.width = column.flex
        }
      }
      this.saveImpGrid(ct.grid, Ext.global.Vars.confMod.grids[ct.grid.itemId].columns)
    }
  },
  onafterrendergrid: function (grid) {
    if (grid.myColumns) {
      let c, columns = []

      if (Ext.global.Vars.confMod.grids[grid.itemId] === undefined) {
        Ext.global.Vars.confMod.grids[grid.itemId] = {}
      }

      if (Ext.global.Vars.confMod.grids[grid.itemId].columns === undefined) {
        for (let column of grid.myColumns) {
          columns.push(column)
        }
        Ext.global.Vars.confMod.grids[grid.itemId] = { columns: columns }
      } else {
        for (let column of Ext.global.Vars.confMod.grids[grid.itemId].columns) {
          //recupero colonna in myColumns
          c = grid.myColumns.find(x => x.dataIndex === column.dataIndex)
          // verifico se già presente
          let c1 = columns.find(el => el.dataIndex === column.dataIndex)
          if (c && !c1) {
            if (c.resizable !== false) {
              if (Ext.global.Vars.theme === 'medium') {
                c.width = column.width * 1.1
              } else if (Ext.global.Vars.theme === 'big') {
                c.width = column.width * 1.2
              } else {
                c.width = column.width
              }
              if (typeof column.hidden !== 'undefined') {
                c.hidden = column.hidden
              }
            }
            columns.push(c)
          }
        }
        //verificare presenza nuove colonne
        let cl = Ext.global.Vars.confMod.grids[grid.itemId].columns
        for (let column of grid.myColumns) {
          c = cl.find(x => x.dataIndex === column.dataIndex)
          if (!c) {
            columns.push(column)
          }
        }
      }
      Ext.global.Vars.confMod.grids[grid.itemId].columns = columns
      grid.reconfigure(grid.store, columns)
    }
  },
  saveImpGrid: function (grid, columns) {
    this.setConfModRun++;
    let count = this.setConfModRun,
      task = new Ext.util.DelayedTask(function (count) {
        if (count === this.setConfModRun) {
          Ext.global.Vars.confMod.grids[grid.itemId].columns = columns
          Ext.Ajax.request({
            method: 'POST',
            params: {
              'data': Ext.encode(Ext.global.Vars.confMod)
            },
            url: Backend.REST_API + 'setconfmod'
          });
        }
      }, this, [count]);
    task.delay(3000);
  },
});
