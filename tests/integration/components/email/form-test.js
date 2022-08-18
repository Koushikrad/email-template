import { module, test } from 'qunit';
import { get } from '@ember/object';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, typeIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { uploadFile } from 'email-template/tests/helpers/upload-file';

module('Integration | Component | email/form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders all 5 fields of the email template', async function(assert) {
    const store = this.owner.lookup('service:store');
    this.user = store.createRecord('user', {});

    await render(hbs`<Email::Form
      @user={{this.user}}
    />`);

    assert.dom('[data-test-id="first-name"]').exists();
    assert.dom('[data-test-id="last-name"]').exists();
    assert.dom('[data-test-id="email"]').exists();
    assert.dom('[data-test-id="description"]').exists();
    assert.dom('[data-test-id="add-image"]').exists();
    assert.dom('[data-test-id="save"]').exists();
  });

  test('if validation works on necessary fields and email template is sent', async function(assert) {
    const store = this.owner.lookup('service:store');
    this.user = store.createRecord('user', {});
    this.Email = {};
    this.Email.send= () => {
      assert.ok();
    };

    await render(hbs`<Email::Form @user={{this.user}} @Email={{this.Email}}/>`);

    await click('[data-test-id="save"]');

    assert.dom('[data-test-id="first-name"] .error-msg').hasText("This field can't be blank");
    assert.dom('[data-test-id="last-name"] .error-msg').hasText("This field can't be blank");
    assert.dom('[data-test-id="email"] .error-msg').hasText("This field can't be blank");
    assert.dom('[data-test-id="description"] .error-msg').hasText("This field can't be blank");

    await typeIn('[data-test-id="first-name"] input', 'Koushik');
    await typeIn('[data-test-id="last-name"] input', 'Radhakrishnan');
    await typeIn('[data-test-id="email"] input', 'koushikrad@gmail.com');
    await typeIn('[data-test-id="description"] textarea', 'Software Developer with 6+ years of experience');

    assert.equal(get(this, 'user.firstName'), 'Koushik');
    assert.equal(get(this, 'user.lastName'), 'Radhakrishnan');
    assert.equal(get(this, 'user.email'), 'koushikrad@gmail.com');
    assert.equal(get(this, 'user.description'), 'Software Developer with 6+ years of experience');

    await click('[data-test-id="save"]');
  });

  test('it renders image preview after upload and removes on clear', async function(assert) {
    const store = this.owner.lookup('service:store');
    this.user = store.createRecord('user', {});

    await render(hbs`<Email::Form
      @user={{this.user}}
    />`);

    await uploadFile('#file-upload', [ 'sample Image' ], {
      name: 'sample.png',
      type: 'image/png'
    });

    assert.dom('[data-test-id="image-0"]').exists();

    await uploadFile('#file-upload', [ 'sample Image 2' ], {
      name: 'sample2.png',
      type: 'image/png'
    });

    assert.dom('[data-test-id="image-1"]').exists();

    await click('[data-test-id="image-1"] .close');

    assert.dom('[data-test-id="image-1"]').doesNotExist();
  });
});
