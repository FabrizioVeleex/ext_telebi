/**
 * Created by luke on 15/02/21.
 */
Ext.define('portal.v1.model.forms.combo.GetResources', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string'},
        { name: 'risorsa', type: 'string'},
        { name: 'tipo', type: 'string'} //identifica se user, UO o gruppo funzionale
    ]
});