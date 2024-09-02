/**
 * Created by fabrizio on 09/08/16.
 */
Ext.define('home.view.main.TaskBar', {
    extend: 'Ext.toolbar.Toolbar',
    cls: "bp-taskbar",
    defaults:{
        scale   : 'large'
    },
    listeners:{
        addBtnTaskBar:'onAddBtnTaskBar',
        removeBtnTaskBar:'onRemoveBtnTaskBar'
    }
});