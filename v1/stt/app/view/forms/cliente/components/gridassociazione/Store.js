/**
 * Created by fabrizio on 09/01/2022.
 */
Ext.define('stt.view.forms.cliente.components.gridassociazione.Store', {
	extend: 'Ext.data.Store',
	alias: 'store.stt-v1-forms-cliente-store-associazione',
	requires: [
		'stt.view.forms.cliente.components.gridassociazione.Model'
	],
	model: 'stt.view.forms.cliente.components.gridassociazione.Model'
});