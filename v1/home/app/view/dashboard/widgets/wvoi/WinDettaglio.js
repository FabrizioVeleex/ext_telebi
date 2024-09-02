/**
 * Created by fabrizio on 22/07/21.
 */
Ext.define('home.view.dashboard.widgets.wvoi.WinDettaglio', {
    extend: 'Ext.Window',
    xtype:'v1-wvoidettaglio',
    requires: [
        'home.view.dashboard.widgets.wvoi.store.GridDettaglio',
        'home.view.dashboard.widgets.wvoi.GridDettaglio',
        'home.view.dashboard.widgets.wvoi.WinDettaglioController'
    ],
    modal:true,
    padding:10,
    controller:'v1-windettaglio',
    items: [
        {xtype:'v1-wvoi-gridDettaglio', reference:'gridDettvoi',
            width: 850,
            height: 370,
            store: {xtype: 'v1-wvoi-dettaglio'}
        }
    ],
    listeners:{
       afterRender:'onAfterRenderWinDet'
    }
});
