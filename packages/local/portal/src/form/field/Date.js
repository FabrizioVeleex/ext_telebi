/**
 * Created by fabrizio on 27/09/16.
 */
Ext.define('portal.form.field.Date', {
    requires: [
        'Ext.form.field.Date',
        'Ext.tip.ToolTip'
    ],
    extend: 'Ext.form.field.Date',
    xtype:'bddatefield',
    // alias: 'widget.tipstextfield',
    alternateClassName: 'Ext.form.TipsDateField',

    afterRender: function (ct, position) {
        var me = this;
        me.callParent(arguments);
        if (this.readOnly){
            this.inputEl.addCls('bd-field-readonly');
        }
        if(this.fieldLabelTip && this.labelEl) {
            this.fieldLabelTip = Ext.create('Ext.tip.ToolTip', {
                target: this.labelEl,
                trackMouse: true,
                html: this.fieldLabelTip
            });
        }
    }
});