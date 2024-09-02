/**
 * Created by luke on 2018-12-24.
 */
Ext.define('websrv.view.forms.webprodotto.cards.GridAccessi', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'Ext.form.field.Display',
        'Ext.form.TextField',
        'Ext.toolbar.Fill',
        'Ext.grid.column.Date',
        'Ext.grid.ActionColumn'
    ],
    minHeight: 120,
    bind: {
        store: '{store}'
    },
    dockedItems:[
        {xtype:'toolbar', dock: 'bottom',
            items: [{xtype:'textfield', width:300, hasSearch : false, paramName : 'query',
                triggers: {
                    clear: {cls: 'x-form-clear-trigger', hidden:true,
                        handler: 'onClearTriggetSearch'
                    },
                    search: {cls: 'x-form-search-trigger', handler: 'onSearchTriggetSearch'}
                },
                listeners:{specialkey:'onSpecialkeySearch'}
            },
                {xtype:'tbfill'},
                {xtype:'displayfield', reference:'totalCount'}
            ]
        }
    ],
    columns: [
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                getClass: function(v, metadata, r) {
                    if(r.get('iderror') < 0) {
                        return "bd-action-null x-fas fa-circle bd-color-red";
                    } else {
                        return "bd-action-null x-fas fa-circle bd-color-green";
                    }
                }
            }]
        },
        {text: Locale.t('websrv.forms.webprodotto.gridaccessi.columns.datelog'), dataIndex: 'datelog', width: 150, xtype: 'datecolumn', format: 'd/m/Y H:i:s', filter: {type: 'date',dateFormat: 'Ymd'}},
        {text: Locale.t('websrv.forms.webprodotto.gridaccessi.columns.utente'), dataIndex: 'utente', width: 180},
        {text: Locale.t('websrv.forms.webprodotto.gridaccessi.columns.ipaddress'), dataIndex: 'ipaddress', width: 180},
        {text: Locale.t('websrv.forms.webprodotto.gridaccessi.columns.log'), dataIndex: 'log', flex:1}
    ],
    items: [
        /* include child components here */
    ]
});