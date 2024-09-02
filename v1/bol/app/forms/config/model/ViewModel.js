/**
 * Created by fabrizio on 08/03/2022.
 */

Ext.define('bol.view.forms.config.model.ViewModel', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-bol-config',
    requires: [
        'bol.view.forms.config.cards.email.TreeStore'
    ],
    stores: {
        email: { xtype: 'v1-bol-tree-store'}
    },
    data:{
        cardactive:'email',
    }
});