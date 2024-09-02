/**
 * Created by luke on 19/07/22.
 */
Ext.define('sdc.view.forms.sharedupd.Panel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Card',
        'sdc.view.forms.sharedupd.Controller',
        'sdc.view.forms.sharedupd.Model'
    ],
    viewModel: 'v1-sharedupd',
    controller: 'v1-sharedupd',
    layout: {
        type: 'card'
    },
    title: Locale.t('global.caricamento'),
    bind: {
        title: '{panelTitle}'
    },
    closable: true,
    dockedItems: [
        {
            xtype:'container',
            cls:'header-panel',
            bind:{
                html:'{formTitle}'
            }
        }
    ],
    activeItem: 0,
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});