import { StyleSheet, Platform } from 'react-native';

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
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: colors.background,
    justifyContent: 'flex-start',
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },

  formContainer: {
    flexGrow: 1,
  },

  inputContainer: {
    marginBottom: 16,
  },

  input: {
    backgroundColor: colors.backgroundLight,
    color: colors.text,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },

  messageInput: {
    height: 100,
    textAlignVertical: 'top', // Android multiline align top
  },

  inputError: {
    borderColor: colors.error,
  },

  errorText: {
    marginTop: 4,
    color: colors.error,
    fontSize: 13,
    fontWeight: '600',
  },

  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  submitButtonDisabled: {
    backgroundColor: colors.border,
  },

  submitButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },

  loadingIcon: {
    transform: [{ rotate: '0deg' }],
  },

  successMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  successText: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '700',
    color: colors.success,
  },

  successSubtext: {
    marginTop: 8,
    fontSize: 16,
    color: colors.accent,
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
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    shadowColor: colors.primary,
    shadowOpacity: 0.7,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  // New style to center Turnstile widget and move it down a bit
  turnstileContainer: {
    minHeight: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
