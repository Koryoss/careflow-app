import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Colors } from '../constants/colors'

type Message = { role: 'user' | 'ai'; text: string }

const AXIS_TAGS: Record<string, { color: string; bg: string }> = {
  몸:  { color: '#B8601C', bg: 'rgba(245,168,124,0.2)' },
  감정: { color: '#B84070', bg: 'rgba(238,159,184,0.2)' },
  관계: { color: '#7060A8', bg: 'rgba(184,168,212,0.2)' },
  의미: { color: '#A07820', bg: 'rgba(232,200,110,0.2)' },
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: '안녕하세요 😊 오늘 하루는 어떠셨나요? 편하게 이야기해 주세요.' },
  ])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    const userMsg: Message = { role: 'user', text: input.trim() }
    const aiMsg: Message = { role: 'ai', text: '기록되었습니다 ✅' }
    setMessages(prev => [...prev, userMsg, aiMsg])
    setInput('')
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.brandName}>Care<Text style={styles.brandGreen}>Flow</Text></Text>
        <Text style={styles.headerSub}>대화형 일기장</Text>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          {messages.map((m, i) => (
            <View key={i} style={[styles.bubble, m.role === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={[styles.bubbleText, m.role === 'user' ? styles.userText : styles.aiText]}>{m.text}</Text>
            </View>
          ))}

          {/* 4축 태그 예시 */}
          <View style={styles.tagsRow}>
            {Object.entries(AXIS_TAGS).map(([label, style]) => (
              <View key={label} style={[styles.tag, { backgroundColor: style.bg }]}>
                <Text style={[styles.tagText, { color: style.color }]}>{label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="오늘 하루를 이야기해 주세요..."
            placeholderTextColor={Colors.textMuted}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={send}>
            <Text style={styles.sendText}>전송</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  bodyContent: { padding: 16, paddingBottom: 16 },
  bubble: { maxWidth: '80%', borderRadius: 16, padding: 12, marginBottom: 8 },
  userBubble: { backgroundColor: Colors.brandDark, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  aiBubble: { backgroundColor: Colors.surface, alignSelf: 'flex-start', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: Colors.border },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  userText: { color: Colors.surface },
  aiText: { color: Colors.brandDark },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99 },
  tagText: { fontSize: 12, fontWeight: '700' },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', padding: 12, borderTopWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface, gap: 8 },
  input: { flex: 1, backgroundColor: Colors.brandLight, borderRadius: 12, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: Colors.brandDark, maxHeight: 100 },
  sendBtn: { backgroundColor: Colors.brandDark, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 },
  sendText: { color: Colors.surface, fontSize: 14, fontWeight: '700' },
})
