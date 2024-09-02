Ext.define('stcom.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'stcom.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('stcom.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
