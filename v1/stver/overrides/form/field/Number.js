/**
 * Created by luke on 21/03/23.
 */
/**
 * An override over ExtJS 6.0 Number class. Adds thousand separator feature controlled by setting the {@link #allowThousandSeparator} boolean property.
 */
Ext.define("stver.overrides.form.field.Number", {
    override: "Ext.form.field.Number",

    requires: [
        'Ext.util.Format'
    ],
    /**
     * @cfg {Boolean} allowThousandSeparator
     * False to disallow thousand separator feature.
     */
    allowThousandSeparator: true,

    /**
     * @private
     */
    toBaseNumber: function (value) {
        let me = this;
        return String(value).replace(new RegExp("[" + Ext.util.Format.thousandSeparator + "]", "g"), '').replace(me.decimalSeparator, '.');
    },

    /**
     * @private
     */
    parseRawValue: function (value) {
        let me = this;
        value = parseFloat(me.toBaseNumber(value));
        return isNaN(value) ? null : value;
    },

    getErrors: function(value) {
        if (!this.allowThousandSeparator)
            return this.callParent(arguments);
        value = arguments.length > 0 ? value : this.processRawValue(this.getRawValue());

        let me = this,
            errors = me.callSuper([value]),
            format = Ext.String.format,
            num;

        if (value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
            return errors;
        }

        value = me.toBaseNumber(value);

        if(isNaN(value)){
            errors.push(format(me.nanText, value));
        }

        num = me.parseValue(value);

        if (me.minValue === 0 && num < 0) {
            errors.push(this.negativeText);
        }
        else if (num < me.minValue) {
            errors.push(format(me.minText, me.minValue));
        }

        if (num > me.maxValue) {
            errors.push(format(me.maxText, me.maxValue));
        }

        return errors;
    },

    rawToValue: function (rawValue) {
        if (!this.allowThousandSeparator)
            return this.callParent(arguments);
        let value = this.fixPrecision(this.parseRawValue(rawValue));
        if (value === null) {
            value = rawValue || null;
        }
        return value;
    },

    valueToRaw: function (value) {
        if (!this.allowThousandSeparator) {
            return this.callParent(arguments);
        }
        let me = this,
            decimalSeparator = me.decimalSeparator,
            format = "0,000";
        if (me.allowDecimals) {
            for (let i = 0; i < me.decimalPrecision; i++) {
                if (i === 0) {
                    format += ".";
                }
                format += "0";
            }
        }
        value = me.parseValue(value);
        value = me.fixPrecision(value);
        value = Ext.isNumber(value) ? value : parseFloat(String(value).replace(decimalSeparator, '.'));
        value = isNaN(value) ? '' : Ext.util.Format.number(value, format);
        return value;
    },

    getSubmitValue: function () {
        if (!this.allowThousandSeparator)
            return this.callParent();
        let me = this,
            value = me.callSuper();

        if (!me.submitLocaleSeparator) {
            value = me.toBaseNumber(value);
        }
        return value;
    },

    setMinValue: function (value) {
        if (!this.allowThousandSeparator)
            return this.callParent(arguments);
        let me = this
            let minValue, allowed,ariaDom = me.ariaEl.dom

        me.minValue = minValue = Ext.Number.from(value, Number.NEGATIVE_INFINITY);
        me.toggleSpinners();

        // May not be rendered yet
        if (ariaDom) {
            if (minValue > Number.NEGATIVE_INFINITY) {
                ariaDom.setAttribute('aria-valuemin', minValue);
            }
            else {
                ariaDom.removeAttribute('aria-valuemin');
            }
        }

        // Build regexes for masking and stripping based on the configured options
        if (me.disableKeyFilter !== true) {
            allowed = me.baseChars + '';

            if (me.allowExponential) {
                allowed += me.decimalSeparator + 'e+-';
            }
            else {
                allowed += Ext.util.Format.thousandSeparator;
                if (me.allowDecimals) {
                    allowed += me.decimalSeparator;
                }
                if (me.minValue < 0) {
                    allowed += '-';
                }
            }

            allowed = Ext.String.escapeRegex(allowed);
            me.maskRe = new RegExp('[' + allowed + ']');
            if (me.autoStripChars) {
                me.stripCharsRe = new RegExp('[^' + allowed + ']', 'gi');
            }
        }
    }

});