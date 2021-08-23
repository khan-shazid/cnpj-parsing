import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import dayjs from 'dayjs';

export const CNPJDetailsComponent = ({data}) => {
  return (
    <View style={{padding: 10, backgroundColor: '#ddd'}}>
      <Content title={'Status'} value={data.situacao} status={true} />
      <Content title={'Phone Number'} value={data.telefone} />
      <Content title={'Number of Activities'} value={data.atividade_principal.length} />
      <Content title={'Initiial Income'} value={`${data.capital_social}BRL`} />
      <Content title={'Company Name'} value={data.fantasia} />
      <Content title={'Company Legal Name'} value={data.nome} />
      <Content title={'Date of last update'} value={dayjs(data.ultima_atualizacao).format('HH:mm DD MMM, YY')} />
    </View>
  )
}

const Content = ({title, value, status}) => {
  let flag = value === 'ATIVA' ? true : false;
  return (
    <View style={s.contentContainer}>
      <Text style={s.contentTitle}>{title}</Text>
      {
        status ?
        <View style={{...s.statusContainer, backgroundColor: flag ? 'green' : '#DC143C'}}>
          <Text style={{...s.contentValue, color: 'white' }}>{value}</Text>
        </View>
        :
        <Text style={s.contentValue}>{value ? value : 'N/A'}</Text>
      }
    </View>
  )
}

const s = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 4,
    borderColor: '#4630EB',
    borderWidth: 1
  },
  contentTitle: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4630EB'
  },
  contentValue: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    color: '#4630EB'
  },
  statusContainer: {
    flex: 1,
    borderRadius: 4,
    margin: 2,
    fontWeight: 'bold'
  }
});
