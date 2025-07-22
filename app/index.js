import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native';

// Make sure these components exist and are properly exported
import Contact from '../components/Contact';
import Profile from '../components/Profile';
import Projects from '../components/Projects';
import Skills from '../components/Skills';

import styles from '../styles/indexstyles';

const navItems = [
  { id: 'profile', icon: 'person', label: 'Profile' },
  { id: 'skills', icon: 'code', label: 'Skills' },
  { id: 'projects', icon: 'work', label: 'Projects' },
  { id: 'contact', icon: 'email', label: 'Contact' },
];

const Index = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(50)).current;
  const [activeSection, setActiveSection] = useState('profile');
  const scrollViewRef = useRef(null);
  const sectionPositions = useRef({});

  // Navbar animations
  const navbarSlide = useRef(new Animated.Value(-100)).current;
  const navbarOpacity = useRef(new Animated.Value(0)).current;
  const navItemAnimations = useRef(
    navItems.map(() => ({
      scale: new Animated.Value(0.8),
      opacity: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(navbarSlide, {
          toValue: 0,
          duration: 700,
          easing: Easing.out(Easing.back(1)),
          useNativeDriver: true,
        }),
        Animated.timing(navbarOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(100,
        navItemAnimations.map(anim =>
          Animated.parallel([
            Animated.timing(anim.scale, {
              toValue: 1,
              duration: 500,
              easing: Easing.elastic(1),
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
          ])
        )
      ),
    ]).start();
  }, []);

  const scrollToSection = (section) => {
    setActiveSection(section);
    const yOffset = sectionPositions.current[section] || 0;
    scrollViewRef.current?.scrollTo({
      y: yOffset,
      animated: true,
    });
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const sections = Object.entries(sectionPositions.current);
    let currentSection = 'profile';

    for (const [section, position] of sections) {
      if (scrollPosition >= position - 100) {
        currentSection = section;
      } else {
        break;
      }
    }
    setActiveSection(currentSection);
  };

  const saveSectionPosition = (section, y) => {
    sectionPositions.current[section] = y;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarSlide }], opacity: navbarOpacity }]}>
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;
          return (
            <Animated.View
              key={item.id}
              style={[styles.navItemContainer, {
                transform: [{ scale: navItemAnimations[index].scale }],
                opacity: navItemAnimations[index].opacity,
              }]}
            >
              <TouchableOpacity
                style={[styles.navItem, isActive && styles.activeNavItem]}
                onPress={() => scrollToSection(item.id)}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={isActive ? styles.activeIcon.color : styles.navIcon.color}
                />
                <Animated.Text style={[
                  styles.navText,
                  isActive && styles.activeNavText,
                  {
                    transform: [{
                      scale: isActive ?
                        navItemAnimations[index].scale.interpolate({
                          inputRange: [0.8, 1],
                          outputRange: [1, 1.1]
                        }) : 1
                    }]
                  }
                ]}>
                  {item.label}
                </Animated.Text>
                {isActive && (
                  <Animated.View style={[
                    styles.activeIndicator,
                    {
                      transform: [{
                        scaleX: navItemAnimations[index].scale.interpolate({
                          inputRange: [0.8, 1],
                          outputRange: [0.5, 1]
                        })
                      }]
                    }
                  ]} />
                )}
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </Animated.View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.animatedContainer, {
          opacity: fadeAnim,
          transform: [{ translateY: slideUpAnim }],
          paddingTop: 80,
        }]}>
          <View
            style={[styles.section, { backgroundColor: '#ffffff' }]}
            onLayout={(event) => saveSectionPosition('profile', event.nativeEvent.layout.y)}
          >
            <Profile />
          </View>

          <View
            style={[styles.section, { backgroundColor: '#ffffff' }]}
            onLayout={(event) => saveSectionPosition('skills', event.nativeEvent.layout.y)}
          >
            <Skills />
          </View>

          <View
            style={[styles.section, { backgroundColor: '#ffffff' }]}
            onLayout={(event) => saveSectionPosition('projects', event.nativeEvent.layout.y)}
          >
            <Projects />
          </View>

          <View
            style={[styles.section, { backgroundColor: '#ffffff' }]}
            onLayout={(event) => saveSectionPosition('contact', event.nativeEvent.layout.y)}
          >
            <Contact />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
