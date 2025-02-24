import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/utils/supabase';

export default function MedecinDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [medecin, setMedecin] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMedecinDetails() {
      try {
        // Récupérer les détails du médecin
        const { data: medecinData, error: medecinError } = await supabase
          .from('medecins')
          .select('*')
          .eq('id', id)
          .single();

        if (medecinError) throw medecinError;

        // Récupérer les patients du médecin
        const { data: patientsData, error: patientsError } = await supabase
          .from('patients')
          .select('*')
          .eq('medecin_id', id);

        if (patientsError) throw patientsError;

        setMedecin(medecinData);
        setPatients(patientsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchMedecinDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
      </View>
    );
  }

  if (!medecin) {
    return (
      <View style={styles.centered}>
        <Text>Aucun médecin trouvé</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{medecin.nom}</Text>
        <Text style={styles.subtitle}>{medecin.specialite}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations du Médecin</Text>
        <Text>Email : {medecin.email || 'Non renseigné'}</Text>
        <Text>Téléphone : {medecin.telephone || 'Non renseigné'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patients ({patients.length})</Text>
        {patients.map((patient) => (
          <View key={patient.id} style={styles.patientItem}>
            <Text>{patient.nom}</Text>
            <Text>{patient.email || 'Sans email'}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  patientItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
});