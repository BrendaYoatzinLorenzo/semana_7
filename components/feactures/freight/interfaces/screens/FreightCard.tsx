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
    margin: 20,
    padding: 16,
    height: 200,
    width: 200,
    backgroundColor: '#E0F7FA', 
    borderRadius: 8,
    justifyContent: 'space-between',
    shadowRadius:2
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

export default FreightCard;
