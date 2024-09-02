/**
 * Created by fabrizio on 02/01/18.
 *
 * FP-001: override per gestire bind array
 *
 */
Ext.define('skd.overrides.bind.Stub', {
    override: 'Ext.app.bind.Stub',

    getDataObject: function () {
        var me = this,
            parentData = me.parent.getDataObject(), // RootStub does not get here
            name = me.name,
            ret = parentData ? parentData[name] : null,
            storeMappings = me.bindMappings.store,
            associations;

        if (!ret) {
            if (parentData && parentData.isEntity) {
                // Check if the item is an association, if it is, grab it but don't load it.
                associations = parentData.associations;
                if (associations && name in associations) {
                    ret = parentData[associations[name].getterName]();
                }
            }
        } else if (parentData.isStore && name in storeMappings) {
            ret = parentData[storeMappings[name]]();
        }

        //FP-001 MODIFICA
        // if (!ret || !(ret.$className || Ext.isObject(ret))) {
        if (!ret || !(ret.$className || Ext.isObject(ret) || Ext.isArray(ret))) {
            parentData[name] = ret = {};
            // We're implicitly setting a value on the object here
            me.hadValue = true;
            // If we're creating the parent data object, invalidate the dirty
            // flag on our children.
            me.invalidate(true, true);
        }

        return ret;
    },
    set: function (value, preventClimb) {
        var me = this,
            parent = me.parent,
            name = me.name,
            formula = me.formula,
            parentData, associations,
            association, formulaStub, setterName;

        if (formula && !formula.settingValue && formula.set) {
            formula.setValue(value);
            return;
        } else if (me.isLinkStub) {
            formulaStub = me.getLinkFormulaStub();
            formula = formulaStub ? formulaStub.formula : null;
            if (formula) {
                //<debug>
                if (formulaStub.isReadOnly()) {
                    Ext.raise('Cannot setValue on a readonly formula');
                }
                //</debug>
                formula.setValue(value);
                return;
            }
        }

        // To set a child property, the parent must be an object...
        parentData = parent.getDataObject();

        if (parentData.isEntity) {
            associations = parentData.associations;

            if (associations && (name in associations)) {
                association = associations[name];
                setterName = association.setterName;
                if (setterName) {
                    parentData[setterName](value);
                }
                // We may be setting a record here, force the value to recalculate
                me.invalidate(true);
            } else {
                // If not an association then it is a data field
                parentData.set(name, value);
            }

            // Setting fields or associated records will fire change notifications so we
            // handle the side effects there

            //FP-001 MODIFICA
            // } else if ((value && value.constructor === Object) || !(value === parentData[name] && parentData.hasOwnProperty(name))) {
        // } else if ((value && value.constructor === Object || value.constructor === Array) || !(value === parentData[name] && parentData.hasOwnProperty(name))) {
        } else if ((value && (value.constructor === Object || value.constructor === Array)) || !(value === parentData[name] && parentData.hasOwnProperty(name))) {
            // The hasOwnProperty check is important, even though the value might be the same here, that value
            // could exist in a viewmodel above us
            if (preventClimb || !me.setByLink(value)) {
                if (value === undefined) {
                    delete parentData[name];
                } else {
                    parentData[name] = value;
                }

                me.inspectValue(parentData);
                // We have children, but we're overwriting the value with something else, so
                // we need to schedule our children
                me.invalidate(true);
            }
        }
    }
});