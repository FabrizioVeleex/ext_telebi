/**
 * Created by Fabrizio on 20/12/2016.
 */
Ext.define('sdc.view.forms.shared.cards.GridLogDownload', {
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
            {text: Locale.t('sdc.forms.shared.gridlogdownload.datelog'), width: 180, dataIndex: 'datelog',
                xtype: 'datecolumn', format: 'd/m/Y H:i:s'
            },
            {text: Locale.t('sdc.forms.shared.gridlogdownload.note'), flex: 1, dataIndex: 'note'},
            {text: Locale.t('sdc.forms.shared.gridlogdownload.ipaddress'), width: 250, dataIndex: 'ipaddress'}
        ]
    }
});