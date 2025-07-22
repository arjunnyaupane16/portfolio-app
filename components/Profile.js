
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
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
  const textTranslate = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const eduCardScale = useRef(new Animated.Value(0.95)).current;

  const [expandedBio, setExpandedBio] = useState(true);

  useEffect(() => {
    Animated.stagger(100, [
      Animated.parallel([
        Animated.spring(headerScale, {
          toValue: 1,
          friction: 5,
          tension: 70,
          useNativeDriver: true,
        }),
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(imageScale, {
          toValue: 1,
          friction: 6,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(contentSlide, {
          toValue: 0,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(textTranslate, {
          toValue: 0,
          friction: 8,
          tension: 30,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(eduCardScale, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.background}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.header,
            {
              transform: [{ scale: headerScale }],
              opacity: headerOpacity
            }
          ]}
        >
          <Text style={styles.headerText}></Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.profileCard,
            {
              transform: [{ scale: imageScale }],
              opacity: imageOpacity
            }
          ]}
        >
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

          <Animated.View
            style={[
              styles.content,
              {
                transform: [{ translateY: contentSlide }],
                opacity: contentOpacity
              }
            ]}
          >
            <Text style={styles.name}>Chandraprakash Nyaupane</Text>
            <Text style={styles.title}>Full-Stack Developer</Text>

            <View style={styles.divider} />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setExpandedBio(!expandedBio)}
              style={styles.bioToggle}
            >
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <MaterialIcons
                  name={expandedBio ? 'expand-less' : 'expand-more'}
                  size={24}
                  color="#ffffff"
                />
              </View>
            </TouchableOpacity>

            {expandedBio && (
              <Animated.View
                style={[
                  styles.bioBox,
                  {
                    opacity: textOpacity,
                    transform: [{ translateY: textTranslate }],
                    overflow: 'visible',  // added this line
                  }
                ]}
              >
                <Text style={styles.bio}>
                  I am a passionate and detail-oriented full-stack developer pursuing my B.Tech in Computer Science from Quantum University, Roorkee.{"\n\n"}
                  My journey into technology began with a curiosity for how things work, and it evolved into a love for building modern web and mobile apps.{"\n\n"}
                  I enjoy crafting clean, scalable code and building intuitive experiences using tools like React, Node.js, and MongoDB.
                </Text>
              </Animated.View>
            )}
          </Animated.View>
        </Animated.View>

        <Animated.View
          style={[
            styles.educationCard,
            {
              transform: [{ translateY: contentSlide }, { scale: eduCardScale }],
              opacity: contentOpacity
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Education</Text>

          <View style={styles.eduItem}>
            <Animated.View
              style={[
                styles.eduIcon,
                {
                  backgroundColor: '#2441e733',
                  opacity: contentOpacity
                }
              ]}
            >
              <MaterialIcons name="school" size={22} color="#4c80ff" />
            </Animated.View>
            <View style={styles.eduDetails}>
              <Text style={styles.eduTitle}>Quantum University, Roorkee</Text>
              <Text style={styles.eduDegree}>B.Tech in Computer Science & Engineering</Text>
              <Text style={styles.eduDate}>2023 - 2027</Text>
              <Text style={styles.eduHighlightText}>Coursework: DSA, Web Development, DBMS</Text>
            </View>
          </View>

          <View style={styles.eduItem}>
            <Animated.View
              style={[
                styles.eduIcon,
                {
                  backgroundColor: '#0cb2a733',
                  opacity: contentOpacity
                }
              ]}
            >
              <MaterialIcons name="book" size={22} color="#0cb2a7" />
            </Animated.View>
            <View style={styles.eduDetails}>
              <Text style={styles.eduTitle}>Himalayan WhiteHouse Intl. College</Text>
              <Text style={styles.eduDegree}>+2 Science (PCM-B)</Text>
              <Text style={styles.eduDate}>2021 - 2023</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
