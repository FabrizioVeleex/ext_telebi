/**
 * Created by luke on 03/06/23.
 */
Ext.define('cli.forms.cliente.grids.Contatti', {
    extend: 'Ext.grid.Panel',
    xtype:'v1-cli-gridcontatti',
    requires: [
        'Ext.button.Button',
        'Ext.grid.column.Action'
    ],
    minHeight: 250,
    bind: {
        store: '{storeContatti}'
    },
    dockedItems: [{xtype: 'toolbar', dock: 'top', reference:'toolbarForm',items: [
            {xtype: 'button', text: Locale.t('cli.forms.cliente.contatto.btn.new'),
                iconCls: 'x-fas fa-user-plus', ui: 'blue', handler: 'onNewContatto'
            }
        ]
    }
    ],
    columns: [
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
            items: [{
                getClass: function( view, meta, record){
                    let vm = this.lookupViewModel()
                    if (vm.get('readOnlyContatto')) {
                        return 'bd-action-null'
                    }
                    return 'x-fas fa-user-times bd-color-red'
                },
                handler: 'onRemoveContatto'
            }]
        },
        {xtype: 'actioncolumn', menuDisabled:true, resizable:false, sortable:false, width: 30,
            items: [{
                getClass: function( view, meta, record){
                    let vm = this.lookupViewModel()
                    if (vm.get('readOnlyContatto')) {
                        return 'bd-action-null'
                    }
                    return 'x-fas fa-user-edit bd-color-blue'
                },
                handler: 'onOpenContatto'
            }]
        },
        {flex:1, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'nominativo', text: Locale.t('cli.forms.cliente.gridcontatti.nominativo')
        },
        {width:300, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'telefono', text: Locale.t('cli.forms.cliente.gridcontatti.telefono')
        },
        {width:300, menuDisabled: true, resizable: false, sortable: false,
            dataIndex: 'email', text: Locale.t('cli.forms.cliente.gridcontatti.email')
        }
    ]
});