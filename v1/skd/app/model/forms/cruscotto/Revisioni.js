/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.model.forms.cruscotto.Revisioni', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'eff_phase_in_date',type:'date', dateFormat: 'Y-m-d'},
        { name: 'eff_phase_out_date',type:'date', dateFormat: 'Y-m-d' },
        { name: 'eng_chg_level',    type: 'string' },
        { name: 'eng_chg_no',   type: 'string' },
        { name: 'engineer_code', type: 'string' }
    ]
});