/**
 * Created by Fabrizio on 20/12/2016.
 */
Ext.define('sdc.view.forms.sharedupd.cards.GridLogDownload', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Date'
    ],
    minHeight: 160,
    columns: {
        defaults:{
            menuDisabled: true
        },
        items: [
            {text: Locale.t('sdc.forms.sharedupd.gridlogdownload.datelog'), width: 180, dataIndex: 'datelog',
                xtype: 'datecolumn', format: 'd/m/Y H:i:s'
            },
            {text: Locale.t('sdc.forms.sharedupd.gridlogdownload.note'), flex: 1, dataIndex: 'note'},
            {text: Locale.t('sdc.forms.sharedupd.gridlogdownload.ipaddress'), width: 250, dataIndex: 'ipaddress'}
        ]
    }
});