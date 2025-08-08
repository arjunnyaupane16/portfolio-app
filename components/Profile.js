import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  LayoutAnimation,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import profileImage from '../assets/images/profile.jpg';
import styles from '../styles/profileStyles';

export default function Profile() {
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

  const bioText = `I am a passionate and detail-oriented full-stack developer pursuing my B.Tech in Computer Science from Quantum University, Roorkee.

My journey into technology began with a curiosity for how things work, and it evolved into a love for building modern web and mobile apps.

I enjoy crafting clean, scalable code and building intuitive experiences using tools like React, Node.js, and MongoDB.`;

  useEffect(() => {
    // Animate on mount
    Animated.parallel([
      Animated.spring(headerScale, {
        toValue: 1,
        friction: 5,
        tension: 70,
        useNativeDriver: true
      }),
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true
      }),
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.spring(contentSlide, {
        toValue: 0,
        friction: 7,
        tension: 40,
        useNativeDriver: true
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.spring(eduCardScale, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true
      }),
      Animated.timing(eduCardOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  useEffect(() => {
    Animated.spring(bioHeight, {
      toValue: expandedBio ? 1 : 0,
      friction: 8,
      useNativeDriver: false
    }).start();
  }, [expandedBio]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerOpacity,
            transform: [{ scale: headerScale }]
          }
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
            transform: [{ scale: imageScale }]
          }
        ]}
      >
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Animated.View
            style={[
              styles.circularBorder,
              {
                transform: [{ scale: imageScale }],
                opacity: imageOpacity
              }
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
              transform: [{ translateY: contentSlide }]
            }
          ]}
        >
          <Text style={styles.name}>Chandraprakash Nyaupane</Text>
          <Text style={styles.title}>Mobile App Developer</Text>

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
            <View
              style={{ position: 'absolute', opacity: 0 }}
              onLayout={event => {
                const { height } = event.nativeEvent.layout;
                if (bioMeasuredHeight === 0) {
                  setBioMeasuredHeight(height);
                }
              }}
            >
              <Text style={styles.bio}>{bioText}</Text>
            </View>

            <Animated.View
              style={{
                height: bioHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, bioMeasuredHeight]
                }),
                overflow: 'hidden'
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
            transform: [{ scale: eduCardScale }]
          }
        ]}
      >
        <Text style={styles.sectionTitle}>Education</Text>

        <View style={styles.eduItem}>
          <View style={styles.eduIcon}>
            <MaterialIcons name="school" size={24} color="#4cc9f0" />
          </View>
          <View style={styles.eduDetails}>
            <Text style={styles.eduTitle}>Quantum University, Roorkee</Text>
            <Text style={styles.eduDegree}>B.Tech in Computer Science & Engineering</Text>
            <Text style={styles.eduDate}>2023 - 2027</Text>
            <Text style={styles.eduHighlight}>
              Coursework: DSA, Web Development, DBMS
            </Text>
          </View>
        </View>

        <View style={styles.eduItem}>
          <View style={styles.eduIcon}>
            <MaterialIcons name="book" size={24} color="#4895ef" />
          </View>
          <View style={styles.eduDetails}>
            <Text style={styles.eduTitle}>
              Himalayan WhiteHouse International College
            </Text>
            <Text style={styles.eduDegree}>+2 Science (PCM-B)</Text>
            <Text style={styles.eduDate}>2021 - 2023</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
