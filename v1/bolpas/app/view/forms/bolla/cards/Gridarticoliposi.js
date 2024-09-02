/**
 * Created by luke on 02/09/2020.
 */
Ext.define('bolpas.view.forms.bolla.cards.Gridarticoliposi', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.grid.column.Action',
        'Ext.grid.column.Check',
        'Ext.grid.plugin.CellEditing',
        'Ext.window.Window'
        //'bolpas.store.forms.Schedacombo'
    ],
    minHeight: 120,
    bind: {
        store: '{storeArticoli}'
    },
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
    },
    dockedItems: [
        {
            xtype: 'toolbar', dock: 'top',
            items: [{
                xtype: 'textfield',
                width: 450,
                hasSearch: false,
                paramName: 'query',
                fieldLabel: Locale.t('bolpas.forms.bolla.gridarticoli.filtra'),
                labelWidth: 80,
                triggers: {
                    clear: {
                        cls: 'x-form-clear-trigger', hidden: true, handler: 'onClearTriggetSearch'
                    },
                    search: {
                        cls: 'x-form-search-trigger', handler: 'onSearchTriggetSearch'
                    }
                },
                listeners: {specialkey: 'onSpecialkeySearch'}
            }
            ]
        }
    ],
    columns: [
        {text: Locale.t('bolpas.forms.bolla.gridarticoli.cdpar'), width: 130, dataIndex: 'cdpar'},
        {text: Locale.t('bolpas.forms.bolla.gridarticoli.cdpfo'), width: 130, dataIndex: 'cdpfo'},
        {text: Locale.t('bolpas.forms.bolla.gridarticoli.depar'), width: 350, dataIndex: 'depar'},
        {text: Locale.t('bolpas.forms.bolla.gridarticoli.qtmov'), width: 90, dataIndex: 'qtmov'},
        {text: Locale.t('bolpas.forms.bolla.gridarticoli.tipo'), width: 90, dataIndex: 'tipocontrollo', readOnly: true,
            renderer: function (v, m, r) {
                let g
                if (r.get('bloccata') === 1) {
                    g = 'color:gold;font-weight:bold;'
                } else {
                    if (r.get('conforme') === 0) {
                        g = 'color:red;font-weight:bold;'
                    } else {
                        g = 'color:green;font-weight:bold;'
                    }
                }
                return '<span style=' + g + ';>' + v + '</span>'
            }
        },
        {xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false,
            items: [{
                getClass: function (v, metadata, r) {
                    if (r.data.idscheda !== '') {
                        return "bd-action-null"
                    }
                    if (r.data.bloccata === 1) {
                        metadata.tdAttr = 'data-qtip="' + Locale.t('bolpas.forms.bolla.gridarticoli.sblocca') + '"'
                        return "bd-action-null x-fas fa-lock bd-color-blue"
                    }
                    if (r.data.tipo !== 0) {
                        metadata.tdAttr = 'data-qtip="' + Locale.t('bolpas.forms.bolla.gridarticoli.sbloccainfo') + '"'
                        return "bd-action-null x-fas fa-unlock bd-color-blue"
                    }
                    return "bd-action-null"
                }
            }],
            handler: 'onSbloccaScheda'
        },
        {text: Locale.t('bolpas.forms.bolla.gridarticoli.idscheda'), width: 150, dataIndex: 'scheda',
            getEditor: function (rec) {
                let vm = this.lookupViewModel()
                if (vm.get('readScheda') === true || rec.data.bloccata===0) {
                    return false
                }
                return {
                    xtype: 'combo', width: 300,matchFieldWidth: false, minChars: 2, selectOnFocus: true, forceSelection: true,
                    bind: {
                        store: '{storeSchede}'
                    },
                    displayField: 'numero',
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li role="option" class="x-boundlist-item">{descrizione}</li>',
                        '</tpl></ul>'
                    ),
                    listConfig: {loadingText: Locale.t('global.ricerca') + '...', emptyText: Locale.t('global.empty')},
                    listeners: {
                        select: function (combo, rec) {
                            let grid = combo.up('grid')
                            let row = grid.getSelectionModel().getSelection()[0]
                            if (row) {
                                row.data.idscheda = rec.data['id']
                            }
                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                }
            }
        },
        {xtype: 'actioncolumn', width: 30, menuDisabled: true, resizable: false,
            items: [{
                getClass: function (v, metadata, r) {
                    if (r.get('idscheda') !== '') {
                        metadata.tdAttr = 'data-qtip="' + Locale.t('bolpas.forms.bolla.gridarticoli.infoscheda') + '"';
                        return "bd-action-null x-fas fa-info-circle bd-color-blue";
                    }
                    return "bd-action-null";
                }
            }],
            handler:function(view, rowIndex, colIndex, item, opt, rec) {
                if (rec.data.idscheda==='') {
                    return false
                }
                let infoscheda=Locale.t('bolpas.forms.bolla.scheda.numero')+rec.data.scheda+'<br>'
                infoscheda=infoscheda+Locale.t('bolpas.forms.bolla.scheda.tipo')+rec.data.tiposcheda+'<br>'
                infoscheda=infoscheda+Locale.t('bolpas.forms.bolla.scheda.stato')+rec.data.statoscheda+'<br>'
                infoscheda=infoscheda+Locale.t('bolpas.forms.bolla.scheda.esito')+rec.data.risultato+'<br>'
                let btnX = new Ext.Button({
                    text: Locale.t('global.btn.annulla'), iconCls: 'x-fas fa-ban',
                    handler: function () {
                        wndw.destroy()
                    }})
                let wdwpanel = Ext.create('Ext.form.Panel', {border: false, items: [
                    {xtype:'box',html:infoscheda},]
                })
                let wndw = Ext.create('Ext.Window', {
                    tbar: [btnX], title:Locale.t('bolpas.forms.bolla.gridarticoli.infoscheda'),
                    width: 550,scrollable:true,closable: true, bodyStyle: {'padding': '10px', 'background-color': '#ffffff'},
                    modal: true, border: false, resizable: false, draggable: false,
                    items: [wdwpanel]
                })
                wndw.show()
            }
        },
        {width: 100, xtype: 'checkcolumn', text: Locale.t('bolpas.forms.bolla.gridarticoli.stato'), dataIndex: 'stato',
            listeners: {
                beforecheckchange:function(chk,rowIndex, checked, rec) {
                    let vm = this.lookupViewModel()
                    if (vm.get('readArt') === true || (rec.data.bloccata===1 || rec.data.conforme===0)) {
                        return false
                    }
                }
            }
        },
        {width: 100, xtype: 'checkcolumn', text: Locale.t('bolpas.forms.bolla.gridarticoli.statoq'), dataIndex: 'statoq',
            listeners: {
                beforecheckchange:function(chk,rowIndex, checked, rec) {
                    let vm = this.lookupViewModel()
                    if (vm.get('readArt') === true || (rec.data.bloccata===1 || rec.data.conforme===1)) {
                        return false
                    }
                }
            }
        },
        {text: Locale.t('bolpas.forms.bolla.gridarticoli.note'), width: 250, menuDisabled: true, dataIndex: 'note',
            getEditor: function (rec) {
                let vm = this.lookupViewModel()
                if (vm.get('readArt') === true) {
                    return false
                }
                return {xtype: 'textfield'}
            }
        }
    ]
});