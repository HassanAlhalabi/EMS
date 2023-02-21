import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useRowSelect } from '@table-library/react-table-library/select';


const key = 'Select';

const nodes = [
    {
      id: '0',
      name: 'Shopping List',
      deadline: new Date(2020, 1, 15),
      type: 'TASK',
      isComplete: true,
      nodes: 3,
    },
  ];
  
  const COLUMNS = [
    { label: 'Task', renderCell: (item) => item.name },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    { label: 'Type', renderCell: (item) => item.type },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
    },
    { label: 'Tasks', renderCell: (item) => item.nodes },
  ];

const RSTable = () => {

  const data = { nodes }

//   const select = useRowSelect(data, {
//     onChange: onSelectChange,
//   });

//   function onSelectChange(action, state) {
//     console.log(action, state);
//   }

//   const COLUMNS = [
//     { label: 'Task', renderCell: (item) => item.name, select: true },
//     {
//       label: 'Date', renderCell: (item) => item.date, select: true
//     }
//   ];

  return  <CompactTable columns={COLUMNS} data={data} />;
};

export default RSTable