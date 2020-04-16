let AlertRef;
export const setAlertRef = (ref) => {
  AlertRef = ref;
};

/**
 * @description This function implements the https://github.com/testshallpass/react-native-dropdownalert method called alertWithType
 * It accepts the same args like DropdownAlert.alertWithType.
 * @author MUSIGWA Pacifique
 * @param  {string} [message=''] The alert message to be display to the user
 * @param  {string} [type=''] The alert type in the type, refer to the link in the description
 * @param  {string} [title=''] The alert title to be shown
 * @return {function} The alertWithType method that renders a dropdown
 */
export const DropAlert = (message, type, title) => {
  return AlertRef.alertWithType(type, title, message);
};
