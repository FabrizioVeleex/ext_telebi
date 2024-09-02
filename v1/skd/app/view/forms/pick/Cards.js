/**
 * Created by fabrizio on 29/12/17.
 */
Ext.define('skd.view.forms.pick.Cards', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Card',
        'skd.view.forms.pick.Controller',
        'skd.view.forms.pick.Model'
    ],
    layout :{
        type:'card'
    },
    controller:'pickcards',
    viewModel:'pickcards',
    activeItem: 0,
    dockedItems: [

    ],
    listeners:{
        afterRender:'onAfterRender',
        statusApp:'onStatusApp'
    }
});
