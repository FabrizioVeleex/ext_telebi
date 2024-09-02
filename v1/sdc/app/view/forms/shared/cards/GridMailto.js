/**
 * Created by fabrizio on 22/05/17.
 */
Ext.define('sdc.view.forms.shared.cards.GridMailto', {
    extend: 'Ext.grid.Panel',
    xtype:'gridmailto',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.grid.ActionColumn',
        'Ext.grid.plugin.CellEditing',
        'portal.util.Functions',
        'sdc.model.forms.shared.GridMailto',
        'sdc.store.forms.shared.ComboMailto'
    ],
    minHeight: 220,
    header: false,
    title:'',
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },
    dockedItems:[
        {xtype:'toolbar', dock: 'top',
            items: [
                {xtype:'button', text: Locale.t('sdc.forms.shared.btn.lista.inserisci'), ui:'blue',
                    iconCls: 'fa fa-book', handler: 'addLista'
                }
            ],
            bind:{hidden:'{readOnly}'}
        }
    ],
    viewConfig:{
        enableTextSelection: true,
        getRowClass: function(record){
            return (record.get('action')===2) ? "bd-deleterow bd-defaultrow" : "bd-defaultrow";
        }
    },
    columns: [{
        bind:{
            hidden:'{readOnly}'
        },
        xtype: 'actioncolumn',
        menuDisabled:true,
        resizable:false,
        sortable:false,
        width: 30,
        items: [{
            getClass: function( view, meta, record){
                if (record.get('action')===2){
                    meta.tdAttr = 'data-qtip="'+Locale.t('sdc.global.ripristina')+'"';
                    return 'x-fas fa-trash bd-color-red';
                }else{
                    if (record.get('isnew')===0 || (record.get('isnew')===1 && record.get('mailto')!=='')){
                        meta.tdAttr = 'data-qtip="'+Locale.t('sdc.global.rimuovi')+'"';
                        return 'x-fas fa-trash bd-color-blue';
                    }
                }
                meta.tdAttr = 'data-qtip="'+Locale.t('sdc.global.aggiungi')+'"';
                return 'x-fas fa-arrow-right bd-color-green';
            },
            handler: function(view, rowIndex, colIndex, item, event, record) {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly') === true) {
                    return false
                }
                let grid = view.up('grid'),
                    lastrecord = grid.getStore().last()
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
            text: Locale.t('sdc.forms.shared.gridmailto.email'),
            flex:1,
            menuDisabled: true,
            resizable: false,
            sortable: false,
            dataIndex: 'mailto',
            getEditor: function (record) {
                let vm = this.lookupViewModel()
                if (vm.get('readOnly') === true) {
                    return false
                }
                let grid = this.up('grid'),
                    cellediting = grid.findPlugin('cellediting'),
                    editors = cellediting.editors,
                    editor = editors.getByKey(this.id);

                if (editor) {
                    // Fai questo per evitare perdite di memoria e problemi cambio tipo
                    editors.remove(editor);
                }

                if (record.get('isnew')===0){
                    return {
                        xtype: 'textfield',width:300
                    }
                }
                let pannello=this.up('modulo');
                let store = Ext.create('sdc.store.forms.shared.ComboMailto',{
                    listeners:{
                        beforeload: function(st) {
                            if (pannello) {
                                st.proxy.extraParams.idmodulo =pannello.valori.id;
                            }
                        }
                    }
                });
                return {
                    xtype: 'combo',
                    width:300,
                    store: store,
                    displayField: 'mailto',
                    vtype:'email',
                    hideTrigger: true,
                    minChars: 3,
                    selectOnFocus: true,
                    matchFieldWidth:false,
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item" style="border-bottom: 1px solid black">{ragsoc}: {contact}, {mailto}</li>',
                        '</tpl></ul>'
                    ),
                    listConfig: {
                        emptyText: Locale.t('global.form.combo.combo')
                    },
                    listeners: {
                        select: function (cmb,record) {
                            let grid = cmb.up('grid')
                             let row = grid.getSelectionModel().getSelection()[0];
                            row.data['ragsoc'] = record.data['ragsoc'];
                            row.data['mailto'] = record.data['mailto'];
                            row.data['contact'] = record.data['contact'];
                            row.data['row'] = record.data['row'];
                            grid.getView().refreshNode(row)
                            let task = new Ext.util.DelayedTask(function (cmb) {
                                cmb.ownerCt.completeEdit();
                            }, this, [cmb])
                            task.delay(100)
                            let lastrecord = grid.getStore().last()
                            if (lastrecord === row) {
                                    grid.getStore().add(Ext.create('sdc.model.forms.shared.GridMailto', {
                                    modifica:1,action: 1, isnew: 1, id: bdFunctions.bpRandomString(32),
                                    mailto:'',contact:''
                                }))
                            }
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                }
            }
        }, {
        text: Locale.t('sdc.forms.shared.gridmailto.contact'),
        flex:1, menuDisabled: true, resizable: false, sortable: false,
        dataIndex: 'contact',
        getEditor: function () {
            let vm = this.lookupViewModel()
            if (vm.get('readOnly') === true) {
                return false
            }
            return {
                xtype: 'textfield',width:300,
                listeners:{
                    specialkey:function(cmp,e) {
                        if (e.getKey() === e.ENTER || e.getKey()===e.TAB) {
                            let grid = cmp.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            grid.getView().refreshNode(row)
                            let lastrecord = grid.getStore().last()
                            if (lastrecord.data.mailto!=='') {
                                grid.getStore().add(Ext.create('sdc.model.forms.shared.GridMailto', {
                                    modifica:1,action: 1, isnew: 1,isread:false, id: bdFunctions.bpRandomString(32),
                                    mailto:'',contact:''
                                }))
                            }
                        }
                    }
                }
            }
        }
    },
        {
            text: Locale.t('sdc.forms.shared.gridmailto.ragsoc'),
            flex:1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'ragsoc',
            renderer: function(value){
                return value;
            },
            getEditor: function () {
               let vm = this.lookupViewModel()
                if (vm.get('readOnly') === true) {
                    return false
                }
                return {
                    xtype: 'textfield',width:300
                }
            }
        }
    ]
});