import React from 'react';
import { Title } from '../../shared/ui/Title/Title';
import { OrdenPedidoWidget } from '../../widgets/orden-pedido/OrdenPedidoWidget/ui/OrdenPedidoWidget';
import styles from './OrdenPedidoPage.module.css';

export const OrdenPedidoPage = () => {
  return (
    <div className={styles.container}>
      <Title>Orden de pedido</Title>
      <div className={styles.content}>
        <OrdenPedidoWidget />
      </div>
    </div>
  );
}; 