export const rules = {
  first_name: [
    { required: true, message: 'Введите имя' },
    {
      pattern: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
      message: 'C заглавной буквы, только буквы или дефис',
    },
  ],
  second_name: [
    { required: true, message: 'Введите фамилию' },
    {
      pattern: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
      message: 'C заглавной буквы, только буквы или дефис',
    },
  ],
  login: [
    { required: true, message: 'Введите логин' },
    {
      pattern: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
      message: 'От 3 до 20 символов, латиница, цифры, - или _',
    },
  ],
  email: [
    { required: true, message: 'Введите email' },
    { type: 'email' as const, message: 'Невалидный email' },
  ],
  password: [
    { required: true, message: 'Введите пароль' },
    {
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      message: '8–40 символов, минимум 1 заглавная буква и 1 цифра',
    },
  ],
  phone: [
    { required: true, message: 'Введите телефон' },
    {
      pattern: /^\+?\d{10,15}$/,
      message: 'Телефон от 10 до 15 цифр',
    },
  ],
};
