Ext.define('webord.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'webord.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('webord.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
