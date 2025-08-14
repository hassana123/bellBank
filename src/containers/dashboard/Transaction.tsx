import { useState } from 'react';
import { Filter, Download, Search } from 'lucide-react';
import { format } from 'date-fns';
import type { Dayjs } from 'dayjs';
import { DatePicker as AntdDatePicker, Input as AntdInput } from 'antd';

import BannerHeader from '~/components/ui/BannerHeader';
import Table from '~/components/controls/table';
import Select from '~/components/controls/select';
import Button from '~/components/controls/button';
import Tag from '~/components/controls/tag';
import usePageFilters from '~/hooks/app/use-page-filters';
import useDebouncedSearchParamInput from '~/hooks/app/use-debounced-search-param-input';
import { formatPrice } from '~/utils';
import { classNames as cn } from '~/utils';

interface TransactionDataType {
  key: string;
  transactionId: string;
  type: 'Card' | 'USSD' | 'Bank Transfer' | 'Payout';
  amount: number;
  status: 'Successful' | 'Pending' | 'Failed';
  date: Date;
  customer: string;
}

const transactionData: TransactionDataType[] = [
  {
    key: '1',
    transactionId: 'TXN123456789',
    type: 'Card',
    amount: 5000.00,
    status: 'Successful',
    date: new Date('2025-07-28T10:30:00Z'),
    customer: 'John Doe',
  },
  {
    key: '2',
    transactionId: 'TXN987654321',
    type: 'USSD',
    amount: 1200.00,
    status: 'Pending',
    date: new Date('2025-07-27T14:15:00Z'),
    customer: 'Jane Smith',
  },
  {
    key: '3',
    transactionId: 'TXN112233445',
    type: 'Bank Transfer',
    amount: 25000.00,
    status: 'Failed',
    date: new Date('2025-07-26T09:00:00Z'),
    customer: 'Alice Johnson',
  },
  {
    key: '4',
    transactionId: 'TXN678901234',
    type: 'Payout',
    amount: 100000.00,
    status: 'Successful',
    date: new Date('2025-07-25T16:45:00Z'),
    customer: 'Bob Williams',
  },
  {
    key: '5',
    transactionId: 'TXN543210987',
    type: 'Card',
    amount: 7500.00,
    status: 'Successful',
    date: new Date('2025-07-24T11:00:00Z'),
    customer: 'Charlie Brown',
  },
];

export default function TransactionsContainer() {
  const { from, to, changeFilters, keys } = usePageFilters();
  const [currency] = useState('NGN');
  const { debouncedValue: searchTerm, value: searchInputValue, onChange: setSearchTerm } = useDebouncedSearchParamInput({ prefix: 'search' });
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  const columns: any[] = [
    {
      id: 'transactionId',
      header: 'TRANSACTION ID',
      accessorKey: 'transactionId',
      cell: ({ row }: { row: { original: TransactionDataType } }) => <span className="font-medium text-foreground">{row.original.transactionId}</span>,
    },
    {
      id: 'type',
      header: 'TYPE',
      accessorKey: 'type',
      cell: ({ row }: { row: { original: TransactionDataType } }) => <span className="text-muted-foreground">{row.original.type}</span>,
    },
    {
      id: 'amount',
      header: 'AMOUNT',
      accessorKey: 'amount',
      cell: ({ row }: { row: { original: TransactionDataType } }) => <span className="font-semibold text-foreground">{formatPrice(row.original.amount, { currency }).value}</span>,
    },
    {
      id: 'status',
      header: 'STATUS',
      accessorKey: 'status',
      cell: ({ row }: { row: { original: TransactionDataType } }) => {
        let color = 'bg-gray-200 text-gray-700';
        if (row.original.status === 'Successful') color = 'bg-green-100 text-green-700';
        if (row.original.status === 'Failed') color = 'bg-red-100 text-red-700';
        if (row.original.status === 'Pending') color = 'bg-yellow-100 text-yellow-700';
        return <Tag title={`${row.original.status}`} className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}></Tag>;
      },
    },
    {
      id: 'date',
      header: 'DATE',
      accessorKey: 'date',
      cell: ({ row }: { row: { original: TransactionDataType } }) => <span className="text-muted-foreground">{format(row.original.date, 'MMM dd, yyyy HH:mm')}</span>,
    },
    {
      id: 'customer',
      header: 'CUSTOMER',
      accessorKey: 'customer',
      cell: ({ row }: { row: { original: TransactionDataType } }) => <span className="text-muted-foreground">{row.original.customer}</span>,
    },
  ];

  const filteredData = transactionData.filter(transaction => {
    const matchesSearch = searchTerm
      ? transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesStatus = statusFilter ? transaction.status === statusFilter : true;
    const matchesType = typeFilter ? transaction.type === typeFilter : true;

    const transactionDate = new Date(transaction.date);
    const matchesDateRange = (!from || transactionDate >= (from as Dayjs).toDate()) && (!to || transactionDate <= (to as Dayjs).toDate());

    return matchesSearch && matchesStatus && matchesType && matchesDateRange;
  });

  return (
    <div className="space-y-6">
      <BannerHeader
        title="Transactions"
        breadcrumbs={[{ label: 'Overview' }, { label: 'Transactions' }]}
        description="View and manage all your payment and payout transactions."
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <AntdInput
            placeholder="Search transactions..."
            prefix={<Search className="w-4 h-4 text-muted-foreground" />}
            className="w-full md:w-64 h-10 rounded-lg border-input focus:border-primary focus:ring-2 focus:ring-primary/20 bg-card text-foreground"
            value={searchInputValue}
            onChange={setSearchTerm}
          />
          <div className='flex items-center gap-3'>
            <Select
            placeholder="Filter by Status"
            value={statusFilter}
            onChange={(value) => setStatusFilter(value as string)}
            options={[
              { label: 'Successful', value: 'Successful' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Failed', value: 'Failed' },
            ]}
            className="w-40"
          />
          <Select
            placeholder="Filter by Type"
            value={typeFilter}
            onChange={(value) => setTypeFilter(value as string)}
            options={[
              { label: 'Card', value: 'Card' },
              { label: 'USSD', value: 'USSD' },
              { label: 'Bank Transfer', value: 'Bank Transfer' },
              { label: 'Payout', value: 'Payout' },
            ]}
            className="w-40"
          />
          </div>
          <AntdDatePicker.RangePicker
            value={[from as Dayjs, to as Dayjs]}
            onChange={(dates) => {
              if (dates && dates[0] && dates[1]) {
                changeFilters(keys.from, dates[0].toISOString());
                changeFilters(keys.to, dates[1].toISOString());
              } else {
                changeFilters(keys.from, null);
                changeFilters(keys.to, null);
              }
            }}
            className="h-10 rounded-lg border-input focus:border-primary focus:ring-2 focus:ring-primary/20 bg-card text-foreground"
          />
          <Button
            type="default"
            icon={({ className }) => <Filter className={cn("w-4 h-4", className ?? "")} />}
            className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg text-sm hover:bg-muted transition-colors text-foreground"
          >
            Apply Filters
          </Button>
        </div>
        <Button
          type="primary"
          icon={({ className }) => <Download className={cn("w-4 h-4", className ?? "")} />}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Export CSV
        </Button>
      </div>

      <Table
        columns={columns}
        data={filteredData}
        paginate
        pagination={{ pageIndex: 0, pageSize: 10 }}
      />
    </div>
  );
}
