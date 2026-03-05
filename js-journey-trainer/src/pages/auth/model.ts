export function submitForm(form: HTMLFormElement) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formDate = new FormData(form);
    console.log({
      username: String(formDate.get('username') ?? ''),
      email: String(formDate.get('email') ?? ''),
      password: String(formDate.get('password') ?? ''),
    });
  });
}
