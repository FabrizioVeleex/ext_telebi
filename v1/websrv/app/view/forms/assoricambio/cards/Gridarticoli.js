/**
 * Created by luca on 27/06/2017.
 */
Ext.define('websrv.view.forms.assoricambio.cards.Gridarticoli', {
    extend:'portal.v1.view.grids.DefaultGrid',
    requires: [
        'Ext.form.TextField',
        'Ext.form.field.Display',
        'Ext.toolbar.Fill',
        'Ext.util.Format'
    ],
    minHeight: 120,
    bind: {
        store: '{storeArticoli}'
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
        {text: Locale.t('websrv.forms.assoricambio.gridarticoli.columns.cdart'), dataIndex: 'cdart', width: 100, filter: {type: 'string'}},
        {text: Locale.t('websrv.forms.assoricambio.gridarticoli.columns.depar'), dataIndex: 'depar', flex:1},
        {text: Locale.t('websrv.forms.assoricambio.gridarticoli.columns.segmento'), dataIndex: 'segmento', width: 100},
        {text: Locale.t('websrv.forms.assoricambio.gridarticoli.columns.prezzocli'), dataIndex: 'prezzocli', align:'right',width: 130,
            renderer:function(v){
                return Ext.util.Format.currency(v, '€ ', 2);
            }
        },
        {text: Locale.t('websrv.forms.assoricambio.gridarticoli.columns.sc1'), dataIndex: 'sconto1', align:'center',width: 80},
        {text: Locale.t('websrv.forms.assoricambio.gridarticoli.columns.sc2'), dataIndex: 'sconto2',align:'center', width: 80},
        {text: Locale.t('websrv.forms.assoricambio.gridarticoli.columns.prezzo'), dataIndex: 'prezzo', align:'right',width: 130,
            renderer:function(v){
                return Ext.util.Format.currency(v, '€ ', 2);
            }
        },
        {text: Locale.t('websrv.forms.assoricambio.gridarticoli.columns.qta'), dataIndex: 'qta',align:'center', width: 150}
    ],
    items: [
        /* include child components here */
    ]
});