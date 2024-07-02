import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 

const SkeletonCardLoader = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <View style={styles.cardWrapper}>
      {[...Array(4)].map((_, index) => (
      <View key={index} style={styles.card}>
        <View style={styles.header}>
            <View style={styles.avatar}/>
            <View>
                <View style={styles.title} />
                <View style={styles.subtitle} />
            </View>
        </View>
        <View style={{ marginTop: 10}}> 
          <View style={styles.name}/>
          <View style={styles.description}/>
        </View>
        <View style={styles.image} />
        <View style={styles.actions} />
        <Animated.View
          style={[
            styles.gradientWrapper,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <LinearGradient
            colors={[
              'rgba(255,255,255,0)',
              'rgba(255,255,255,0.5)',
              'rgba(255,255,255,0.6)',
              'rgba(255,255,255,0)',
              'rgba(255,255,255,0.5)',
            ]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
        </Animated.View>
      </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginVertical: 10,
    // width: '95%',
    // alignItems: 'center',
  },
  card: {
    height: 380,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    padding: 10,
    marginBottom: 10,
    width: '95%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    height: 60,
    backgroundColor: '#c0c0c0',
    width: 60,
    margin: 10,
    borderRadius: 50,
  },
  title: {
    height: 20,
    backgroundColor: '#c0c0c0',
    width: 160,
    borderRadius: 5,
    marginBottom: 5,
  },
  subtitle: {
    height: 15,
    width: 200,
    backgroundColor: '#c0c0c0',
    marginBottom: 5,
    borderRadius: 5,
  },
  name: {
    height: 25,
    backgroundColor: '#c0c0c0',
    width: 100,
    margin: 5,
    borderRadius: 5,
  },
  description: {
    height: 20,
    backgroundColor: '#c0c0c0',
    width: 160,
    margin: 5,
    borderRadius: 5,
  },
  image: {
    height: 150,
    backgroundColor: '#c0c0c0',
    margin: 5,
    borderRadius: 5,
  },
  actions: {
    height: 30,
    width: 60,
    marginLeft: 285,
    backgroundColor: '#c0c0c0',
    margin: 5,
    borderRadius: 15,
  },
  gradientWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    flex: 1,
    width: '200%',
  },
});

export default SkeletonCardLoader;
