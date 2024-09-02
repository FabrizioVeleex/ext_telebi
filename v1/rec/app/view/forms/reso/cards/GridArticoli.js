/**
 * Created by luca on 17/03/2017.
 */
Ext.define('rec.view.forms.reso.cards.GridArticoli', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Date'
    ],
    minHeight: 120,
    bind: {
        store: '{gridArticoli}'
    },
    columns: [
        {text: Locale.t('rec.forms.reso.gridarticoli.causale'), width:250, menuDisabled: true, dataIndex: 'causale'},
        {text: Locale.t('rec.forms.reso.gridarticoli.cdars'), width:100, menuDisabled: true, dataIndex: 'cdars'},
        {text: Locale.t('rec.forms.reso.gridarticoli.depar'), flex:1, menuDisabled: true, dataIndex: 'depar'},
        {text: Locale.t('rec.forms.reso.gridarticoli.nrbos'), width:150, menuDisabled: true, dataIndex: 'nrbos'},
        {text: Locale.t('rec.forms.reso.gridarticoli.dtbos'), width:150, menuDisabled: true,
            dataIndex: 'dtbos',xtype: 'datecolumn', format: 'd/m/Y'
        },
        {text: Locale.t('rec.forms.reso.gridarticoli.qta'), width:100, menuDisabled: true, dataIndex: 'qta'},
        {text: Locale.t('rec.forms.reso.gridarticoli.dossier'), width:100, menuDisabled: true, dataIndex: 'pcdos'}
    ]
})