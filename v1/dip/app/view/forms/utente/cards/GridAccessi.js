Ext.define('dip.view.forms.utente.cards.GridAccessi', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Display',
        'Ext.form.field.Text',
        'Ext.grid.feature.Grouping'
    ],
    flex: 1,
    viewConfig: {
        emptyText: Locale.t('global.logdev.emptytext'),
        enableTextSelection: true,
        preserveScrollOnRefresh: true,
        preserveScrollOnReload: true,
        stripeRows: true
    },
    bind: {
        store: '{gridAccessi}'
    },

    features: [{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: [
            '{[this.formatName(values)]}', {
                formatName: function (values) {
                    let r = values.rows[0].data
                    if (r.tipo==='W'){
                        return "<i>"+Locale.t('dip.forms.utente.gridaccessi.tipo.widget')+"</i>; <b>"+values.name+'</b>'
                    }
                    return "<i>"+Locale.t('dip.forms.utente.gridaccessi.tipo.applicazione')+"</i>: <b>"+values.name+'</b>'
                }
            }
        ],
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    plugins: {
        // gridfilters: true
    },
    dockedItems: [
        {xtype:'toolbar', dock: 'top',
            items:[
                {
                    xtype: 'displayfield',
                    bind:{
                        hidden:'{hideFieldAccessi}',
                        value: '{valueDisplayAccessi}'
                    }
                },
                {
                    xtype: 'combo',
                    hidden: true,
                    queryMode: 'local',
                    displayField: 'uo',
                    forceSelection: true,
                    width:300,
                    bind: {
                        value: '{valueFieldAccessi}',
                        store: '{comboListUo}',
                        hidden:'{!hideFieldAccessi}'
                    }
                    , listeners: {
                        select: function (combo, record) {
                            let vm = this.lookupViewModel()
                            let predef = record.data['predef'] === 'S' ? ' <span style="color:green">Predefinito= Sì</span>' : ' <span style="color:#925d01">Predefinito= NO</span>'
                            vm.set('valueDisplayPredef',predef)
                            vm.getStore('gridAccessi').filter([{
                                property: 'uo',
                                value: record.data['uo']
                            }]);

                        },
                        beforequery: function (qe) {
                            delete qe.combo.lastQuery;
                        }
                    }
                },
                {
                    xtype: 'displayfield',
                    bind:{
                        hidden:'{!hideFieldAccessi}',
                        value: '{valueDisplayPredef}'
                    }
                },

            ]
        }
    ],
    columns: [
        {
            text: '',
            width:50
        },
        {
            text: Locale.t('dip.forms.utente.gridaccessi.column.tipouser'),
            dataIndex: 'tipouser',
            width:180,
            renderer: function(value, meta) {
                if (value==='FNZ') {
                    return Locale.t('dip.forms.utente.gridaccessi.tipouser.funz');
                }
                if (value==='UO') {
                    return Locale.t('dip.forms.utente.gridaccessi.tipouser.uo');
                }
                if (value==='USR') {
                    return Locale.t('dip.forms.utente.gridaccessi.tipouser.user');
                }
            },
        },
        {
            text: Locale.t('dip.forms.utente.gridaccessi.column.nome'),
            dataIndex: 'nome',
            minWidth:200,
            flex: 1
        },
        {
            text: Locale.t('dip.forms.utente.gridaccessi.column.ruolo'),
            dataIndex: 'ruolo',
            minWidth:200,
            flex: 1
        },
        {
            text: Locale.t('dip.forms.utente.gridaccessi.column.descrizione'),
            dataIndex: 'descrizione',
            minWidth:200,
            flex: 1
        },
    ]
});