import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "expo-router";
import supabase from "@/utils/supabase";

interface Medecin {
  id: number;
  nom: string;
  specialite: string;
  email: string;
  telephone: string;
  adresse: string;
}

export function MedecinsList() {
  const [medecins, setMedecins] = useState<Medecin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMedecins();
  }, []);

  const fetchMedecins = async () => {
    try {
      const { data, error } = await supabase
        .from('medecins')
        .select('*')
        .order('nom', { ascending: true });

      if (error) {
        throw error;
      }

      setMedecins(data || []);
    } catch (err) {
      setError('Erreur lors du chargement des médecins');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Liste des Médecins</h2>
        <Link href="/medecins/add" asChild>
          <Button>Ajouter un médecin</Button>
        </Link>
      </div>

      <Table>
        <TableCaption>Liste des médecins enregistrés</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Spécialité</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medecins.map((medecin) => (
            <TableRow key={medecin.id}>
              <TableCell>{medecin.nom}</TableCell>
              <TableCell>{medecin.specialite}</TableCell>
              <TableCell>{medecin.email}</TableCell>
              <TableCell>{medecin.telephone}</TableCell>
              <TableCell>
                <Link href={`/medecins/${medecin.id}`} asChild>
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}