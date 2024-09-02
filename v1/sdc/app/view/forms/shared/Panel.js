/**
 * Created by fabrizio on 13/02/2020.
 */
Ext.define('sdc.view.forms.shared.Panel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Card',
        'sdc.view.forms.shared.Controller',
        'sdc.view.forms.shared.Model'
    ],
    viewModel: {
        type: 'v1-shared'
    },
    controller: 'v1-shared',
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