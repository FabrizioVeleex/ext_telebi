/**
 * Created by fabrizio on 29/08/17.
 */
Ext.define('portal.view.dragFile.DragFile', {
    extend: 'Ext.panel.Panel',
    xtype: 'portal-dragfile',
    cls: 'stretch-html',
    requires: [
        'Ext.layout.container.Fit',
        'portal.util.Locale'
    ],

    width: 120,
    height: 120,
    layout: 'fit',

    bodyCls: 'drag-file-ct',

    html:
    '<div class="drag-file-label">' + Locale.t('upload.dropfile.text') +
    '</div>' +
    '<div class="drag-file-icon"></div>',
    listeners:{
        afterRender:'afterRenderDropFile'
    }
});

