/**
 * Created by fabrizio on 11/02/21.
 */
Ext.define('nsm.overrides.form.field.VTypes', {
    override: 'Ext.form.field.VTypes',

    IPAddress:  function(value) {
        return this.IPAddressRe.test(value);
    },
    IPAddressRe: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    IPAddressText: 'Must be a numeric IP address',

    validatePhone: function (value){
        return this.validatePhoneRe.test(value);
    },
    validatePhoneRe: /^([+])?((3[\d]{2})([ ,\-,\/])?([\d, ]{6,9}))|(((0[\d]{1,4}))([ ,\-,\/])?([\d, ]{5,10}))$/,
    validatePhoneText:' Telefono non valido'

});