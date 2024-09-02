Ext.define('impexp.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'impexp.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('impexp.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
