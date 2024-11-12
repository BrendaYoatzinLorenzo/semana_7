import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Freight } from '../../domain/models/freight';


export interface FreightCardProps {
  freight: Freight; 
  onEdit: () => void; 
}

export const FreightCard: React.FC<FreightCardProps> = ({ freight, onEdit }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{freight.city}</Text>
    <Text style={styles.text}>Price: {freight.price}</Text>
    <Button title="Editar" onPress={onEdit} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    height: 150,
    backgroundColor: '#E0F7FA', 
    borderRadius: 8,
    elevation: 2,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default FreightCard;
