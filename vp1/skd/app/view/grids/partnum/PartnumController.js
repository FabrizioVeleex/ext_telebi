/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.grids.partnum.PartnumController', {
    extend: 'skd.view.grids.GridsController',
    alias: 'controller.partnum',
    requires: [
        'Ext.grid.feature.Grouping',
        'Ext.grid.feature.GroupingSummary',
        'skd.store.grids.partnum.PartNum',
        'skd.view.grids.partnum.GridPartNum'
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
        this.storeDataIn = rest.data.store['lab'];
        this.columnDataIn = rest.data.columns['lab'];
        this.generateGridFirst= idgrid !== this.getView().id;
        if (this.generateGridFirst===false){
            this.onGenerateGridStore();
        }
    },


    /* ---------------------------------------------------------------------------------------------------------
     * Generazione griglia e store
     * FIXME su cambio tab primo caricamento non ho segnale che si sta generanto (mask)
     * ---------------------------------------------------------------------------------------------------------*/
    onGenerateGridStore : function () {
        this.getView().removeAll();
        this.groupingF = Ext.create('Ext.grid.feature.Grouping', {
            ftype: 'groupingsummary',
            showSummaryRow:true,
            groupHeaderTpl: '{columnName}: <b>{name}</b> <i>{[values.children[0].data["priority_description"]]}</i> ({rows.length} lab{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: false,
            enableGroupingMenu: false
        });

        this.store = Ext.create('skd.store.grids.partnum.PartNum',{
            data:this.storeDataIn
        });

        this.columns = [
            {text:Locale.t('skd.grids.columns.lab'), dataIndex: 'lab1', width: 50, locked : true},
            {text:Locale.t('skd.grids.columns.part_no'), dataIndex: 'part_no', width: 100, locked : true},
            {text:Locale.t('skd.grids.columns.eng_chg_level'), dataIndex: 'eng_chg_level', width: 50, locked : true}
        ];

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
                text: Locale.t('skd.grids.columns.lab')+' - <i>'+Locale.t('skd.grids.columns.order_no')+'</i> - '+ Locale.t('skd.grids.columns.release_no') + ' - '+Locale.t('skd.grids.columns.sequence_no')+ '  ['+Locale.t('skd.grids.columns.qty')+']',
                width: 250,
                tdCls:'td_cell_grid_info',
                sortable:false,
                locked: true,
                resizable: false,
                menuDisabled:true,
                renderer: function (value, meta,record) {
                    return record.get('lab')+' - <i>'+record.get('order_no')+'</i> - '+ record.get('sc_op_release_no')+' - '+record.get('sc_op_sequence_no')+ ' ['+record.get('sc_op_res_ordine')+']';
                }
            }
        ];


        let columns= [],
            width= 80,
            c = this.columnDataIn,
            text = '';
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

        this.grid = Ext.create('skd.view.grids.partnum.GridPartNum',{
            features: [
                this.groupingF
            ],
            columns:this.columns,
            store:this.store
        });
        this.getView().add(this.grid);
    }
});
