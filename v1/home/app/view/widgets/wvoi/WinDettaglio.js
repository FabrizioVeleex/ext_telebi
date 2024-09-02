/**
 * Created by luca on 08/02/2018.
 */
Ext.define('home.view.widgets.wvoi.WinDettaglio', {
    extend: 'Ext.Window',
    xtype:'wvoidettaglio',
    requires: [
        'home.store.widgets.wvoi.GridDettaglio',
        'home.view.widgets.wvoi.GridDettaglio',
        'home.view.widgets.wvoi.WinDettaglioController'
    ],
    modal:true,
    padding:10,
    controller:'windettaglio',
    items: [
        {xtype:'xvoi-gridDettaglio', reference:'gridDettvoi',
            width: 850,
            height: 370,
            store: {xtype: 'wvoi-dettaglio'}
        }
    ],
    listeners:{
       afterRender:'onAfterRenderWinDet'
    }
});