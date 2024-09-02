/**
 * Created by fabrizio on 03/01/19.
 */
Ext.define('skd.view.grids.mancanti.Grid', {
  extend: 'Ext.grid.Panel',
  requires: [
    'Ext.grid.column.Action',
    'Ext.grid.plugin.CellEditing',
    'Ext.util.Format'
  ],
  name: 'GridPick',
  scrollable: true,
  enableColumnMove: false,
  style: {
    'border-top': '1px solid black'
  },
  enableLocking: true,
  lockedViewConfig: {
    scroll: 'horizontal'
  },
  viewConfig: {
    preserveScrollOnRefresh: true,
    preserveScrollOnReload: true,
    markDirty: false,
    stripeRows: true,
    enableTextSelection: true,
    emptyText: Locale.t('skd.forms.cruscotto.giacenzacomp.emptyText')
  },
  plugins: {
    ptype: 'cellediting',
    clicksToEdit: 1
  },
  columnLines: true,
  columns: {
    items: [
      {
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        locked: true,
        resizable: false,
        items: [{
          getClass: function (view, meta, record) {
            let value = record.data;
            let tdCls = 'fas fa-info-circle bd-color-blue';
            let filtri = Ext.global.Vars.confMod.main.filtripick.producibilita;

            if (value['lead_time_code'] === 'Manufactured') {
              if (filtri === 0) { //giacenza
                if (value['m_giacenza_eff'] < 0) {
                  tdCls = ' bd-color-red ';
                }
              }
              if (filtri === 4) { //giacenza presunta
                if (value['m_giacenza'] < 0) {
                  tdCls = ' bd-color-red ';
                }
              }
              if (filtri === 1) { //giacenza prod
                if (value['m_giacenza_rda'] < 0) {
                  tdCls = ' bd-color-red ';
                }
              }
              if (filtri === 2) { //giacenza no RDA
                if (value['m_giacenza_pop'] < 0) {
                  tdCls = ' bd-color-red ';
                }
              }
              if (filtri === 3) { //giacenza no POP RDA
                if (value['m_giacenza_rda_pop'] < 0) {
                  tdCls = ' bd-color-red ';
                }
              }
            } else {
              if (filtri === 0) { //giacenza
                if (value['p_giacenza_eff'] < 0) {
                  tdCls = ' bd-color-red ';
                }
              }
              if (filtri === 4) { //giacenza presunta
                if (value['p_giacenza'] < 0) {
                  tdCls = ' bd-color-red ';
                }
              }
              if (filtri === 1) { //giacenza prod
                if (value['p_giacenza_rda'] < 0) {
                  tdCls = ' bd-color-red ';
                }
              }
              if (filtri === 2) { //giacenza no RDA
                if (value['p_giacenza_pop'] < 0) {
                  tdCls = ' bd-color-red ';
                }
              }
              if (filtri === 3) { //giacenza no POP RDA
                if (value['p_giacenza_rda_pop'] < 0) {
                  tdCls = ' bd-color-red ';
                }
              }
            }
            return ' fas fa-info-circle ' + tdCls;
          },
          iconCls: 'fas fa-info-circle bd-color-blue',
          handler: 'onOpenMaterialiGrid'
        }]
      },
      {
        text: Locale.t('skd.grids.columns.lab'),
        dataIndex: 'lab',
        width: 160,
        locked: true
      },
      {
        text: Locale.t('skd.grids.columns.lab_desc'),
        dataIndex: 'sc_op_priority_description',
        renderer: function (value, metaData) {
          // let t = value === null ? "" : value;
          metaData.tdAttr = 'data-qtip="' + value + '"';
          return value;
        },
        width: 200,
        locked: true
      },
      {
        text: Locale.t('skd.grids.columns.preparatore'),
        dataIndex: 'lista_preparatori',
        locked: true,
        width: 130
      },
      {
        text: Locale.t('skd.forms.pick.columns.component'),
        dataIndex: 'component_part',
        width: 200,
        locked: true
      },
      {
        //azione aggiornamento data check
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        resizable: false,
        items: [{
          getClass: function (view, meta, record) {
            let controller = this.lookupController();
            meta.tdCls = 'goma-action-icon';
            let icon = 'fas fa-clock bd-color-green ',
              tips = 'Inserisci data/ora monitoraggio';
            if (record.get('data_ini_contr_ric') !== null) {
              icon = 'fas fa-exclamation-circle bd-color-red ';
              tips = 'Rimuovi data check';
            }

            if (!controller.checkRuoli(['11'])) {
              tips = '';
              icon = ' td_cursor_default '
            }
            meta.tdAttr = 'data-qtip=\"' + tips + '\"';
            return icon;
          },
          handler: 'onClickActionMonitoring',
          iconCls: 'fas fa'
        }]
      },
      {
        // (scrive su skd_prep_dett) AZIONE INSERIMENTO DATA e ORA ADESSO
        text: Locale.t('skd.forms.pick.columns.data_ini_contr_ric'),
        xtype: 'datecolumn', format: 'd/m/Y H:i:s',
        dataIndex: 'data_ini_contr_ric',
        width: 150
      },
      {
        // campo editabile (scrive su skd_prep_dett) gestire colore in base al colore colonna precedente
        text: Locale.t('skd.forms.pick.columns.qta_preparata'),
        dataIndex: 'qta_preparata',
        width: 90,
        align: 'end',
        getEditor: function (record) {
          let controller = this.lookupController();
          controller._selectedRecord = record;
          if (!controller.checkRuoli(['11'])) {
            return;
          }

          let maxValue = '';
          if (record.get('onhand') < record.get('mat_per_lab')) {
            maxValue = record.get('onhand');
          } else {
            maxValue = record.get('mat_per_lab');
          }

          if (record.get('completato_senza_mancanti') === 1) {
            return
          }

          let field = Ext.create("Ext.form.field.Number", {
            xtype: "numberfield",
            minValue: 0,
            maxValue: maxValue,
            listeners: {
              change: 'onChangeDettaglio'
            },
          })
          return field;
        }
      },
      {
        text: Locale.t('skd.forms.pick.columns.qta_mancante'),
        dataIndex: 'qta_mancante',
        renderer: 'onRedererMancante',
        width: 90
      },
      {
        //azione aggiornamento data check
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        resizable: false,
        items: [{
          getClass: function (view, meta, record) {
            let controller = this.lookupController();

            meta.tdCls = 'goma-action-icon';
            let icon = 'x-fas fa-arrow-circle-up bd-color-green',
              tips = '';

            if (!controller.checkRuoli(['11'])) {
              tips = '';
              icon = ' td_cursor_default '
            }
            if (record.get('completato_senza_mancanti') === 1) {
              tips = '';
              icon = ' td_cursor_default '
            }
            meta.tdAttr = ' data-qtip=\"' + tips + '\"';
            return icon;
          },
          handler: 'onClickActionQtyUp',
          // iconCls: 'fas fa'
        }]
      },
      {
        //azione aggiornamento data check
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        resizable: false,
        items: [{
          getClass: function (view, meta, record) {
            let controller = this.lookupController();
            meta.tdCls = 'goma-action-icon';
            let icon = 'x-fas fa-arrow-circle-down bd-color-red',
              tips = '';

            if (!controller.checkRuoli(['11'])) {
              tips = '';
              icon = ' td_cursor_default '
            }
            if (record.get('completato_senza_mancanti') === 1) {
              tips = '';
              icon = ' td_cursor_default '
            }
            meta.tdAttr = 'data-qtip=\"' + tips + '\"';
            return icon;
          },
          handler: 'onClickActionQtyDown',
          // iconCls: 'fas fa'
        }]
      },
      {
        text: Locale.t('skd.forms.pick.columns.mat_per_lab'),
        dataIndex: 'mat_per_lab',
        align: 'end',
        renderer: Ext.util.Format.numberRenderer('0,000.00'),
        width: 80
      },
      {
        text: Locale.t('skd.forms.pick.columns.nota'),
        dataIndex: 'nota',
        renderer: function (value, metaData) {
          let t = value === null ? "" : value;
          metaData.tdAttr = 'data-qtip="' + t + '"';
          return t;
        },
        width: 130
      },
      {
        text: Locale.t('skd.forms.pick.columns.rif_ult_ric'),
        dataIndex: 'rif_ult_ric',
        renderer: function (value, metaData) {
          let t = value === null ? "" : value;
          metaData.tdAttr = 'data-qtip="' + t + '"';
          return t;
        },
        width: 250
      },
      {
        //azione aggiornamento data check
        xtype: 'actioncolumn',
        width: 50,
        text: "PRD",
        menuDisabled: true,
        resizable: false,
        items: [{
          getClass: function (view, meta, record) {
            if (record.get("in_produzione") === 1) {
              meta.tdAttr = 'data-qtip=\" In produzione\"';
              return 'fas fa-check bd-color-green';
            }

            return "";
          },
        }]
      },
      {
        text: Locale.t('skd.forms.pick.columns.lead_time_descr'),
        dataIndex: 'lead_time_code',
        width: 100
      },
      {
        text: Locale.t('skd.forms.pick.columns.component_descr'),
        dataIndex: 'description',
        renderer: function (value, metaData) {
          let t = value === null ? "" : value;
          metaData.tdAttr = 'data-qtip="' + t + '"';
          return t;
        },
        width: 250,
      },
      {
        text: Locale.t('skd.forms.pick.columns.infoa'),
        dataIndex: 'infoa',
        renderer: function (value, metaData) {
          let t = value === null ? "" : value;
          metaData.tdAttr = 'data-qtip="' + t + '"';
          return t;
        },
        width: 250,
      },
      {
        text: Locale.t('skd.forms.pick.columns.origine'),
        dataIndex: 'origine',
        renderer: function (value, metaData) {
          let t = value === null ? "" : value;
          metaData.tdAttr = 'data-qtip="' + t + '"';
          return t;
        },
        width: 150
      },
      {
        text: Locale.t('skd.forms.pick.columns.lead_time'),
        dataIndex: 'lead_time',
        renderer: Ext.util.Format.numberRenderer('0,000.00'),
        width: 60
      },

    ],
    defaults: {
      menuDisabled: true,
    }
  }
});
