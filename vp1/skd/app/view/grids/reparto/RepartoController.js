/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.reparto.RepartoController', {
    extend: 'skd.view.grids.GridsController',
    alias: 'controller.reparto',
    requires:[
        'skd.view.grids.reparto.GridReparto',
        'skd.store.grids.reparto.Reparto'
    ],
    mixins:['portal.v1.global.Util'],
    onActivate:function () {
        this.setToolBar();
        if (this.generateGridFirst===true){
            this.onGenerateGridStore();
        }
        this.callParent(arguments);
        // this.selectCellByModel();
    },

    /* ---------------------------------------------------------------------------------------------------------
     * Gestione visualizzazione tasti
     * ---------------------------------------------------------------------------------------------------------*/
    setToolBar:function () {
        this.toolBarCenter.removeAll();

        this.toolBarCenter.add(
            this.btnReloadGrid,
            this.btnToggleFiltri
            // {
            //     text:'Visualizzazione',
            //     iconCls:'x-fa fa-eye',
            //     menu:[
            //         this.btnVisualizzaOre,
            //         this.btnVisualizzaQta
            //     ]
            // }
        );

        this.callParent(arguments);
    },
    /* ---------------------------------------------------------------------------------------------------------
     * richiamato dopo il caricamento dello store dal mailController
     * ---------------------------------------------------------------------------------------------------------*/
    onPrepareStoreData:function (rest,idgrid) {
        this.storeDataIn = rest.data.store['reparto'];
        this.columnDataIn = rest.data.columns['reparto'];
        this.generateGridFirst= idgrid !== this.getView().id;
        if (this.generateGridFirst===false){
            this.onGenerateGridStore();
        }
    },

    /* ---------------------------------------------------------------------------------------------------------
     * Generazione griglia e store
     * ---------------------------------------------------------------------------------------------------------*/
    onGenerateGridStore : function () {
        this.getView().removeAll();
        this.groupingF = Ext.create('Ext.grid.feature.Grouping', {
            ftype: 'groupingsummary',
            showSummaryRow:true,
            groupHeaderTpl: '{columnName}: <b>{[values.children[0].data["rep_cdl_department_no"]]}/{[values.children[0].data["ope_work_center_no"]]}</b> <i>{[values.children[0].data["priority_description"]]}</i> ({rows.length} Record{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: false,
            enableGroupingMenu: false
        });

        this.store = Ext.create('skd.store.grids.reparto.Reparto',{
            data:this.storeDataIn
        });

        this.generateGridFirst=false;
        this.columns = [
            {
                text: '',
                width: 20,
                tdCls:'td_cell_grid',
                resizable: false,
                menuDisabled:true,
                locked: true
            },
            {
                text: Locale.t('skd.grids.columns.part_no')+' - <i>'+Locale.t('skd.grids.columns.order_no')+'</i> - '+Locale.t('skd.grids.columns.release_no') + ' - '+Locale.t('skd.grids.columns.sequence_no')+ '  ['+Locale.t('skd.grids.columns.qty')+']',
                width: 250,
                tdCls:'td_cell_grid_info',
                sortable:false,
                resizable: false,
                menuDisabled:true,
                locked: true,
                renderer: function (value, meta,record) {
                    return record.get('part_no')+' - <i>'+record.get('order_no')+'</i> - '+ record.get('sc_op_release_no')+' - '+record.get('sc_op_sequence_no')+ ' ['+record.get('sc_op_res_ordine')+']';
                }
            }
        ];

        let columns= [],
            width= 80,
            c = this.columnDataIn,
            text ='';

        for(let i=0;i<c.length;i++){
            if (c[i]['type']==='saldoStart'){
                this.columns.push({
                    text:'&nbsp;',
                    menuDisabled: true,
                    userCls:'goma-text-header-columns',
                    columns:[
                        {
                            // text: c[i]['date'],
                            width:50,
                            menuDisabled: true,
                            resizable: false,
                            dataIndex: 'C_START_SALDO',
                            tdCls:'td_cell_grid',
                            userCls:'goma-text-header-columns',
                            renderer:'onRenderCellSaldo'
                        }
                    ]
                });
            }
            if (c[i]['type']==='object'){
                width= 65;
                if (c[i]['turno'].length>1){
                    width= 50
                }
                columns = [];
                let d = new Date(c[i]['column']);
                for (let ii=0;ii<c[i]['turno'].length;ii++){
                    text = c[i]['turno'][ii]['column'];
                    if (text==='NO_LAV'){
                        text ='Festivo';
                    }
                    columns.push({
                        text: text,
                        dataIndex: c[i]['turno'][ii]['index'],
                        dataIndexC: c[i]['turno'][ii]['indexC'],
                        userCls:'goma-text-header-columns',
                        width:width,
                        sortable:false,
                        menuDisabled:true,
                        resizable: false,
                        summaryType: 'sum',
                        renderer:'onRenderCell',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            if (value>0)
                                return value;
                        }
                    })
                }
                this.columns.push({
                    text: Ext.Date.format(d,'D d/m'),
                    userCls:'goma-text-header-columns',
                    menuDisabled:true,
                    resizable: false,
                    columns:columns
                })
            }
        }

        this.grid = Ext.create('skd.view.grids.reparto.GridReparto',{
            features: [
                this.groupingF
            ],
            columns:this.columns,
            store:this.store
        });
        // Ext.util.Observable.capture(this.grid, function(evname) {console.log('GRID '+evname, arguments);});
        // Ext.util.Observable.capture(this.grid, function(evname) {console.log('GRID '+evname);});
        // Ext.util.Observable.capture(this.grid.getView(), function(evname) {console.log('VIEW '+evname);});
        this.getView().add(this.grid);
    }
});
