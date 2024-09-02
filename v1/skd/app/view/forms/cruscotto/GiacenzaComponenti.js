/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.view.forms.cruscotto.GiacenzaComponenti', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.Checkbox',
        'Ext.grid.column.Action'
    ],
    dockedItems: [
        {
            xtype:'toolbar',
            items:[
                {
                    boxLabel:'Filtra negativi',
                    xtype:'checkbox',
                    bind:{
                        value:'{negativi}'
                    },
                    listeners:{
                        change:'onChangeFitriNegativi'
                    }
                }
            ]
        }
    ],
    viewConfig: {
        enableTextSelection: true,
        emptyText: Locale.t('skd.forms.cruscotto.giacenzacomp.emptyText')
    },
    columns: {
        items: [
            {
                xtype: 'actioncolumn',
                width: 30,
                menuDisabled: true,
                resizable: false,
                items: [{
                    getClass: function( view, meta, record){
                        meta.tdCls = 'goma-action-icon';

                        let tdCls ='fas fa-info-circle bd-color-blue',
                            value =record.data,
                            filtri = Ext.global.Vars.confMod.main.filtri;
                        if (Ext.global.Vars.confMod.main.tabActive==='gridCdl'){
                            filtri = Ext.global.Vars.confMod.main.filtriCdl;
                        }
                        if (filtri.produzione === filtri.acquisti) {
                            if (filtri.giacenza ===0) { //giacenza
                                    if (value['p_giacenza_eff']<0){
                                        tdCls = ' bd-color-red';
                                    }
                                    if (value['m_giacenza_eff']<0){
                                        tdCls = 'bd-color-red';
                                    }
                            }
                            if (filtri.giacenza ===4) { //giacenza presunta
                                if (value['p_giacenza']<0){
                                    // meta.tdAttr = 'data-qtip="Giacenza presunta acquisti= '+record.data['p_giacenza']+'"';
                                    tdCls = ' bd-color-red';
                                }
                                if (value['m_giacenza']<0){
                                    // meta.tdAttr = 'data-qtip="Giacenza presunta materiali= '+record.data['m_giacenza']+'"';
                                    tdCls = ' bd-color-red';
                                }

                            }
                            if (filtri.giacenza ===1) { //giacenza prod
                                if (value['p_giacenza_rda'] <0) {
                                    tdCls = ' bd-color-red ';
                                }
                                if (value['m_giacenza_rda'] <0) {
                                    tdCls = ' bd-color-red ';
                                }
                            }
                            if (filtri.giacenza ===2) { //giacenza no RDA
                                if (value['p_giacenza_pop'] <0) {
                                    tdCls = ' bd-color-red ';
                                }
                                if (value['m_giacenza_pop'] <0) {
                                    tdCls = ' bd-color-red ';
                                }
                            }
                            if (filtri.giacenza ===3) { //giacenza no POP RDA
                                if (value['p_giacenza_rda_pop'] <0) {
                                    tdCls = ' bd-color-red ';
                                }
                                if (value['m_giacenza_rda_pop'] <0) {
                                    tdCls = ' bd-color-red ';
                                }
                            }
                        } else {
                            if (filtri.produzione === true) {
                                if (filtri.giacenza ===0) { //giacenza
                                    if (value['m_giacenza_eff'] <0) {
                                        tdCls = ' bd-color-red ';
                                    }
                                }
                                if (filtri.giacenza ===4) { //giacenza presunta
                                    if (value['m_giacenza'] <0) {
                                        tdCls = ' bd-color-red ';
                                    }
                                }
                                if (filtri.giacenza ===1) { //giacenza prod
                                    if (value['m_giacenza_rda'] <0) {
                                        tdCls = ' bd-color-red ';
                                    }
                                }
                                if (filtri.giacenza ===2) { //giacenza no RDA
                                    if (value['m_giacenza_pop'] <0) {
                                        tdCls = ' bd-color-red ';
                                    }
                                }
                                if (filtri.giacenza ===3) { //giacenza no POP RDA
                                    if (value['m_giacenza_rda_pop'] <0) {
                                        tdCls = ' bd-color-red ';
                                    }
                                }
                            }
                            if (filtri.acquisti === true) {
                                if (filtri.giacenza ===0) { //giacenza
                                    if (value['p_giacenza_eff'] <0) {
                                        tdCls = ' bd-color-red ';
                                    }
                                }
                                if (filtri.giacenza ===4) { //giacenza presunta
                                    if (value['p_giacenza'] <0) {
                                        tdCls = ' bd-color-red ';
                                    }
                                }
                                if (filtri.giacenza ===1) { //giacenza prod
                                    if (value['p_giacenza_rda'] <0) {
                                        tdCls = ' bd-color-red ';
                                    }
                                }
                                if (filtri.giacenza ===2) { //giacenza no RDA
                                    if (value['p_giacenza_pop'] <0) {
                                        tdCls = ' bd-color-red ';
                                    }
                                }
                                if (filtri.giacenza ===3) { //giacenza no POP RDA
                                    if (value['p_giacenza_rda_pop'] <0) {
                                        tdCls = ' bd-color-red ';
                                    }
                                }
                            }
                        }
                        return ' fas fa-info-circle '+tdCls;
                    },
                    handler: 'onOpenMateriali',
                    iconCls: 'fas fa-info-circle bd-color-blue'
                }]
            },
            {
                text: Locale.t('skd.forms.cruscotto.giacenzacomp.columns.part_no'),
                dataIndex: 'part_no',
                flex: 1,
                minWidth: 150
            },
            {
                text: Locale.t('skd.forms.cruscotto.giacenzacomp.columns.issue_to_loc'),
                dataIndex: 'issue_to_loc',
                width: 70
            },
            {
                text: Locale.t('skd.forms.cruscotto.giacenzacomp.columns.qty_remaining'),
                dataIndex: 'qty_remaining',
                align:'end',
                renderer: 'onRenderQtyValue',
                width: 90
            },
            {
                text: Locale.t('skd.forms.cruscotto.giacenzacomp.columns.qty_required'),
                dataIndex: 'qty_required',
                align:'end',
                renderer: 'onRenderQtyValue',
                width: 90
            }
        ],
        defaults: {
            menuDisabled: true,
            sortable: false
        }
    }
});
