import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export function MedecinDetail() {
  const { id } = useLocalSearchParams();
  
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Détails du médecin ID: {id}</Text>
    </View>
  );
}

export default MedecinDetail;
