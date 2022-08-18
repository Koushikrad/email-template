import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const { Model } = DS;
const Validations = buildValidations({
  'firstName': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    }),
    validator('length', {
      min: 2,
      max: 120
    })
  ],

  'lastName': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    }),
    validator('length', {
      min: 2,
      max: 120
    })
  ],

  'email': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    }),
    validator('format', {
      type: 'email',
      allowBlank: true
    })
  ],

  'description': [
    validator('presence', {
      presence: true,
      ignoreBlank: true
    }),

    validator('length', {
      max: 384000
    })
  ]
})

export default Model.extend(Validations, {
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  description: DS.attr('string'),
  images: DS.attr()
});
