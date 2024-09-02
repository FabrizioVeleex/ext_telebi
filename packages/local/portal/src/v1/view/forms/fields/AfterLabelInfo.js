/**
 * Created by fabrizio on 26/01/21.
 */
Ext.define('portal.v1.view.forms.fields.AfterLabelInfo', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.afterlabelinfo',

    requires: [
        'Ext.util.Format'
    ],

    init: function (cmp) {
        let me = this; // the plugin
        cmp.afterLabelTextTpl = [
            '<i',
            ' class="x-ux-plugin-afterlabelinfo fas fa-info-circle"',
            ' data-qtip="',
            Ext.util.Format.htmlEncode(me.qtip || ''),
            '">',
            '</i>'
        ].join('');
    }
});