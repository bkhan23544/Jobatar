import validator from 'validator';

class FormValidator {

    constructor(validations) {
        // validations is an array of validation rules specific to a form
        this.validations = validations;
        this.refs = null;
    }

    validate(state, refs = null) {
        // start out assuming valid
        let validation = this.valid();
        this.refs = refs;

        // for each validation rule
        this.validations.forEach(rule => {

            // if the field hasn't already been marked invalid by an earlier rule
            if (!validation[rule.field].isInvalid) {
                // determine the field value, the method to invoke and optional args from
                // the rule definition
                const field_value = state[rule.field].toString();
                const args = rule.args || [];
                const validation_method =
                    typeof rule.method === 'string' ?
                        validator[rule.method] :
                        rule.method;

                //if(rule.method == 'equals'){
                //console.log(validation_method);
                //}


                // call the validation_method with the current field value as the first
                // argument, any additional arguments, and the whole state as a final
                // argument.  If the result doesn't match the rule.validWhen property,
                // then modify the validation object for the field and set the isValid
                // field to false

                let validMethod = validation_method(field_value, ...args, state);
                if (validMethod !== rule.validWhen) {
                    validation[rule.field] = { isInvalid: true, message: rule.message };
                    validation.isValid = false;
                    if (this.refs) {
                        this.showErrors(rule);
                    }
                }

            }
        });

        return validation;
    }

    showErrors(rule) {
        //const ref = this.refs[rule.field];
        //console.log(rule.field + '  ' + new  Date().toLocaleString()  );
        //ref.className =  `${ref.className} is-invalid`;
    }

    valid() {
        const validation = {};
        this.validations.map(rule => (
            validation[rule.field] = { isInvalid: false, message: '' }
        ));
        return { isValid: true, ...validation };
    }
}

export default FormValidator;
