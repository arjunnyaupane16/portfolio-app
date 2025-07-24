import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding:24,
    marginTop:60,
    marginBottom:160,
    backgroundColor: '#0a192f',
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#F8FAFC',
    textAlign: 'center',
  },

  formContainer: {
    width: '100%',
  },

  inputContainer: {
    marginBottom: 16,
  },

  input: {
    backgroundColor: '#112240',
    color: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#112240',
  },

  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },

  inputError: {
    borderColor: '#e74c3c',
  },

  errorText: {
    color: '#e74c3c',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },

  submitButton: {
    backgroundColor: '#00b894',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  submitButtonDisabled: {
    opacity: 0.6,
  },

  loadingIcon: {
    transform: [{ rotate: '360deg' }],
  },

  successMessage: {
    alignItems: 'center',
    marginTop: 40,
  },

  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00b894',
    marginTop: 10,
  },

  successSubtext: {
    fontSize: 16,
    color: '#F8FAFC',
    marginTop: 4,
  },

  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 24,
  },

  socialButton: {
    backgroundColor: '#112240',
    padding: 14,
    borderRadius: 50,
  },
});
