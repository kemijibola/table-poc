export type Action = {
    label: string;
    onClick: (data: any | number | string) => void;
  };
  
  export type DataTableProps<C extends string> = {
    data: ({ id: number | string } & Record<C, any>)[];
    columns: C[];
    actions: Action[];
    testId: string
  };