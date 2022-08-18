import Component from '@ember/component';
import { get, set } from '@ember/object';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';

const SECURE_TOKEN = 'b045a93e-4da9-44ae-aad0-c7d4dcc0eaca';

export default Component.extend({
	classNames: ['form--container'],

	disableSave: reads('user.validation.isInvalid'),

	flashMessages: service(),

	store: service(),

	/**
	 * @private
	 * @method _resetForm
	 * 
	 * This method reset the form post successful save of email template
	 * and also clears any existing values in the attachment field.
	 */
	_resetForm() {
		set(this, 'didValidate', false);
		const form = this.element.querySelector('#email-template');
		const fileInput = this.element.querySelector('#file-upload');
		form.reset();
		set(this, 'user', this.store.createRecord('user', {}));
		fileInput.value = null;
	},

	actions: {
		/**
		 * @method sendEmail
		 * 
		 * This action uses `smtp.js` and send an
		 * email to the user.	
		 * 
		 * TODO: Send attachments in email.
		 */
		async sendEmail() {
			set(this, 'didValidate', true);
			const validation = await get(this, 'user').validate();

			if(get(validation, 'validations.isValid')) {
				// Send Email
				try {
					set(this, 'saving', true);
					
					/* eslint-disable no-def */
					await Email.send({
						SecureToken : SECURE_TOKEN,
						To : get(this, 'user.email'),
						From : "koushikrad@gmail.com",
						Subject : "Welocme to SGX",
						Body : get(this, 'user.description')
					});
					/* eslint-enable no-def */

					this.flashMessages.add({
						type: 'success',
						message: `🎉 Email is successfully sent to ${this.user.email}! Please check your inbox for the same.`,
						timeout: 3000,
					});

					this._resetForm();
				}
				catch(err) {
					this.flashMessages.add({
						type: 'danger',
						message: `${err} Please try again!`,
						timeout: 1000,
					});
				}
				finally {
					set(this, 'saving', false);
				}	
			}
		},

		attachImage() {
			const fileInput = this.element.querySelector('#file-upload');
			fileInput.click();
		},

		addImage(event) {
			const files = event.target.files;
			const userImages = get(this, 'user.images');

			if (files) {
				let reader = new FileReader();

				reader.onload = (e) => {
					if(userImages && userImages.length) {
						get(this, 'user.images').pushObject(e.target.result);
					} else {
						set(this, 'user.images', [ e.target.result ])
					}

					event.target.value = null;
				};

				reader.readAsDataURL(files[0]);
			}
			
		},

		removeImage(image) {
			get(this, 'user.images').removeObject(image);
		}
	}

});
