import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

const themes = [
  {
    background: '#0b1320',
    card: '#111827',
    border: '#3b82f6',
    text: '#e2e8f0',
    number: '#93c5fd',
    marker: '#60a5fa',
    hand: '#f8fafc',
    second: '#f97316',
    glow: '#2563eb',
    button: '#2563eb',
  },
  {
    background: '#090909',
    card: '#161616',
    border: '#10b981',
    text: '#f8fafc',
    number: '#6ee7b7',
    marker: '#34d399',
    hand: '#f8fafc',
    second: '#f43f5e',
    glow: '#14b8a6',
    button: '#14b8a6',
  },
  {
    background: '#131313',
    card: '#1f2937',
    border: '#f59e0b',
    text: '#f8fafc',
    number: '#fde68a',
    marker: '#fbbf24',
    hand: '#f8fafc',
    second: '#fb7185',
    glow: '#f59e0b',
    button: '#f59e0b',
  },
];

const clockNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = themes[themeIndex];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5;

  const clockRadius = 140;
  const hourLength = 90;
  const minuteLength = 130;
  const secondLength = 140;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.glow }]}> 
        <View style={[styles.clockFace, { borderColor: theme.border }]}> 
          {clockNumbers.map((value, index) => {
            const angle = ((value % 12) * 30 - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * (clockRadius - 40);
            const y = Math.sin(angle) * (clockRadius - 40);
            return (
              <Text
                key={value}
                style={[
                  styles.hourNumber,
                  {
                    color: theme.number,
                    top: clockRadius + y - 12,
                    left: clockRadius + x - 10,
                  },
                ]}>
                {value}
              </Text>
            );
          })}

          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180);
            const x = Math.sin(angle) * (clockRadius - 20);
            const y = -Math.cos(angle) * (clockRadius - 20);
            return (
              <View
                key={`hour-${i}`}
                style={[
                  styles.hourMarker,
                  {
                    backgroundColor: theme.marker,
                    top: clockRadius,
                    left: clockRadius,
                    transform: [
                      { translateX: x },
                      { translateY: y },
                    ],
                  },
                ]}
              />
            );
          })}

          <View
            style={[
              styles.hand,
              styles.hourHand,
              {
                top: clockRadius - hourLength,
                backgroundColor: theme.hand,
                transform: [
                  { translateY: hourLength / 2 },
                  { rotate: `${hourAngle}deg` },
                  { translateY: -hourLength / 2 },
                ],
              },
            ]}
          />

          <View
            style={[
              styles.hand,
              styles.minuteHand,
              {
                top: clockRadius - minuteLength,
                backgroundColor: theme.hand,
                transform: [
                  { translateY: minuteLength / 2 },
                  { rotate: `${minuteAngle}deg` },
                  { translateY: -minuteLength / 2 },
                ],
              },
            ]}
          />

          <View
            style={[
              styles.hand,
              styles.secondHand,
              {
                top: clockRadius - secondLength,
                backgroundColor: theme.second,
                transform: [
                  { translateY: secondLength / 2 },
                  { rotate: `${secondAngle}deg` },
                  { translateY: -secondLength / 2 },
                ],
              },
            ]}
          />

          <View style={[styles.centerDot, { backgroundColor: theme.hand }]} />
        </View>

        <Text style={[styles.timeLabel, { color: theme.text }]}> {time.toLocaleTimeString()} </Text>
        <Text style={[styles.dateLabel, { color: theme.text }]}>{formatDate(time)}</Text>

        <Pressable
          style={[styles.button, { backgroundColor: theme.button }]}
          onPress={() => setThemeIndex((themeIndex + 1) % themes.length)}>
          <Text style={styles.buttonText}>تغيير الألوان</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    maxWidth: 360,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderRadius: 32,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 20,
  },
  clockFace: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  hourNumber: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: '700',
  },
  hourMarker: {
    position: 'absolute',
    width: 4,
    height: 14,
    borderRadius: 2,
  },
  hand: {
    position: 'absolute',
    left: 140,
    borderRadius: 3,
  },
  hourHand: {
    width: 6,
    height: 90,
    marginLeft: -3,
  },
  minuteHand: {
    width: 4,
    height: 130,
    marginLeft: -2,
  },
  secondHand: {
    width: 2,
    height: 140,
    marginLeft: -1,
  },
  centerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 130,
    left: 130,
  },
  timeLabel: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: '700',
  },
  dateLabel: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 999,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
