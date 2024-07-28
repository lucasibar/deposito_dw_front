
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
});

const PalletPDF = ({ pallet }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Pallet ID: {pallet.id}</Text>
        <Text style={styles.text}>Item: {pallet.itemDescription}</Text>
        <Text style={styles.text}>Kilos: {pallet.kilos}</Text>
        <Text style={styles.text}>Unidades: {pallet.unidades}</Text>
        <Text style={styles.text}>Número de Partida: {pallet.numeroPartida}</Text>
        <Text style={styles.text}>Número de Pallet: {pallet.numeroPallet}</Text>
      </View>
    </Page>
  </Document>
);

export default PalletPDF;