const container = document.createElement('div');
container.className = 'container-form';

const createFormSection = document.createElement('div');
createFormSection.className = 'form-section';

const formRegistration = document.createElement('form');
formRegistration.className = 'form';

const titleForm = document.createElement('h1');
titleForm.className = 'title-form';
titleForm.innerHTML = 'Authentication';

container.append(createFormSection, formRegistration, titleForm);
