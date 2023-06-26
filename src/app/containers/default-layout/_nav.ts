import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },

  // {
  //   name: 'Administración',
  //   title: true
  // },
  {
    name: 'Administración',
    url: '',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Clientes',
        url: '/customers'
      },
      {
        name: 'Departamentos',
        url: '/departments'
      },
      {
        name: 'Usuarios',
        url: '/users'
      },
      {
        name: 'Tarjetas',
        url: '/cards'
      }
    ]
  },


  {
    name: 'Presupuestos',
    url: '',
    iconComponent: { name: 'cil-chart-pie' },
    children: [
      {
        name: 'Creados',
        url: '/request/created'
      },
      {
        name: 'Solicitados',
        url: '/request/requested'
      },
      {
        name: 'Aprobados',
        url: '/request/approved'
      },
      {
        name: 'Dispersados',
        url: '/request/disperse'
      },
      {
        name: 'Finalizados',
        url: '/request/completed'
      },
      {
        name: 'Cancelados',
        url: '/request/cancelled'
      }
    ]
  },



];
