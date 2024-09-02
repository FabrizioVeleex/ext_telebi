Ext.define('qdc.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'qdc.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('qdc.view.main.Main');
        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
