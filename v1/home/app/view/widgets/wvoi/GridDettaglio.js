/**
 * Created by luca on 08/02/2018.
 */
Ext.define('home.view.widgets.wvoi.GridDettaglio', {
    extend: 'Ext.grid.Panel',
    xtype:'xvoi-gridDettaglio',
    multiSelect: false,
    viewConfig: {emptyText: 'Nessun record presente', deferEmptyText: false}
    , columns: [
        {text: Locale.t('widgetvoice.griddettaglio.evdtev'), width: 100, dataIndex: 'evdtev',resizable: false,draggable: false},
        {text: Locale.t('widgetvoice.griddettaglio.evart1'), flex:1, dataIndex: 'evart1', resizable: false, draggable: false},
        {text: Locale.t('widgetvoice.griddettaglio.evnuor'), width: 120, dataIndex: 'evnuor', resizable: false, draggable: false},
        {text: Locale.t('widgetvoice.griddettaglio.evnrev'), width: 120, dataIndex: 'evnrev', resizable: false, draggable: false},
        {text: Locale.t('widgetvoice.griddettaglio.evqtas'), width: 120, dataIndex: 'evqtas', resizable: false, draggable: false},
        {text: Locale.t('widgetvoice.griddettaglio.evlott'), width: 120, dataIndex: 'evlott', resizable: false, draggable: false}
    ]
});