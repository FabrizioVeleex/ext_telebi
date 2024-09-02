/**
 * Created by fabrizio on 04/10/21.
 */
Ext.define('home.view.dashboard.widgets.worf.view.ordini.Grid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.feature.Summary',
        'Ext.grid.filters.Filters',
        'Ext.util.Format'
    ],
    bind: {
        store: '{storeOrdini}'
    },
    closable:true,
    features: [{ftype: 'summary', dock: 'bottom'}],
    plugins: [{
        ptype: 'gridfilters',
        menuFilterText: 'Filtri'
    }],
    viewConfig: {emptyText: Locale.t('global.grid.store.empty'), deferEmptyText: false},
    columns: [
        {text: Locale.t('worf.ordini.columns.cdord'), width: 120,
            dataIndex: 'cdord',summaryType: 'count', draggable: false,filter: {type: 'string'},
            renderer : function(v,m,r){
                if (r.data.ritardo==='N') {
                    return v
                } else {
                    return '<span style="color:red;">'+v+'</span>';
                }
            },
            summaryRenderer: function (value) {
                return '<span style=\"font-weight:bold;float:right\">' + value + '</span>'
            }
        },
        {text: Locale.t('worf.ordini.columns.qtord'),
            width: 150,
            dataIndex: 'qtord', align: 'right', draggable: false, summaryType: 'sum',
            renderer: function (v,m,r) {
                if (r.data.ritardo==='N') {
                    return Ext.util.Format.number(v, '0,000')
                } else {
                    return '<span style="color:red;">'+Ext.util.Format.number(v, '0,000')+'</span>';
                }
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value,'0,000');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            },
            filter: {type: 'numeric'}
        },
        {text: Locale.t('worf.ordini.columns.qtric'),
            width: 150,
            dataIndex: 'qtric', align: 'right', draggable: false, summaryType: 'sum',
            renderer: function (v,m,r) {
                if (r.data.ritardo==='N') {
                    return Ext.util.Format.number(v, '0,000')
                } else {
                    return '<span style="color:red;">'+Ext.util.Format.number(v, '0,000')+'</span>';
                }
            },
            summaryRenderer: function (value) {
                let tmp = Ext.util.Format.number(value,'0,000');
                return '<span style=\"font-weight:bold;\">' + tmp + '</span>'
            },
            filter: {type: 'numeric'}
        },
        {text: Locale.t('worf.ordini.columns.datac'), width: 130, dataIndex: 'datac',draggable: false,
            renderer : function(v,m,r){
                if (r.data.ritardo==='N') {
                    return Ext.util.Format.date(v,'d/m/Y')
                } else {
                    return '<span style="color:red;">'+Ext.util.Format.date(v,'d/m/Y')+'</span>';
                }
            }
        },
        {text: Locale.t('worf.ordini.columns.stato'), width: 130, dataIndex: 'stato',draggable: false,
            renderer : function(v,m,r){
                if (r.data.ritardo==='N') {
                    return v
                } else {
                    return '<span style="color:red;">'+v+'</span>';
                }
            }
        },
        {text: Locale.t('worf.ordini.columns.descstato'), flex:1, dataIndex: 'descstato',draggable: false,
            renderer : function(v,m,r){
                if (r.data.ritardo==='N') {
                    return v
                } else {
                    return '<span style="color:red;">'+v+'</span>';
                }
            }
        }
    ]
})
