/**
 * Created by fabrizio on 20/02/17.
 */
Ext.define('recpub.view.form.resi.dettaglio.Panel', {
    extend: 'Ext.form.Panel',
    requires:[
        'recpub.view.form.resi.dettaglio.PanelController',
        'recpub.view.form.resi.dettaglio.PanelModel',
        'Ext.layout.container.Card'
    ],
    controller: 'dettaglio',
    viewModel:'dettaglio',
    layout:{
        type:'card'
    },

    listeners: {
        afterRender: 'onAfterRender'
    }
});

