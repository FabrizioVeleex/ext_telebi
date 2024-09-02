/**
 * Created by fabrizio on 08/03/2022.
 */

Ext.define('pak.view.forms.config.model.ViewModel', {
    extend: 'portal.v1.view.forms.mainCard.Model',
    alias: 'viewmodel.v1-pak-config',
    requires: [
        'pak.view.forms.config.cards.email.TreeStore'
    ],
    stores: {
        email: { xtype: 'v1-pak-tree-store' }
    },
    data: {
        cardactive: 'email',
    }
});