import React, { useEffect, useRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Animated,
  Image,
  LayoutAnimation,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import profileImage from '../assets/images/profile.jpg';
import styles from '../styles/profileStyles';

export default function Profile() {
  // Animation refs
  const headerScale = useRef(new Animated.Value(0.8)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.7)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(30)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const bioHeight = useRef(new Animated.Value(0)).current;
  const eduCardScale = useRef(new Animated.Value(0.9)).current;
  const eduCardOpacity = useRef(new Animated.Value(0)).current;

  const [expandedBio, setExpandedBio] = useState(false);
  const [bioMeasuredHeight, setBioMeasuredHeight] = useState(0);

  // Function to calculate age dynamically from birthdate
  function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  }

  // Calculate age based on Dec 29, 2006
  const age = calculateAge('2006-12-29');

  // Enhanced About Me bio text with dynamic age and full stack + mobile dev info
  const bioText = `I am a passionate and detail-oriented Full Stack and Mobile App Developer, currently ${age} years old, pursuing my B.Tech in Computer Science from Quantum University, Roorkee.

With expertise in building scalable web applications and native mobile experiences, I specialize in technologies such as React, React Native, Node.js, Express, and MongoDB.I enjoy crafting clean, maintainable code and delivering intuitive user experiences on both web and mobile platforms.

My journey into software development is driven by curiosity and a love for creating impactful, efficient solutions that connect people and technology seamlessly.`;

  // Function to open URL safely
  const openURL = (url) => {
    Linking.openURL(url).catch((err) => {
      console.error("Failed to open URL:", err);
    });
  };

  useEffect(() => {
    // Animate on mount
    Animated.parallel([
      Animated.spring(headerScale, {
        toValue: 1,
        friction: 5,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(contentSlide, {
        toValue: 0,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(eduCardScale, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.timing(eduCardOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    Animated.spring(bioHeight, {
      toValue: expandedBio ? 1 : 0,
      friction: 8,
      useNativeDriver: false,
    }).start();
  }, [expandedBio]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerOpacity,
            transform: [{ scale: headerScale }],
          },
        ]}
      >
        <Text style={styles.headerText}>My Profile</Text>
      </Animated.View>

      {/* Profile Card */}
      <Animated.View
        style={[
          styles.profileCard,
          {
            opacity: imageOpacity,
            transform: [{ scale: imageScale }],
          },
        ]}
      >
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Animated.View
            style={[
              styles.circularBorder,
              {
                transform: [{ scale: imageScale }],
                opacity: imageOpacity,
              },
            ]}
          >
            <Image source={profileImage} style={styles.profileImage} />
          </Animated.View>
        </View>

        {/* Profile Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: contentOpacity,
              transform: [{ translateY: contentSlide }],
            },
          ]}
        >
          <Text style={styles.name}>Chandraprakash Nyaupane</Text>
          <Text style={styles.title}>Full Stack & Mobile App Developer</Text>

          <View style={styles.divider} />

          {/* About Me Section */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setExpandedBio(!expandedBio);
            }}
            style={styles.bioToggle}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <MaterialIcons
                name={expandedBio ? 'expand-less' : 'expand-more'}
                size={24}
                color="#4cc9f0"
              />
            </View>
          </TouchableOpacity>

          {/* Bio Section with animated height */}
          <View style={styles.bioContainer}>
            {/* Invisible measure view to get height */}
            <View
              style={{ position: 'absolute', opacity: 0 }}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                if (bioMeasuredHeight === 0) {
                  setBioMeasuredHeight(height);
                }
              }}
            >
              <Text style={styles.bio}>{bioText}</Text>
            </View>

            {/* Animated visible bio */}
            <Animated.View
              style={{
                height: bioHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, bioMeasuredHeight],
                }),
                overflow: 'hidden',
              }}
            >
              <Text style={styles.bio}>{bioText}</Text>
            </Animated.View>
          </View>
        </Animated.View>
      </Animated.View>

     {/* Education Section */}
<Animated.View
  style={[
    styles.educationCard,
    {
      opacity: eduCardOpacity,
      transform: [{ scale: eduCardScale }],
    },
  ]}
>
  <Text style={styles.sectionTitle}>Education</Text>

  {/* +2 College Entry */}
  <View style={styles.eduItem}>
    <View style={styles.eduIcon}>
      <MaterialIcons name="book" size={24} color="#4895ef" />
    </View>
    <View style={styles.eduDetails}>
      <TouchableOpacity
        onPress={() => openURL('https://whitehouse.edu.np/')}
        activeOpacity={0.7}
      >
        <Text style={[styles.eduTitle, {  color: '#4cc9f0' }]}>
          Himalayan WhiteHouse International College
        </Text>
      </TouchableOpacity>
      <Text style={styles.eduDegree}>+2 Science (PCM‑B)</Text>
      <Text style={styles.eduDate}>2021 – 2023</Text>
    </View>
  </View>

  {/* Underline Divider Between Entries */}
  <View
    style={{
      borderBottomWidth: 1,
      borderBottomColor: '#ccc', // adjust color as needed
      marginVertical: 10,         // space around divider
      width: '100%',
    }}
  />

  {/* Bachelor’s (B.Tech) Entry */}
  <View style={styles.eduItem}>
    <View style={styles.eduIcon}>
      <MaterialIcons name="school" size={24} color="#4cc9f0" />
    </View>
    <View style={styles.eduDetails}>
      <TouchableOpacity
        onPress={() => openURL('https://quantumuniversity.edu.in/')}
        activeOpacity={0.7}
      >
        <Text style={[styles.eduTitle, {  color: '#4cc9f0' }]}>
          Quantum University, Roorkee
        </Text>
      </TouchableOpacity>
      <Text style={styles.eduDegree}>B.Tech in Computer Science & Engineering</Text>
      <Text style={styles.eduDate}>2023 – 2027</Text>
      <Text style={styles.eduHighlight}>Coursework: DSA, Web Development, DBMS</Text>
    </View>
  </View>
</Animated.View>
   </ScrollView>
  );
}
