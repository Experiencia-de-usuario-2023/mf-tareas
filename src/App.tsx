import React from 'react';
import DynamicTable from '@atlaskit/dynamic-table';
import { head, rows } from './datosTabla/sample-data';

export default function TableUncontrolled() {
  return (
    <DynamicTable
      head={head}
      rows={rows}
      rowsPerPage={10}
      defaultPage={1}
      loadingSpinnerSize="large"
      isRankable
    />
  );
}
