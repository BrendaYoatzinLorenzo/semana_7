import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Branch } from '../../domain/models/branch';
import BranchCard from './BranchCard';
import { BranchViewModel } from '../viewModels/BranchtViewModal';
import BranchModal from './BranchModel';


export function BranchView() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [branchToEdit, setBranchToEdit] = useState<Branch | undefined>(undefined);
  const branchViewModel = new BranchViewModel();

  const handleSaveBranch = async (branch: Branch) => {
    if (branchToEdit) {
      await branchViewModel.updateNewBranch(branch);
    } else {
      await branchViewModel.createNewBranch(branch);
    }
    setModalVisible(false);
    setBranchToEdit(undefined);
    const fetchedBranches = await branchViewModel.fetchAllBranches();
    setBranches(fetchedBranches);
  };

  const handleEditBranch = (branch: Branch) => {
    setBranchToEdit(branch);
    setModalVisible(true);
  };

  useEffect(() => {
    const loadBranches = async () => {
      try {
        const fetchedBranches = await branchViewModel.fetchAllBranches();
        setBranches(fetchedBranches);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    loadBranches();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Agregar Sucursal" onPress={() => setModalVisible(true)} />
      </View>

      <FlatList
        data={branches}
        renderItem={({ item }) => (
          <BranchCard
            branch={item}
            onEdit={() => handleEditBranch(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      <BranchModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveBranch}
        branchToEdit={branchToEdit}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: isLargeScreen ? 20 : 10,
    alignItems: 'center',
    shadowRadius: 2,
  },
  buttonContainer: {
    width: isLargeScreen ? '30%' : '100%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingHorizontal: isLargeScreen ? 20 : 10,
  },
});
