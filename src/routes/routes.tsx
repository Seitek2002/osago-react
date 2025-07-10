import type { RouteObject } from 'react-router';
import Home from '../pages/Home';
import ChooseForm from '../pages/ChooseForm';
import ServiceLayout from '../layouts/ServiceLayout';
import DocumentsForm2 from '../pages/DocumentsForm2';
// import DataForms2 from '../pages/DataForms2';
// import DataForms from '../pages/DataForms';
import Calculator2 from '../pages/Calculator2';
import Calculator from '../pages/Calculator';
import DocumentsForm from '../pages/DocumentsForm';
import { lazy } from 'react';

const DataForms2 = lazy(() => import('../pages/DataForms2'));
const DataForms = lazy(() => import('../pages/DataForms'));

export const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/choose-form',
    element: (
      <ServiceLayout>
        <ChooseForm />
      </ServiceLayout>
    ),
  },
  {
    path: '/I/:id',
    element: (
      <ServiceLayout>
        <ChooseForm />
      </ServiceLayout>
    ),
  },
  {
    path: '/documents-form',
    element: (
      <ServiceLayout>
        <DocumentsForm />
      </ServiceLayout>
    ),
  },
  {
    path: '/documents-form-2',
    element: (
      <ServiceLayout>
        <DocumentsForm2 />
      </ServiceLayout>
    ),
  },
  {
    path: '/documents-form-2/:id',
    element: (
      <ServiceLayout>
        <DocumentsForm2 />
      </ServiceLayout>
    ),
  },
  {
    path: '/data-forms',
    element: (
      <ServiceLayout>
        <DataForms />
      </ServiceLayout>
    ),
  },
  {
    path: '/data-forms-2',
    element: (
      <ServiceLayout>
        <DataForms2 />
      </ServiceLayout>
    ),
  },
  {
    path: '/calculator',
    element: (
      <ServiceLayout>
        <Calculator />
      </ServiceLayout>
    ),
  },
  {
    path: '/calculator-2',
    element: (
      <ServiceLayout>
        <Calculator2 />
      </ServiceLayout>
    ),
  },
  {
    path: '/data-forms-2/:id',
    element: (
      <ServiceLayout>
        <DataForms2 />
      </ServiceLayout>
    ),
  },
];
