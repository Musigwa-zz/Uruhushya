export default [
  {
    label: 'Enter your Email',
    textContentType: 'emailAddress',
    autoCapitalize: 'none',
    autoCompleteType: 'email',
    autoCorrect: false,
  },
  {
    label: 'Enter your First name',
    textContentType: 'familyName',
    autoCapitalize: 'words',
    autoCompleteType: 'name',
    autoCorrect: true,
  },
  {
    label: 'Enter your Last name',
    textContentType: 'givenName',
    autoCapitalize: 'words',
    autoCompleteType: 'name',
    autoCorrect: true,
  },
  {
    label: 'Enter your Password',
    textContentType: 'password',
    autoCapitalize: 'none',
    autoCompleteType: 'password',
    autoCorrect: false,
  },
  {
    placeholder: 'Type your message',
    label: '',
    textContentType: 'none',
    autoCapitalize: 'sentences',
    autoCompleteType: 'off',
    autoCorrect: false,
  },
];
