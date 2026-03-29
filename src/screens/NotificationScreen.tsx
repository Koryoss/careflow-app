import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Colors } from '../constants/colors'

export default function NotificationScreen() {
  const [morning, setMorning] = useState(true)
  const [noon, setNoon] = useState(false)
  const [evening, setEvening] = useState(true)
  const [wakeUp, setWakeUp] = useState(true)
  const [bedtime, setBedtime] = useState(true)

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.brandName}>Care<Text style={styles.brandGreen}>Flow</Text></Text>
        <Text style={styles.headerSub}>알림</Text>
      </View>
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>

        <Text style={styles.sectionTitle}>💊 복약 알림 설정</Text>
        {[
          { label: '아침', time: '06:00 – 09:00', state: morning, set: setMorning },
          { label: '점심', time: '11:00 – 13:00', state: noon,   set: setNoon },
          { label: '저녁', time: '18:00 – 20:00', state: evening, set: setEvening },
        ].map((item) => (
          <View key={item.label} style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleLabel}>{item.label}</Text>
              <Text style={styles.toggleTime}>{item.time}</Text>
            </View>
            <Switch
              value={item.state}
              onValueChange={item.set}
              trackColor={{ true: Colors.brand }}
              thumbColor={Colors.white}
            />
          </View>
        ))}

        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerText}>⏰ 미복약 시 1시간 후 재알림</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>⌚ 수면 연동</Text>
        {[
          { label: '기상 직후', desc: '수면 종료 감지 → 일기 시작 유도', state: wakeUp, set: setWakeUp },
          { label: '취침 전',  desc: '수면 30분 전 → 4축 기록 점검',    state: bedtime, set: setBedtime },
        ].map((item) => (
          <View key={item.label} style={styles.toggleRow}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={styles.toggleLabel}>{item.label}</Text>
              <Text style={styles.toggleTime}>{item.desc}</Text>
            </View>
            <Switch
              value={item.state}
              onValueChange={item.set}
              trackColor={{ true: Colors.brand }}
              thumbColor={Colors.white}
            />
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.brandLight },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingTop: 8, borderBottomWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface },
  brandName: { fontSize: 18, fontWeight: '800', color: Colors.brandDark },
  brandGreen: { color: Colors.brand },
  headerSub: { fontSize: 13, color: Colors.textMuted, fontWeight: '600' },
  body: { flex: 1 },
  bodyContent: { padding: 16, paddingBottom: 32 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.border, marginBottom: 8 },
  toggleLabel: { fontSize: 14, fontWeight: '700', color: Colors.brandDark },
  toggleTime: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  infoBanner: { backgroundColor: 'rgba(91,168,138,0.12)', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: 'rgba(91,168,138,0.3)', marginTop: 4 },
  infoBannerText: { fontSize: 13, color: Colors.brand, fontWeight: '600', textAlign: 'center' },
})
