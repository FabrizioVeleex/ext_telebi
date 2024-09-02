/**
 * Created by luke on 17/05/21.
 */
Ext.define('rec.view.forms.reso.cards.GridRicevuti', {
    extend: 'Ext.grid.Panel',
    xtype: 'row-widget-grid',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.column.Check',
        'Ext.grid.column.Date',
        'Ext.grid.filters.Filters',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.plugin.RowWidget',
        'Ext.window.Window',
        'portal.util.Functions',
        'rec.model.forms.reso.GridRicevuti'
    ],
    minHeight: 120,
    bind: {
        store: '{gridRicevuti}'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        getRowClass: function(record){
            return (record.get('action')===2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
        },
        listeners: {
            //evento x espandi items
            expandbody: function (nodes, record) {
                //comprimo quelle aperte
               let vm = this.lookupViewModel()
                let storeimgrighe=vm.get('storeImmaginiRiga')
                let ctrl = this.lookupController()
                let grid = ctrl.gridRicevuti
                let rowExpander = grid.getPlugin('gridimageplg');
                let expandedRecords = rowExpander.recordsExpanded;
                let currentExpandedRecord;
                let currentInternalId = 0; // start from 1
                let currentIndex = -1; // start from 0
                for(let prop in expandedRecords) {
                    if(expandedRecords.hasOwnProperty(prop)) {
                        currentInternalId = parseInt(prop, 10);
                        if (record.internalId!==currentInternalId) {
                            currentExpandedRecord = grid.store.getByInternalId(currentInternalId);
                            currentIndex = grid.store.indexOf(currentExpandedRecord);
                            rowExpander.toggleRow(currentIndex, currentExpandedRecord);
                        }
                    }
                }
                if (storeimgrighe) {
                    storeimgrighe.removeAll() //rimuovo eventuali records
                    storeimgrighe.getProxy().extraParams.progriga=record.data.rigabolla //numero riga
                    storeimgrighe.getProxy().extraParams.progressivo=record.data.progtestata //nr. pratica (percorso images)
                    storeimgrighe.load()
                }
            }
        }
    },
    plugins: [
        {ptype: 'cellediting', clicksToEdit: 1},
        {ptype: 'gridfilters', menuFilterText: 'Filtri', emptyFilterText: ''},
        {ptype:'rowwidget',id:'gridimageplg',
            widget: {
                xtype: 'grid',
                scrollable:'y',
                bind: {
                    store: '{storeImmaginiRiga}',
                    title:''
                },
                columns: [
                    {xtype:'actioncolumn', width:30,
                        items: [
                            {getClass: function(){
                                    let vm = this.lookupViewModel()
                                    if (vm.get('readOnlyAttach')) {
                                        return null
                                    }
                                    return 'x-fas fa-trash-alt bd-color-red';
                                },
                                getTip: function (v, meta, record) {
                                    return Locale.t('global.images.columns.remove')+': <b>' + record.get('file') + '</b>';
                                },
                                handler: 'onRemoveImage'
                            }
                        ]
                    },
                    {xtype:'actioncolumn', width:30,
                        items: [
                            {getClass: function(){
                                    return 'x-fas fa-download';
                                },
                                getTip: function (v, meta, record) {
                                    return Locale.t('global.images.columns.scarica')+': <b>' + record.get('file') + '</b>';
                                },
                                handler: 'onGetAttachImage'
                            }
                        ]
                    },
                    {xtype: 'actioncolumn', width: 20, menuDisabled: true, fixed: true,
                        items: [{
                            getClass: function (v, meta, record) {
                                let icona=record.get('estensione').toLowerCase().replace(".", "");
                                return 'icon-'+icona;
                            },
                            getTip: function (v, meta, record) {
                                return Locale.t('global.images.columns.apri')+': <b>' + record.get('file') + '</b>';
                            },
                            handler: 'onOpenImage'
                        }]
                    },
                    {text:Locale.t('global.images.columns.file'), dataIndex: 'nomefile',flex:1},
                    {text:Locale.t('global.images.columns.dimensione'), dataIndex: 'dimensione',width:200,
                        renderer:function(value){
                            return bdFunctions.sizeformat(value)
                        },
                        sortable:false
                    }
                ]
            }
        }
    ],
    columns: [
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
            items: [{
                getClass: function(view, meta, record, rowIndex, colIndex, store){
                    let vm = this.lookupViewModel(), modifica = vm.get('readOnlyGrid')
                    if (modifica === true) {
                        return false
                    }
                    let lastrecord = store.last()
                    if(lastrecord===record){
                        return 'x-fas fa-plus-circle';
                    }else{
                        if (record.get('action') === 2) {
                            return 'x-fas fa-plus-circle';
                        } else {
                            if (record.get('isnew') === 1 && record.get('cdars') === ''){
                                return 'x-fas fa-plus-circle';
                            }
                        }
                        return 'x-fas fa-minus-circle';
                    }
                },
                handler: function(view, rowIndex, colIndex, item, event, record){
                    let vm = this.lookupViewModel(), modifica = vm.get('readOnlyGrid')
                    if (modifica === true) {
                        return false
                    }
                    let grid = view.up('grid'), lastrecord = grid.getStore().last()
                    if (record.get('action') === 2) {
                        record.set('action', 0)
                    }else{
                        if (record.data.isnew===0){
                            record.set('action', 2)
                        }else{
                            if(lastrecord!==record){
                                view.getStore().remove(record);
                            }
                        }
                    }
                }
            }]
        },
        {
            xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false,
            items: [{
                getClass: function (v, metadata) {
                    let vm = this.lookupViewModel()
                    if (vm.get('readOnlyAttach')) {
                        return null
                    }
                    metadata.tdAttr = 'data-qtip="' + Locale.t('rec.forms.reso.gridricevuti.addimage') + '"'
                    return "x-fas fa-file-image"
                }
            }],
            handler: 'onAttachRiga'
        },
        {
            xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false,
            items: [{
                getClass: function (v, metadata,rec) {
                    if (rec.data.immagini===1) {
                        metadata.tdAttr = 'data-qtip="' + Locale.t('rec.forms.reso.gridricevuti.immagini') + '"'
                        return "x-fas fa-paperclip"
                    } else {
                        return null
                    }
                }
            }]
        },
        /*
        {
            xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false,
            items: [{
                getClass: function (v, metadata) {
                    metadata.tdAttr = 'data-qtip="' + Locale.t('rec.forms.reso.info.info') + '"'
                    return "x-fas fa-info-circle bd-color-blue"
                }
            }],
            handler: 'onLoadInfo'
        },

         */
        {
            text: Locale.t('rec.forms.reso.gridricevuti.psdesc'), width: 150, menuDisabled: true, dataIndex: 'psdesc',
            getEditor: function () {
                let vm = this.lookupViewModel(),
                    modifica = vm.get('readOnlyGrid')
                if (modifica === true) {
                    return false
                }
                return {
                    xtype: 'combo',
                    width: 250,
                    displayField: 'psdesc',
                    minChars: 3,
                    selectOnFocus: true,
                    forceSelection: true,
                    allowBlank: false,
                    matchFieldWidth: false,
                    listConfig: {
                        loadingText: Locale.t('global.form.combo.ricerca') + '...',
                        emptyText: Locale.t('global.grid.store.empty')
                    },
                    bind: {
                        store: '{storeCausaliAll}'
                    },
                    listeners: {
                        select: function (combo, record) {
                            let grid = combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.pscaus = record.data['pscaus']
                            }
                        }
                    }
                }
            }
        },
        {
            text: Locale.t('rec.forms.reso.gridricevuti.codice'),
            width: 100,
            dataIndex: 'codice',
            filter: {type: 'string'},
            getEditor: function () {
                let vm = this.lookupViewModel(),
                    modifica = vm.get('readOnlyGrid')
                if (modifica === true) {
                    return false
                }
                return {
                    xtype: 'combo',width:300,displayField: 'descrizione',valueField: 'cdars',
                    minChars: 3, selectOnFocus: true, forceSelection:true,allowBlank: false,matchFieldWidth:false,
                    listConfig: {loadingText: Locale.t('global.form.combo.ricerca')+'...', emptyText: Locale.t('global.grid.store.empty')},
                    bind: {
                        store: '{storeProdottiTecnico}',readOnly: '{readOnlyGrid}'
                    },
                    listeners: {
                        beforequery: function (qe) {
                            let vm = this.lookupViewModel(),
                                rec = vm.get('record')
                            delete qe.combo.lastQuery
                            let storeprodotti=vm.get('storeProdottiTecnico')
                            if (storeprodotti) {
                                storeprodotti.getProxy().extraParams.cdcfs=rec.data.cdcli
                            }
                        },
                        select: function (combo, record) {
                            let grid = combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            let lastrecord = grid.getStore().last();
                            if (row) {
                                row.data.codice = record.data['cdars']
                                row.data.depar = record.data['descrizione']
                                //pulisco campi successivi
                                row.data.idrecord = ''
                            }
                            grid.getView().refreshNode(row)
                            if (lastrecord === row) {
                                let controller = this.lookupController()
                                grid.getStore().add(Ext.create('rec.model.forms.reso.GridRicevuti', {
                                    id: controller.randomString(32),idtestata:'',numbolla:'',databolla:'',pscaus:'',psdesc:'',qtaric:1, action: 1, isnew: 1
                                }));
                            }
                        }
                    }
                }
            }
        },
        {
            text: Locale.t('rec.forms.reso.gridricevuti.depar'),
            flex: 1,
            dataIndex: 'depar',
            filter: {type: 'string'}
        },
        {text: Locale.t('rec.forms.reso.gridricevuti.seriale'), width: 100, dataIndex: 'seriale',
            getEditor: function () {
                let vm = this.lookupViewModel(),
                    modifica = vm.get('readOnlyGrid')
                if (modifica === true) {
                    return false
                }
                return {
                    xtype: 'textfield', bind: {readOnly: '{readOnlyGrid}'}
                }
            }
        },
        {text: Locale.t('rec.forms.reso.gridricevuti.dataprod'), width: 100,xtype: 'datecolumn', format: 'd/m/Y',submitFormat:'Y-m-d', dataIndex: 'dataprod',
            getEditor: function () {
                let vm = this.lookupViewModel(),
                    modifica = vm.get('readOnlyGrid')
                if (modifica === true) {
                    return false
                }
                return {
                    xtype: 'datefield', format: 'd/m/Y', submitFormat:'Y-m-d', bind: {readOnly: '{readOnlyGrid}'},
                    listeners:{
                        blur:function(cmp) {
                            //se data fittizia 1970 scrivo la nota
                            if (cmp.lastValue && cmp.lastValue==='01/01/1970') {
                                let grid = cmp.up('grid')
                                if (grid) {
                                    let row = grid.getSelectionModel().getSelection()[0]
                                    if (row) {
                                        row.data.note ='Data non leggibile '+row.data.note
                                        grid.getView().refreshNode(row)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        /*
        {
            xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false,
            items: [{
                getClass: function (v, metadata, r) {
                    if (r.data.garanzia >0) {
                        metadata.tdAttr = 'data-qtip="' + Locale.t('rec.forms.reso.gridricevuti.garanzia') + '"'
                        return "fab fa-goodreads bd-color-green"
                    }
                    if (r.data.garanzia <0) {
                        metadata.tdAttr = 'data-qtip="' + Locale.t('rec.forms.reso.gridricevuti.nogaranzia') + '"'
                        return "fab fa-goodreads bd-color-red"
                    }
                    return "bd-action-null"
                }
            }]
        },

         */
        {text: Locale.t('rec.forms.reso.gridricevuti.idfornitore'), width: 200,dataIndex: 'fornitore',
            getEditor: function () {
                let vm = this.lookupViewModel(),
                    modifica = vm.get('readOnlyGrid')
                if (modifica === true) {
                    return false
                }
                return {
                    xtype: 'combo',width:150,displayField: 'ragsoc',
                    minChars: 3, selectOnFocus: true,forceSelection:true,allowBlank: false,matchFieldWidth:false,
                    listConfig: {loadingText: Locale.t('global.form.combo.ricerca')+'...', emptyText: Locale.t('global.grid.store.empty')},
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item"><b>{codice}</b>: - {ragsoc}</li>',
                        '</tpl></ul>'
                    ),
                    bind: {
                        store: '{storeFornitore}',readOnly: '{readOnlyGrid}'
                    },
                    listeners: {
                        select: function (combo, record) {
                            let grid = combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.idfornitore = record.data['id']
                            }
                        }
                    }
                }
            }
        },
        {text: Locale.t('rec.forms.reso.gridricevuti.qtaric'), width: 60, dataIndex: 'qtaric'},
        {width: 100,  text: Locale.t('rec.forms.reso.gridricevuti.valido'), dataIndex: 'validodsp',
            getEditor: function () {
                let vm = this.lookupViewModel()
                if (vm.get('readOnlyGrid') === true) {
                    return false
                }
                return {
                    xtype: 'combo',
                    displayField: 'descrizione',
                    editable: false,
                    forceSelection: true,
                    allowBlank: false,
                    matchFieldWidth: false,
                    bind: {
                        store: '{storeValido}'
                    },
                    listeners: {
                        select: function (combo, record) {
                            let grid = combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.valido = record.data['id']
                            }
                        }
                    }
                }
            }
            /*
            listeners: {
                beforecheckchange:function() {
                    let vm = this.lookupViewModel()
                    if (vm.get('readOnlyGrid') === true) {
                        return false
                    }
                }
            }

             */
        },
        {text: Locale.t('rec.forms.reso.gridricevuti.pcdos'), width: 100, dataIndex: 'pcdos',
            getEditor: function () {
                let vm = this.lookupViewModel(),
                    modifica = vm.get('readOnlyGrid')
                if (modifica === true) {
                    return false
                }
                return {
                    xtype: 'textfield', bind: {readOnly: '{readOnlyGrid}'}
                }
            }
        },
        {
            text: Locale.t('rec.forms.reso.gridricevuti.note'), width: 200, dataIndex: 'note',
            getEditor: function () {
                let vm = this.lookupViewModel()
                if (vm.get('readOnlyGrid') === true) {
                    return false
                }
                return {
                    xtype: 'textarea', allowBlank: true, grow: true,
                    growMax: 600, growMin: 600, anchor: '100%',
                    bind: {readOnly: '{readOnlyGrid}'}
                }
            }
        },
        {text: Locale.t('rec.forms.reso.gridricevuti.pcdos'), width: 100, menuDisabled: true, dataIndex: 'pcdos',hidden:true},
        {
            text: Locale.t('rec.forms.reso.gridricevuti.azione'),
            width: 150,
            dataIndex: 'azione',
            filter: {type: 'string'},
            getEditor: function () {
                let vm = this.lookupViewModel(),
                    modifica = vm.get('readOnlyAzione')
                if (modifica === true) {
                    return false
                }
                return {
                    xtype: 'combo',
                    displayField: 'azione',
                    minChars: 3,
                    selectOnFocus: true,
                    forceSelection: true,
                    allowBlank: false,
                    matchFieldWidth: false,
                    listConfig: {
                        loadingText: Locale.t('global.form.combo.ricerca') + '...',
                        emptyText: Locale.t('global.grid.store.empty')
                    },
                    bind: {
                        store: '{storeAzioni}'
                    },
                    listeners: {
                        select: function (combo, record) {
                            let grid = combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.idazione = record.data['valore']
                            }
                        }
                    }
                }
            }
        }
    ],
    listeners:{
        celldblclick  :function(cella, td, cellIndex, record) {
            if (record.data.codice==='' || record.data.note==='') {
                return false
            }
            if (cellIndex===14) {
                let wdwpanel = Ext.create('Ext.form.Panel', {
                    border: false, items: [
                        {xtype: 'box', html:Locale.t('rec.forms.reso.gridricevuti.articolo')+record.data.codice+' - '+record.data.depar},
                        {xtype: 'box', html:record.data.note}
                    ]
                });
                let wndw = Ext.create('Ext.Window', {
                    title: Locale.t('rec.forms.reso.gridricevuti.note'),
                    width: 550, autoHeight: true, closable: true,
                    bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
                    modal: true, border: false, resizable: false, draggable: false,
                    items: [wdwpanel]
                });
                wndw.show();
            }
        }
    }
})