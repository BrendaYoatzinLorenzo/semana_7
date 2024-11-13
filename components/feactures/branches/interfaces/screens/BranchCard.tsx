import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Branch } from '../../domain/models/branch';

// Propiedades del componente BranchCard (SucursalCard)
export interface BranchCardProps {
  branch: Branch;
  onEdit: () => void; 
}

export const BranchCard: React.FC<BranchCardProps> = ({ branch, onEdit }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{branch.name}</Text>  
    <Text style={styles.text}>{branch.adress}</Text> 
    <Button title="Edit" onPress={onEdit} />  
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 20,
    padding: 16,
    height: 150,
    width: 200,
    backgroundColor: '#E0F7FA',  
    borderRadius: 8,            
    justifyContent: 'space-between',
    shadowRadius: 2,            
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default BranchCard;
