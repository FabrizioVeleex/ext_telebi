Ext.define('stt.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'stt.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('stt.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
