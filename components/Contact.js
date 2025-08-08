import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  findNodeHandle
} from 'react-native';
import styles from '../styles/ContactStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const siteKey = '0x4AAAAAABo-AwfHASrMzqde';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  const turnstileRef = useRef(null);

  // Inject Turnstile on web
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    document.body.appendChild(script);

    // Create widget when loaded
    script.onload = () => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token) => setTurnstileToken(token),
          theme: 'light',
        });
      }
    };

    return () => {
      document.body.removeChild(script);
      if (window.turnstile && window.turnstile.reset) {
        window.turnstile.reset();
      }
    };
  }, []);

  // Keyboard listeners
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Platform.OS === 'web' && !turnstileToken) {
      newErrors.turnstile = 'Please verify that you’re human.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsLoading(true);

    Animated.timing(successAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setIsSubmitted(true);

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
      successAnim.setValue(0);
      setIsLoading(false);
      setTurnstileToken(null);
      if (Platform.OS === 'web' && window.turnstile) {
        window.turnstile.reset();
      }
    }, 3000);
  };

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
    } catch (error) {
      console.error('Link error:', error);
    }
  };

  const FormInputs = (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Your Name"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholderTextColor="#95a5a6"
          editable={!isLoading}
          autoCorrect={false}
          autoComplete="name"
          returnKeyType="next"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Your Email"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#95a5a6"
          editable={!isLoading}
          autoCorrect={false}
          autoComplete="email"
          returnKeyType="next"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.messageInput, errors.message && styles.inputError]}
          placeholder="Your Message"
          value={formData.message}
          onChangeText={(text) => handleChange('message', text)}
          multiline
          numberOfLines={4}
          placeholderTextColor="#95a5a6"
          editable={!isLoading}
          autoCorrect={false}
          returnKeyType="done"
        />
        {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
      </View>

      {Platform.OS === 'web' && (
        <View style={styles.inputContainer}>
          <View ref={turnstileRef} style={{ minHeight: 65 }} />
          {errors.turnstile && <Text style={styles.errorText}>{errors.turnstile}</Text>}
        </View>
      )}

      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <Feather name="loader" size={24} color="#fff" style={styles.loadingIcon} />
        ) : (
          <Text style={styles.submitButtonText}>Send Message</Text>
        )}
      </TouchableOpacity>
    </>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideUpAnim }],
        },
      ]}
      pointerEvents="auto"
    >
      <Text style={styles.sectionTitle}>Get In Touch</Text>

      {isSubmitted ? (
        <Animated.View
          style={[
            styles.successMessage,
            {
              opacity: successAnim,
              transform: [
                {
                  scale: successAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Ionicons name="checkmark-circle" size={50} color="#00b894" />
          <Text style={styles.successText}>Thanks for your message!</Text>
          <Text style={styles.successSubtext}>I'll get back to you soon.</Text>
        </Animated.View>
      ) : Platform.OS === 'web' ? (
        <View style={styles.formContainer}>{FormInputs}</View>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.formContainer}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
          >
            {FormInputs}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}

      {!isKeyboardVisible && (
        <View style={styles.socialLinks}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => openLink('mailto:arjunnyaupane16@gmail.com')}
            activeOpacity={0.7}
          >
            <MaterialIcons name="email" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => openLink('https://linkedin.com/in/arjunnyaupane16')}
            activeOpacity={0.7}
          >
            <FontAwesome name="linkedin" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => openLink('https://github.com/arjunnyaupane16')}
            activeOpacity={0.7}
          >
            <FontAwesome name="github" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
}
