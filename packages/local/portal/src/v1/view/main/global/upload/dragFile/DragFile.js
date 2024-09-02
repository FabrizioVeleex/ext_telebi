Ext.define('portal.v1.view.main.global.upload.dragFile.DragFile', {
    extend: 'Ext.panel.Panel',
    xtype: 'v1-dragfile',
    cls: 'stretch-html',
    requires: [
        'Ext.layout.container.Fit',
        'portal.util.Locale'
    ],

    width: 100,
    height: 100,
    layout: 'fit',
    bodyCls: 'drag-file-ct',
    html: '<div class="drag-div"><div class="drag-label" >' + Locale.t('global.upload.dropfile.text') + '</div>' +
        '<div class="drag-icon-div"><i class="drag-icon" ></i></div></div>',
    listeners: {
        afterRender: 'afterRenderDropFile'
    }
});

