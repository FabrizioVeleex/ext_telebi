/**
 * Created by fabrizio on 19/03/17.
 */
Ext.define('recpub.view.form.resi.resi.GridOpen', {
    extend: 'Ext.grid.GridPanel',
    requires:[
        'recpub.view.form.resi.resi.StoreOpen',
        'Ext.grid.column.Date',
        'Ext.grid.column.Action'
    ],
    autoLoad:true,
    minHeight:150,
    viewConfig: {
        emptyText: Locale.t('global.emptygrid'),
        enableTextSelection: true
    },
    columns: [
        {xtype: 'actioncolumn', width: 30, menuDisabled:true,
            items: [{
                handler: 'onDettaglioOpen', iconCls: 'x-fa fa-eye', tooltip: Locale.t('global.openrecord')
            }]
        },
        {text:Locale.t('recpub.grids.resi.columns.datadoc'), dataIndex: 'datadoc', width: 160, xtype: 'datecolumn', format: 'd/m/Y'},
        {text:Locale.t('recpub.grids.resi.columns.progressivo'), dataIndex: 'progressivo', width:140},
        {text:Locale.t('recpub.grids.resi.columns.dossier'), dataIndex: 'dossier', flex:1},
        {text:Locale.t('recpub.grids.resi.columns.stato'), dataIndex: 'stato', flex:1}
    ],
    listeners:{
        afterRender:'onAfterRenderGrid'
    },
    initComponent: function () {
        this.store = Ext.create('recpub.view.form.resi.resi.StoreOpen');
        this.callParent(arguments)
    }
});