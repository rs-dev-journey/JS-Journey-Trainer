import createElement from '@/shared/lib/dom/create-element';
import './login.css';

type InputForm = {
  labelText: string;
  id: string;
  name: 'username' | 'email' | 'password';
  type: 'text' | 'email' | 'password';
  placeholder: string;
  required?: boolean;
};

export function createInputForm(inputConfig: InputForm) {
  const label = createElement('label', {
    textContent: inputConfig.labelText,
  });
  label.htmlFor = inputConfig.id;

  const input = createElement('input', {
    classList: ['input-form'],
    attributes: {
      id: inputConfig.id,
      name: inputConfig.name,
      type: inputConfig.type,
      placeholder: inputConfig.placeholder,
      required: inputConfig.required ?? false,
    },
  });

  const errorMessage = createElement('p', {
    classList: ['error-input'],
    textContent: '',
  });

  const inputGroup = createElement('div', {
    classList: ['input-group'],
    children: [label, input, errorMessage],
  });

  return { inputGroup, label, input, errorMessage };
}

export function firstLetterCapitalize(value: string) {
  const trimmedValue = value.trim();
  if (!trimmedValue) return '';
  return trimmedValue[0].toUpperCase() + trimmedValue.slice(1);
}
