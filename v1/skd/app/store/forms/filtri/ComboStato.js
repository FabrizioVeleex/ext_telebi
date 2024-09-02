/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.store.forms.filtri.ComboStato', {
  extend: 'Ext.data.Store',
  alias: 'store.comboStato',
  fields: [
    { name: 'stato', type: 'string' },
    { name: 'io', type: 'string' },
  ],
  proxy: {
    type: 'rest',
    url: Backend.REST_API + 'forms/filters/getcombostato/',
    appendId: false,
    reader: {
      type: 'json',
      rootProperty: 'data'
    },
    writer: {
      type: 'json',
      writeAllFields: true
    }
  },
  // proxy: {
  //   type: 'memory',
  //   data: [
  //     { id: 'ALL', stato: 'Tutti', io: 'in' },
  //     { id: 'WIP', stato: 'PI+AR+CR', io: 'in' },
  //     { id: 'DP', stato: 'DP - Da preparare', io: 'in' },
  //     { id: 'PI', stato: 'PI - Preparazione iniziata', io: 'in' },
  //     { id: 'AR', stato: 'AR - Attesa ricevimenti', io: 'in' },
  //     { id: 'CR', stato: 'CR - Ricevimenti da controllare', io: 'in' },
  //     { id: 'OK', stato: 'OK - Preparazione completata', io: 'in' }
  //   ]
  // }

});