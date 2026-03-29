import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../constants/colors'

export default function RecordScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.brandName}>Care<Text style={styles.brandGreen}>Flow</Text></Text>
        <Text style={styles.headerSub}>기록</Text>
      </View>
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>

        {/* 소음 레벨 */}
        <Text style={styles.sectionTitle}>주변 소음 및 음성 레벨 기록</Text>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>🔊 외부 환경 소음</Text>
          <Text style={styles.cardValue}>72 <Text style={styles.unit}>dB</Text></Text>
          <View style={styles.track}><View style={[styles.fill, { width: '72%', backgroundColor: Colors.body }]} /></View>
          <Text style={styles.cardSub}>보통 대화 수준</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>🎙 내 목소리 레벨</Text>
          <Text style={styles.cardValue}>68 <Text style={styles.unit}>dB</Text></Text>
          <View style={styles.track}><View style={[styles.fill, { width: '68%', backgroundColor: Colors.emotion }]} /></View>
          <Text style={styles.cardSub}>⚠️ 평소보다 6 dB 높아졌습니다</Text>
        </View>

        {/* 보행 데이터 */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>보행 및 활동 데이터 연동</Text>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>🚶 보행 안정성 — Apple 건강 데이터</Text>
          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <Text style={[styles.gridVal, { color: Colors.brand }]}>높음</Text>
              <Text style={styles.gridAxis}>현재 안정성</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={[styles.gridVal, { color: Colors.body }]}>1.12</Text>
              <Text style={styles.gridAxis}>보행속도 m/s</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={[styles.gridVal, { color: Colors.relation }]}>3%</Text>
              <Text style={styles.gridAxis}>비대칭성</Text>
            </View>
          </View>
          <Text style={styles.caption}>* 본 데이터는 Apple 건강 앱에서 제공된 수치입니다.</Text>
        </View>

        <View style={styles.btnStart}>
          <Text style={styles.btnText}>▶ 기록 시작</Text>
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
  cardLabel: { fontSize: 12, fontWeight: '700', color: Colors.brandDark, marginBottom: 6 },
  cardValue: { fontSize: 26, fontWeight: '800', color: Colors.brandDark },
  unit: { fontSize: 12, color: Colors.textMuted },
  track: { height: 7, backgroundColor: 'rgba(61,43,31,0.08)', borderRadius: 4, overflow: 'hidden', marginVertical: 8 },
  fill: { height: '100%', borderRadius: 4 },
  cardSub: { fontSize: 11, color: Colors.textMuted },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  gridItem: { alignItems: 'center', flex: 1 },
  gridVal: { fontSize: 18, fontWeight: '800' },
  gridAxis: { fontSize: 10, color: Colors.textMuted, marginTop: 2, textAlign: 'center' },
  caption: { fontSize: 10, color: Colors.textMuted, marginTop: 10, fontStyle: 'italic' },
  btnStart: { backgroundColor: Colors.brandDark, borderRadius: 14, padding: 14, alignItems: 'center', marginTop: 8 },
  btnText: { color: Colors.surface, fontSize: 14, fontWeight: '700' },
})
