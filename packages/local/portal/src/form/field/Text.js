/**
 * Created by fabrizio on 27/09/16.
 */
Ext.define('portal.form.field.Text', {
    requires: [ 'Ext.form.field.Text' ],
    extend: 'Ext.form.field.Text',
    xtype:'bdtextfield',

    // alias: 'widget.tipstextfield',
    alternateClassName: 'Ext.form.TipsTextField',


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