/**
 * Created by luke on 17/05/21.
 */
Ext.define('rec.view.forms.reso.cards.CardArticoli', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Card'
    ],
    layout :{
        type:'card'
    },
    scrollable:'y',
    closable: false,
    items: []
})