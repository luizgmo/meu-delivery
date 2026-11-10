import { Routes } from '@angular/router';

import { CustomerDetail } from './customer-detail/customer-detail';
import { CustomerForm } from './customer-form/customer-form';
import { CustomerList } from './customer-list/customer-list';
import { Home } from './home/home';
import { OrderDetail } from './order-detail/order-detail';
import { OrderList } from './order-list/order-list';
import { DishDetail } from './dish-detail/dish-detail';
import { DishForm } from './dish-form/dish-form';
import { DishList } from './dish-list/dish-list';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'pratos',
    component: DishList,
  },
  {
    path: 'pratos/novo',
    component: DishForm,
  },
  {
    path: 'pratos/:id/editar',
    component: DishForm,
  },
  {
    path: 'pratos/:id',
    component: DishDetail,
  },
  {
    path: 'clientes',
    component: CustomerList,
  },
  {
    path: 'clientes/novo',
    component: CustomerForm,
  },
  {
    path: 'clientes/:id/editar',
    component: CustomerForm,
  },
  {
    path: 'clientes/:id',
    component: CustomerDetail,
  },
  {
    path: 'pedidos',
    component: OrderList,
  },
  {
    path: 'pedidos/:id',
    component: OrderDetail,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
