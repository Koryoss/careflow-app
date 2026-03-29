import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/colors'

const axes = [
  { label: '몸',  score: 7,  max: 10, color: Colors.body },
  { label: '감정', score: 9,  max: 10, color: Colors.emotion },
  { label: '관계', score: 2,  max: 10, color: Colors.relation },
  { label: '의미', score: 4,  max: 10, color: Colors.meaning },
]

const weekDays = [
  { day: '월', date: 13, done: true },
  { day: '화', date: 14, done: false },
  { day: '수', date: 15, done: true },
  { day: '목', date: 16, done: true },
  { day: '금', date: 17, done: true },
  { day: '토', date: 18, done: false },
  { day: '일', date: 19, done: true, today: true },
]

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.brandName}>Care<Text style={styles.brandGreen}>Flow</Text></Text>
        <Text style={styles.headerSub}>오늘의 기록</Text>
      </View>
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>

        {/* 오늘 기록한 축 */}
        <Text style={styles.sectionTitle}>오늘 기록한 영역</Text>
        <View style={styles.card}>
          <View style={styles.tagsRow}>
            {[
              { label: '몸',  color: '#B8601C', bg: 'rgba(245,168,124,0.2)' },
              { label: '감정', color: '#B84070', bg: 'rgba(238,159,184,0.2)' },
              { label: '관계', color: '#7060A8', bg: 'rgba(184,168,212,0.2)' },
              { label: '의미', color: '#A07820', bg: 'rgba(232,200,110,0.2)' },
            ].map(t => (
              <View key={t.label} style={[styles.tag, { backgroundColor: t.bg }]}>
                <Text style={[styles.tagText, { color: t.color }]}>{t.label}</Text>
              </View>
            ))}
          </View>

          {/* 4축 바 */}
          {axes.map(a => (
            <View key={a.label} style={styles.axisRow}>
              <Text style={styles.axisName}>{a.label}</Text>
              <View style={styles.axisTrack}>
                <View style={[styles.axisFill, { width: `${a.score * 10}%`, backgroundColor: a.color }]} />
              </View>
              <Text style={styles.axisVal}>{a.score}</Text>
            </View>
          ))}

          <View style={styles.doneBadge}>
            <Text style={styles.doneBadgeText}>✅ 기록 완료</Text>
          </View>
        </View>

        {/* 주간 스트립 */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>이번 주 기록</Text>
        <View style={styles.weekRow}>
          {weekDays.map(d => (
            <View key={d.date} style={[styles.dayCell, d.today && styles.todayCell, d.done && !d.today && styles.doneCell]}>
              <Text style={[styles.dayLabel, d.today && styles.todayLabel]}>{d.day}</Text>
              <Text style={[styles.dateLabel, d.today && styles.todayLabel]}>{d.date}</Text>
              {d.done && <View style={[styles.dot, { backgroundColor: d.today ? Colors.white : Colors.brand }]} />}
            </View>
          ))}
        </View>

        {/* 통계 */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>5일</Text>
            <Text style={styles.statLabel}>기록한 날</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: Colors.brand }]}>3일</Text>
            <Text style={styles.statLabel}>🔥 연속 기록</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>감정</Text>
            <Text style={styles.statLabel}>주요 축</Text>
          </View>
        </View>

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
  card: { backgroundColor: Colors.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.border, marginBottom: 10 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99 },
  tagText: { fontSize: 12, fontWeight: '700' },
  axisRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  axisName: { fontSize: 11, color: Colors.textMuted, fontWeight: '700', width: 24 },
  axisTrack: { flex: 1, height: 5, backgroundColor: 'rgba(61,43,31,0.08)', borderRadius: 3, overflow: 'hidden' },
  axisFill: { height: '100%', borderRadius: 3 },
  axisVal: { fontSize: 11, color: Colors.brandDark, fontWeight: '700', width: 16, textAlign: 'right' },
  doneBadge: { alignSelf: 'flex-start', marginTop: 12, backgroundColor: 'rgba(91,168,138,0.15)', borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4 },
  doneBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.brand },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.surface, borderRadius: 14, padding: 10, borderWidth: 1, borderColor: Colors.border },
  dayCell: { alignItems: 'center', flex: 1, paddingVertical: 6, borderRadius: 8 },
  doneCell: { backgroundColor: 'rgba(91,168,138,0.12)' },
  todayCell: { backgroundColor: Colors.brand },
  dayLabel: { fontSize: 10, color: Colors.textMuted, fontWeight: '600' },
  dateLabel: { fontSize: 14, fontWeight: '800', color: Colors.brandDark, marginVertical: 2 },
  todayLabel: { color: Colors.white },
  dot: { width: 5, height: 5, borderRadius: 3 },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  statCard: { flex: 1, backgroundColor: Colors.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.border, alignItems: 'center' },
  statVal: { fontSize: 20, fontWeight: '800', color: Colors.brandDark },
  statLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 4 },
})
