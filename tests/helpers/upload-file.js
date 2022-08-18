import { triggerEvent } from '@ember/test-helpers';

function createFile(content = ['test'], options={}) {
  const {
    name,
    type
  } = options;

  const file = new Blob(content, { type: type ? type: 'text/plain' });
  file.name = name || 'test.txt';

  return file;
}

export async function uploadFile(selector, content, options) {
  const file = createFile(content, options);

  return await triggerEvent(
    selector,
    'change',
    [file]
  );
}