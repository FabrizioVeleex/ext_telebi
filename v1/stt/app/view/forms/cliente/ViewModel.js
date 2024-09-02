/**
 * Created by fabrizio on 09/01/2022.
 */
Ext.define('stt.view.forms.cliente.ViewModel', {
	extend: 'portal.v1.view.forms.mainCard.Model',
	alias: 'viewmodel.v1-forms-cliente',

	requires: [
		'stt.view.forms.cliente.components.gridassociazione.Store',
		'stt.view.forms.cliente.components.comboSoggetto.Store'
	],
	stores: {
		storeAssociazione: { type: 'stt-v1-forms-cliente-store-associazione' }, //store associazione
		storeComboCliente: { type: 'v1-stt-form-cliente-soggetti' }, //store combo cliente
	},
	data: {
		cdcliReadOnly: true
	}
})