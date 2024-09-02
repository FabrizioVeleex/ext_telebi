/**
 * Created by fabrizio on 08/10/2022.
 */
Ext.define('spl.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'spl.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('spl.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    },
});
