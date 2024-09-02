/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.gridlegami.ModelLegami', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'string', defaultValue: '' },
    { name: 'cd_art', type: 'string', defaultValue: '' },
    { name: 'desc_art', type: 'string', defaultValue: '' }
  ]
});