import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const colors = {
  primary: '#4ea8de',         // soft sky blue for CTA/buttons
  primaryLight: '#73c2fb',    // lighter hover state

  accent: '#8acec4ff',        // minty green (subtle neon touch)
  secondary: '#3f3d56',       // muted dark violet-grey

  background: '#1e293b',      // deep desaturated blue-grey (main bg)
  backgroundLight: '#273349', // for cards/sections

  text: '#dbeafe',            // very soft, pastel blue
  textLight: '#94a3b8',       // muted text for descriptions/labels

  border: '#334155',          // soft border shade
  highlight: '#a5f3fc',       // for glow or focus states

  error: '#f87171',           // calm red
  success: '#34d399',         // smooth green
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,

    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 20,
    alignSelf: 'center',
  },

  formContainer: {
    width: '102%',
    maxWidth: 600,
    height: '55%',
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,         // fixed typo here
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },

  inputContainer: {
    marginBottom: 16,
  },

  input: {
    backgroundColor: '#1c2b42',
    color: colors.text,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  inputError: {
    borderColor: colors.error,
  },

  messageInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  errorText: {
    marginTop: 4,
    color: colors.error,
    fontSize: 13,
  },

  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
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
    transform: [{ rotate: '90deg' }],
  },

  successMessage: {
    alignItems: 'center',
    backgroundColor: '#163248',
    padding: 30,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  successText: {
    marginTop: 12,
    fontSize: 20,
    color: colors.success,
    fontWeight: 'bold',
  },

  successSubtext: {
    marginTop: 6,
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },

  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  socialButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 100,
    marginHorizontal: 10,   // replaced 'gap' with horizontal margin for spacing
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});
