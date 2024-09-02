Ext.define('doc.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'doc.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('doc.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
