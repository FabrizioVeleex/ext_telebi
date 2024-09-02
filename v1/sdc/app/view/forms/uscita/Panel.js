/**
 * Created by luke on 19/07/22.
 */
Ext.define('sdc.view.forms.uscita.Panel', {
    extend: 'Ext.panel.Panel',
    bodyPadding: 15,
    border:false,
    header:false,
    items: [
        {xtype:'box',html:Locale.t('sdc.grids.uscitapanel')}
    ]
});