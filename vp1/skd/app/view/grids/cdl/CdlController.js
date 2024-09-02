/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.cdl.CdlController', {
  extend: 'skd.view.grids.GridsController',
  alias: 'controller.cdl',

  requires: [
    'Ext.form.field.TextArea',
    'Ext.grid.column.Action',
    'skd.model.grids.cdl.Cdl',
    'skd.model.grids.cdl.CdlDett',
    'skd.store.grids.cdl.Cdl',
    'skd.store.grids.cdl.CdlDett',
    'skd.view.forms.top.grids.WinNoteOpeData.Win'
  ],
  mixins: ['portal.v1.global.Util'],
  /**
   * Called when the view is created
   */

  onAfterRender: function () {
    this.callParent(arguments);
    this.getViewModel().set('widthNote', Ext.global.Vars.confMod.main.filtriCdl.widthNote);
  },
  onActivate: function () {
    this.callParent(arguments);
    this.setToolBar();
  },
  /* ---------------------------------------------------------------------------------------------------------
   * Gestione visualizzazione tasti
   * ---------------------------------------------------------------------------------------------------------*/
  setToolBar: function () {
    this.toolBarCenter.removeAll();

    this.toolBarCenter.add(
      this.btnReloadGrid,
      this.btnOrderCld,
      this.btnToggleFiltriCld,
    );

    this.callParent(arguments);
  },

  onLoadGrid: function () {
    this.getView().fireEvent('loadDataGrid', this.getView().id, true);
  },

  onRenderQtyValue: function (value) {
    return Ext.util.Format.number(value, '0,000.0');
  },
  onPrepareStoreData: function (resp) {
    this.onAfterLoadDataGrid(resp);
  },
  onAfterLoadDataGrid: function (resp) {
    this.getView().removeAll();

    this.storeCdl = Ext.create('skd.store.grids.cdl.Cdl', {
      model: 'skd.model.grids.cdl.Cdl',
      data: resp.data
    });

    let columns = [
      {
        locked: true,
        xtype: 'actioncolumn',
        width: 45,
        menuDisabled: true,
        resizable: false,
        text: 'Prd',
        items: [{
          getClass: function (view, meta, record) {
            let checkRuoli = function (ruoli) {
              if (!Ext.global.Vars.infoApp && !Ext.global.Vars.infoApp.ruoli) return false
              for (let r of Ext.global.Vars.infoApp.ruoli) {
                if (ruoli.filter(el => el === r.valore).length > 0) {
                  return true
                }
              }
              return false
            }
            let cursor = '',
              tips;
            meta.tdCls = 'goma-action-icon';
            if (record.data['lista_preparatori'] !== '') {
              tips = 'Preparatori : ' + record.data['lista_preparatori'] + '<br>';
            } else {
              tips = 'Nessun preparatore presente<br>';
            }

            if (record.data['data_ini_preparazione'] !== '' && record.data['data_ini_preparazione'] !== null) {
              tips += 'Data di partenza della preparazione: ' + record.data['data_ini_preparazione'] + '|<br>';
            } else {
              tips += 'Nessuna data di partenza della preparazione<br>';
            }
            meta.tdAttr = 'data-qtip="' + Ext.htmlEncode(tips) + '"';
            if (checkRuoli(['10', '11'])) {

            } else {
              cursor = ' td_cursor_default';
            }
            if (record.data['in_produzione']) {
              return 'fas fa-check bd-color-green ' + cursor;
            } else {
              return 'fas fa ' + cursor;
            }
          },
          handler: 'onClickOpenDettPrep',
          iconCls: 'fas '
        }]
      },
      {
        locked: true,
        width: 45,
        menuDisabled: true,
        resizable: false,
        text: 'St.',
        dataIndex: 'stato_preparazione',
        renderer: 'onRedererStato'
      },
      {
        text: Locale.t('skd.grids.columns.lab'),
        width: 250,
        menuDisabled: true,
        sortable: false,
        resizable: false,
        tdCls: 'td_cell_grid_info td_cell_min',
        dataIndex: 'descrizione',
        renderer: 'onRenderLab_cdl',
        locked: true
      },
      {
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        resizable: false,
        items: [{
          getClass: function (view, meta, record) {
            meta.tdCls = 'goma-action-icon';
            let value = record.data;
            if (record.data['nota'] !== '') {
              meta.tdAttr = 'data-qtip="' + Ext.htmlEncode(record.data['nota']) + '"';
              return 'fas fa-info-circle bd-color-blue'
            } else {
              return 'fas fa-exclamation-circle bd-color-orange'
            }
          },
          handler: 'onOpenNote',
          iconCls: 'fas fa-info-circle bd-color-blue'
        }]
      },
      {
        text: Locale.t('skd.grids.columns.data_ordine_cliente'),
        width: 75,
        menuDisabled: true,
        resizable: false,
        sortable: false,
        tdCls: 'td_cell_grid_info td_cell_min',
        dataIndex: 'data_ordine_cliente'
      },
      {
        text: Locale.t('skd.grids.columns.data_ini_preparazione'),
        width: 90,
        menuDisabled: true,
        resizable: false,
        sortable: false,
        tdCls: 'td_cell_grid_info td_cell_min',
        dataIndex: 'data_ini_preparazione_view'
      },
      {
        text: Locale.t('skd.grids.columns.prep_succ'),
        width: 120,
        menuDisabled: true,
        sortable: false,
        tdCls: 'td_cell_grid_info td_cell_min',
        dataIndex: 'prep_succ'
      },
      {
        text: Locale.t('skd.grids.columns.note'),
        bind: {
          width: '{widthNote}'
        },
        listeners: {
          resize: 'onResizeNote'
        },
        width: 200,
        menuDisabled: true,
        sortable: false,
        tdCls: 'td_cell_grid_info td_cell_min',
        dataIndex: 'nota'
      }
    ];
    columns = this.onGenerateColumns(columns, resp);

    this.grid = Ext.create('Ext.grid.Panel', {
      userCls: 'goma-grid-cdl',
      enableColumnMove: false,
      id: 'gridCdlSub',
      selModel: {
        selType: 'cellmodel',
        allowDeselect: true,
        mode: 'SINGLE',
        listeners: {
          select: 'onCellSelect'
        }
      },
      viewConfig: {
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
        markDirty: false,
        stripeRows: true,
        enableTextSelection: true
      },
      columns: columns,
      store: this.storeCdl,
      listeners: {
        itemcontextmenu: 'onItemcontextmenu',
        cellclick: 'onCellClickOpenDettPrep'
      }
    });

    this.panelTop = Ext.create('Ext.panel.Panel', {
      flex: 1,
      layout: 'fit',
      items: [
        this.grid
      ]
    });
    this.panelDet = Ext.create('Ext.panel.Panel', {
      cls: 'panel-cdl-det',
      title: 'det',
      layout: 'fit',
      flex: 1
    });
    this.panelMain = Ext.create('Ext.panel.Panel', {
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      items: [
        this.panelTop,
        this.panelDet
      ]
    });

    this.getView().add(this.panelMain);
    this.getView().el.unmask();
  },

  onResizeNote: function (ct, width, eOpts) {
    this.getView().fireEvent('onResizeNote', Math.round(width));
  },
  onItemcontextmenu: function (grid, record, item, index, e, eOpts) {
    let me = this;
    e.stopEvent();
    let contextMenu = Ext.create('Ext.menu.Menu', {
      width: 200,
      items: [{
        text: 'Mostra in griglia Lab',
        handler: function () {
          let record = grid ? grid.getSelection()[0] : null;
          if (!record) {
            return;
          }
          me.getView().fireEvent('goToGridLab', record.data);
        }
      }]
    });
    contextMenu.showAt(e.getXY());
  },

  onOpenNote: function (view, rowIndex, colIndex, item, opt, record) {

    let win = Ext.create('skd.view.forms.top.grids.WinNoteOpeData.Win', {
      payload: {
        record: record,
        view: view
      }
    });
    win.on('close', 'onCloseWindowN', this)
    win.show()

  },
  onCloseWindowN: function (win) {
    let me = this;
    try {
      if (win.response) {
        if (win.response.action === 'save') {

          Ext.Ajax.request({
            method: 'POST',
            jsonData: {
              lab: win.payload.record.data.sc_op_lab,
              nota: win.response.nota,
              data_ini_preparazione: win.response.data_ini_preparazione,
              lista_preparatori: win.response.lista_preparatori
            },
            url: Backend.REST_API + 'forms/cruscotto/setopedatanote/',
            success: function (response) {
              let resp = Ext.decode(response.responseText);
              me.onOpdateRowEtidNote(win);

            },
            failure: function (response) {
              let resp = Ext.decode(response.responseText)
              Ext.Msg.show({
                title: Locale.t('global.errore'), msg: resp['msg'],
                buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
              })
            }
          });
        }
      }
    } catch (error) {
      Ext.Msg.show({
        title: Locale.t('global.errore'), msg: error,
        buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
      })
    }
  },


  onOpdateRowEtidNote: function (win) {
    try {

      let datap = new Date(win.response.data_ini_preparazione)
      win.payload.record.set('nota', win.response.nota)
      win.payload.record.set('data_ini_preparazione', win.response.data_ini_preparazione)
      win.payload.record.set('data_ini_preparazione_view', Ext.Date.format(datap, 'd/m/Y H:i'))
      win.payload.record.set('lista_preparatori', win.response.lista_preparatori.toString())


    } catch (error) {
      Ext.Msg.show({
        title: Locale.t('global.errore'), msg: error,
        buttons: Ext.Msg.OK, icon: Ext.MessageBox.ERROR
      })
    }
  },



  onAfterLoadDataGridDet: function (resp) {
    this.panelDet.removeAll();
    this.storeDett = Ext.create('skd.store.grids.cdl.CdlDett', {
      model: 'skd.model.grids.cdl.CdlDett',
      data: resp.data
    });

    let columns = [
      {
        text: Locale.t('skd.grids.columns.lab'),
        width: 250,
        menuDisabled: true,
        sortable: false,
        tdCls: 'td_cell_grid_info td_cell_min',
        dataIndex: 'pors',
        renderer: function (value, meta, record) {
          return record.get('pors') + ' [' + record.get('sc_op_res_ordine') + ']';
        },
        locked: true
      }
    ];
    columns = this.onGenerateColumns(columns, resp);

    this.gridDet = Ext.create('Ext.grid.Panel', {
      enableColumnMove: false,
      selModel: {
        selType: 'cellmodel',
        allowDeselect: true,
        mode: 'SINGLE',
        listeners: {
          select: 'onCellSelectDet'
        }
      },
      viewConfig: {
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
        markDirty: false,
        stripeRows: true,
        enableTextSelection: true
      },
      columns: columns,
      store: this.storeDett
    });
    this.panelDet.add(this.gridDet);
    this.panelDet.el.unmask();
  },

  onGenerateColumns: function (columns, resp) {
    let objColumns = [],
      c = resp.columns,
      text = '',
      userCls = '';

    for (let i = 0; i < c.length; i++) {
      objColumns = [];
      for (let ii = 0; ii < c[i]['workcenter'].length; ii++) {
        text = c[i]['workcenter'][ii]['column'];
        userCls = '';
        if (ii === 0) {
          userCls = ' cell_left';
        }
        objColumns.push({
          text: text,
          dataIndex: c[i]['workcenter'][ii]['index'],
          userCls: 'goma-text-header-columns ',
          width: 40,
          sortable: false,
          menuDisabled: true,
          resizable: false,
          renderer: 'onRenderCellCdl'
        })
      }
      columns.push({
        text: c[i]['column'],
        userCls: 'goma-text-header-columns',
        menuDisabled: true,
        resizable: false,
        columns: objColumns
      })
    }
    return columns;
  },

  onClickOpenDettPrep: function (view, rowIndex, colIndex, item, opt, record) {
    if (this.checkRuoli(['10', '11'])) {
      this.getView().fireEvent('openDettaglioPrep', record);
    }
  },
  onCellClickOpenDettPrep: function (view, td, cellIndex, record, tr, e) {
    let elements = Array.from(td.classList);
    if (elements.indexOf('stato_preparazione') > -1) {
      if (this.checkRuoli(['10', '11'])) {
        this.getView().fireEvent('openDettaglioPrep', record);
      }
    }
  },
  onCellSelect: function (cellmodel, record, row, column) {
    //click su colonna info stato
    if (column < 2) {
      return;
    }
    let me = this,
      header = cellmodel.view.up().columns,
      dataIndex = header[column].dataIndex,
      cell = record.get(dataIndex);

    this.panelDet.el.mask('Caricamento dati in corso...');
    this.panelDet.setTitle('Dettaglio lab: ' + record.data['descrizione']);
    Ext.Ajax.request({
      timeout: 120000,
      method: 'POST',
      jsonData: { sc_op_lab: record.data['sc_op_lab'], idGrid: 'gridCdlDett' },
      url: Backend.REST_API + 'grids/',
      success: function (response) {
        let resp = Ext.decode(response.responseText);
        if (resp['success'] === true) {
          me.onAfterLoadDataGridDet(resp);
        } else {
          //TODO messaggio errore su loaddata gtid
          me.getView().el.unmask();
        }
      },
      failure: function (response) {
        //TODO messaggio errore su loaddata gtid
        me.panelDet.el.unmask();
      }
    });
  },
  onCellSelectDet: function (cellmodel, record, row, column, eOpts) {
    let header = cellmodel.view.up().columns,
      dataIndex = header[column].dataIndex,
      cell = record.get(dataIndex);

    let vm = this.getViewModel();
    vm.set('selectCell_dett', cell);
    vm.set('dataIndex_dett', dataIndex);
    vm.set('row_dett', record.data);
    this.getView().fireEvent('selectCell', this.getView(), cell, dataIndex, record.data);
  }
});
