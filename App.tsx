import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import RecordScreen from './src/screens/RecordScreen'
import NotificationScreen from './src/screens/NotificationScreen'
import ChatScreen from './src/screens/ChatScreen'
import DashboardScreen from './src/screens/DashboardScreen'
import { Colors } from './src/constants/colors'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: Colors.surface,
              borderTopColor: Colors.border,
              paddingBottom: 4,
            },
            tabBarActiveTintColor: Colors.brand,
            tabBarInactiveTintColor: Colors.textMuted,
            tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          }}
        >
          <Tab.Screen
            name="기록"
            component={RecordScreen}
            options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📝</Text> }}
          />
          <Tab.Screen
            name="알림"
            component={NotificationScreen}
            options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🔔</Text> }}
          />
          <Tab.Screen
            name="채팅"
            component={ChatScreen}
            options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>💬</Text> }}
          />
          <Tab.Screen
            name="대시보드"
            component={DashboardScreen}
            options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📊</Text> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
