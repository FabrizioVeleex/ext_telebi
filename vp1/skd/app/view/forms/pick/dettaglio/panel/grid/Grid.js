/**
 * Created by fabrizio on 03/01/19.
 */
Ext.define('skd.view.forms.pick.dettaglio.panel.grid.Grid', {
  extend: 'Ext.grid.Panel',
  requires: [
    'Ext.grid.column.Action',
    'Ext.grid.plugin.CellEditing',
    'Ext.util.Format'
  ],
  name: 'GridPick',
  scrollable: true,
  enableColumnMove: false,
  flex: 1,
  bind: {
    store: '{store}'
  },
  features: [
    {
      ftype: 'grouping',
      showSummaryRow: false,
      groupHeaderTpl: '<b><span style="font-size: x-small">{[values.children[0].data["ord_prod"]]}</span>',
      hideGroupedHeader: false,
      enableGroupingMenu: false,
      collapseTip: '',
      expandTip: ''
    }
  ],
  style: {
    'border-top': '1px solid black'
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
        text: Locale.t('skd.forms.pick.columns.cod_phantom'),
        dataIndex: 'cod_phantom',
        minWidth: 160
      },
      {
        text: Locale.t('skd.forms.pick.columns.component'),
        dataIndex: 'component',
        width: 180
      },
      {
        text: Locale.t('skd.forms.pick.columns.lead_time'),
        dataIndex: 'lead_time',
        renderer: Ext.util.Format.numberRenderer('0,000.00'),
        width: 60
      },
      {
        text: Locale.t('skd.forms.pick.columns.udm'),
        dataIndex: 'udm',
        width: 50
      },
      {
        text: Locale.t('skd.forms.pick.columns.mat_per_odp'),
        dataIndex: 'mat_per_odp',
        align: 'end',
        renderer: Ext.util.Format.numberRenderer('0,000.00'),
        width: 80
      },
      {
        text: Locale.t('skd.forms.pick.columns.mat_per_lab'),
        dataIndex: 'mat_per_lab',
        align: 'end',
        renderer: Ext.util.Format.numberRenderer('0,000.00'),
        width: 80
      },
      {
        //azione aggiornamento data check
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        resizable: false,
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
            meta.tdCls = 'goma-action-icon';
            let icon = 'fas fa-clock bd-color-green ',
              tips = 'Inserisci data/ora monitoraggio';
            if (record.get('data_ini_contr_ric') !== null) {
              icon = 'fas fa-exclamation-circle bd-color-red ';
              tips = 'Rimuovi data check';
            }
            if (!checkRuoli(['11'])) {
              tips = '';
              icon += ' td_cursor_default '
            }
            meta.tdAttr = 'data-qtip=\"' + tips + '\"';
            return icon;
          },
          handler: 'onClickActionMonitoring',
          iconCls: 'fas fa'
        }]
      },
      {
        text: Locale.t('skd.forms.pick.columns.data_ini_contr_ric'),
        xtype: 'datecolumn', format: 'd/m/Y H:i:s',
        dataIndex: 'data_ini_contr_ric',
        width: 150
      },
      {
        text: Locale.t('skd.forms.pick.columns.qta_preparata'),
        dataIndex: 'qta_preparata',
        width: 90,
        align: 'end',
      },
      {
        text: Locale.t('skd.forms.pick.columns.qta_mancante'),
        dataIndex: 'qta_mancante',
        renderer: 'onRedererMancante',
        width: 90
      },
    ],
  },
  listeners: {
    select: 'onSelectionChange'
  }
});
