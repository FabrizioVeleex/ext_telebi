/**
 * Created by fabrizio on 20/02/18.
 */
Ext.define('skd.view.forms.cruscotto.Revisioni', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.util.Format'
    ],
    viewConfig:{
        enableTextSelection: true,
        emptyText:Locale.t('skd.forms.cruscotto.rev.emptyText')
    },
    columns:{
        items: [
        {text:Locale.t('skd.forms.cruscotto.rev.columns.eff_phase_in_date'), renderer:Ext.util.Format.dateRenderer('d/m/Y'),dataIndex: 'eff_phase_in_date', width: 100},
        {text:Locale.t('skd.forms.cruscotto.rev.columns.eff_phase_out_date'), renderer:Ext.util.Format.dateRenderer('d/m/Y'), dataIndex: 'eff_phase_out_date', width: 100},
        {text:Locale.t('skd.forms.cruscotto.rev.columns.eng_chg_level'), dataIndex: 'eng_chg_level', width: 45},
        {text:Locale.t('skd.forms.cruscotto.rev.columns.revision_text'), dataIndex: 'revision_text', width: 70},
        {text:Locale.t('skd.forms.cruscotto.rev.columns.eng_chg_no'), dataIndex: 'eng_chg_no', width: 90},
        {text:Locale.t('skd.forms.cruscotto.rev.columns.engineer_code'), dataIndex: 'engineer_code', flex:1,minWidth: 80}
        ],
        defaults:{
            menuDisabled: true,
            sortable:false
        }
    }
});
