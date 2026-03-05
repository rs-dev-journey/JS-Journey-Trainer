import createElement from '@/shared/lib/dom/create-element';
import './login.css';

type InputForm = {
  labelText: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
};

export function createInputForm(c: InputForm) {
  const label = createElement('label', {
    textContent: c.labelText,
  });
  label.htmlFor = c.id;

  const input = createElement('input', {
    classList: ['input-form'],
    attributes: {
      id: c.id,
      name: c.name,
      type: c.type,
      placeholder: c.placeholder,
      required: c.required ?? false,
    },
  });

  const inputGroup = createElement('div', {
    classList: ['input-group'],
    children: [label, input],
  });

  return { inputGroup, label, input };
}
