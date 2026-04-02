import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/colors'

const axes = [
  {
    label: '몸',
    sub: '신체 증상 · 에너지',
    color: Colors.body,
    textColor: '#B8601C',
    bgColor: 'rgba(245,168,124,0.12)',
    items: [
      { text: '이명이 있었나요?', checked: true },
      { text: '어지러움이 있었나요?', checked: true },
      { text: '피로감을 느꼈나요?', checked: true },
      { text: '두통이 있었나요?', checked: false },
    ],
    max: 4,
  },
  {
    label: '감정',
    sub: '불안 · 긴장 · 감정 기복',
    color: Colors.emotion,
    textColor: '#B84070',
    bgColor: 'rgba(238,159,184,0.12)',
    items: [
      { text: '불안감을 느꼈나요?', checked: true },
      { text: '예민하거나 짜증이 났나요?', checked: true },
      { text: '두려움이 있었나요?', checked: true },
      { text: '기분 변화가 심했나요?', checked: true },
    ],
    max: 4,
  },
  {
    label: '관계',
    sub: '연결 · 고립 · 사회 참여',
    color: Colors.relation,
    textColor: '#7060A8',
    bgColor: 'rgba(184,168,212,0.12)',
    items: [
      { text: '사람들과 함께했나요?', checked: false },
      { text: '고립감을 느꼈나요?', checked: true },
      { text: '소통이 힘들었나요?', checked: false },
    ],
    max: 3,
  },
  {
    label: '의미',
    sub: '방향 · 성취 · 삶의 질',
    color: Colors.meaning,
    textColor: '#A07820',
    bgColor: 'rgba(232,200,110,0.12)',
    items: [
      { text: '성취감을 느꼈나요?', checked: true },
      { text: '하루가 의미 있었나요?', checked: false },
      { text: '계획한 일을 했나요?', checked: true },
    ],
    max: 3,
  },
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
  const totalChecked = axes.reduce((sum, a) => sum + a.items.filter(i => i.checked).length, 0)
  const totalMax = axes.reduce((sum, a) => sum + a.max, 0)

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.brandName}>Care<Text style={styles.brandGreen}>Flow</Text></Text>
        <Text style={styles.headerSub}>오늘의 기록</Text>
      </View>
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>

        {/* 오늘 기록 요약 */}
        <View style={styles.totalBadgeRow}>
          <Text style={styles.totalText}>오늘 <Text style={styles.totalNum}>{totalChecked}</Text>개 항목 기록</Text>
          <Text style={styles.totalSub}>(최대 {totalMax}개)</Text>
        </View>

        {/* 4축 체크리스트 */}
        <Text style={styles.sectionTitle}>오늘 기록한 영역</Text>
        {axes.map(a => {
          const checked = a.items.filter(i => i.checked).length
          return (
            <View key={a.label} style={[styles.axisCard, { borderLeftColor: a.color }]}>
              <View style={styles.axisCardHeader}>
                <View style={styles.axisCardTitleRow}>
                  <Text style={[styles.axisCardLabel, { color: a.textColor }]}>{a.label}</Text>
                  <Text style={styles.axisCardSub}>{a.sub}</Text>
                </View>
                <View style={[styles.axisScore, { backgroundColor: a.bgColor }]}>
                  <Text style={[styles.axisScoreText, { color: a.textColor }]}>{checked}/{a.max}</Text>
                </View>
              </View>
              {a.items.map((item, idx) => (
                <View key={idx} style={styles.checkRow}>
                  <Text style={[styles.checkIcon, { color: item.checked ? a.color : '#D4C4A8' }]}>
                    {item.checked ? '✓' : '○'}
                  </Text>
                  <Text style={[styles.checkText, !item.checked && styles.checkTextUnchecked]}>
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>
          )
        })}

        {/* 완료 배지 */}
        <View style={styles.doneBadge}>
          <Text style={styles.doneBadgeText}>✅ 기록 완료</Text>
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

  totalBadgeRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginBottom: 16 },
  totalText: { fontSize: 15, fontWeight: '700', color: Colors.brandDark },
  totalNum: { fontSize: 22, fontWeight: '800', color: Colors.brand },
  totalSub: { fontSize: 12, color: Colors.textMuted },

  sectionTitle: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 },

  axisCard: { backgroundColor: Colors.surface, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: Colors.border, borderLeftWidth: 3, marginBottom: 8 },
  axisCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  axisCardTitleRow: { flex: 1 },
  axisCardLabel: { fontSize: 13, fontWeight: '800' },
  axisCardSub: { fontSize: 10, color: Colors.textMuted, marginTop: 1 },
  axisScore: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 99 },
  axisScoreText: { fontSize: 12, fontWeight: '700' },

  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 },
  checkIcon: { fontSize: 13, fontWeight: '700', width: 16 },
  checkText: { fontSize: 12, color: Colors.brandDark },
  checkTextUnchecked: { color: Colors.textMuted },

  doneBadge: { alignSelf: 'flex-start', marginTop: 4, marginBottom: 4, backgroundColor: 'rgba(91,168,138,0.15)', borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4 },
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
