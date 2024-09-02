Ext.define('sdc.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'sdc.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('sdc.view.main.Main');
        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
