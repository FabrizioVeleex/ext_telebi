/**
 * Created by luca on 13/09/2017.
 */
Ext.define('spl.main.Documento', {
    extend: 'Ext.panel.Panel',
    bodyPadding: 15,
    scrollable: true,
    items: [

    ],
    listeners: {
        afterRender: 'onAfterRenderDocumento'
    }
});