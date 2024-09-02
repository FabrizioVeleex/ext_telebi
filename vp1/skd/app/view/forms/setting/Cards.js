/**
 * Created by fabrizio on 05/08/21.
 */
Ext.define('skd.view.forms.setting.Cards', {
    extend: 'Ext.panel.Panel',
    requires:[
        'skd.view.forms.setting.Controller',
        'skd.view.forms.setting.Model',

        'Ext.container.Container',
        'Ext.layout.container.Card'
    ],
    layout :{
        type:'card'
    },
    controller:'cards',
    viewModel:'cards',
    activeItem: 0,
    dockedItems: [
        {
            xtype:'container',
            cls:'header-panel',
            bind:{
                html:'{formTitle}'
            }
        }
    ],
    listeners:{
        afterRender:'onAferRender'
    }
});
