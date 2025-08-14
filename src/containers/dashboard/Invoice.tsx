import { useState } from 'react';
import { Filter, Plus, Search } from 'lucide-react';
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

interface InvoiceDataType {
  key: string;
  invoiceTitle: string;
  invoiceNumber: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Expired' | 'Draft';
  dateCreated: Date;
}

const invoiceData: InvoiceDataType[] = [
  {
    key: '1',
    invoiceTitle: 'Accept Clearance',
    invoiceNumber: '#1221',
    amount: 23996.00,
    status: 'Expired',
    dateCreated: new Date('2025-07-23T00:00:00Z'),
  },
  {
    key: '2',
    invoiceTitle: 'Software License',
    invoiceNumber: '#1222',
    amount: 150000.00,
    status: 'Paid',
    dateCreated: new Date('2025-07-20T00:00:00Z'),
  },
  {
    key: '3',
    invoiceTitle: 'Consulting Services',
    invoiceNumber: '#1223',
    amount: 75000.00,
    status: 'Pending',
    dateCreated: new Date('2025-07-25T00:00:00Z'),
  },
  {
    key: '4',
    invoiceTitle: 'Hardware Purchase',
    invoiceNumber: '#1224',
    amount: 50000.00,
    status: 'Draft',
    dateCreated: new Date('2025-07-26T00:00:00Z'),
  },
  {
    key: '5',
    invoiceTitle: 'Monthly Subscription',
    invoiceNumber: '#1225',
    amount: 10000.00,
    status: 'Paid',
    dateCreated: new Date('2025-07-18T00:00:00Z'),
  },
];

export default function InvoicesContainer() {
  const { from, to, changeFilters, keys } = usePageFilters();
  const [currency] = useState('NGN');
  const { value: searchTerm, onChange: setSearchTerm } = useDebouncedSearchParamInput({ prefix: 'search' });
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  const columns: any[] = [
    {
      id: 'invoiceTitle',
      header: 'INVOICE TITLE',
      accessorKey: 'invoiceTitle',
      cell: ({ row }: { row: { original: InvoiceDataType } }) => <span className="font-medium text-foreground">{row.original.invoiceTitle}</span>,
    },
    {
      id: 'invoiceNumber',
      header: 'INVOICE NUMBER',
      accessorKey: 'invoiceNumber',
      cell: ({ row }: { row: { original: InvoiceDataType } }) => <span className="text-muted-foreground">{row.original.invoiceNumber}</span>,
    },
    {
      id: 'amount',
      header: 'AMOUNT',
      accessorKey: 'amount',
      cell: ({ row }: { row: { original: InvoiceDataType } }) => <span className="font-semibold text-foreground">{formatPrice(row.original.amount, { currency }).value}</span>,
    },
    {
      id: 'status',
      header: 'STATUS',
      accessorKey: 'status',
      cell: ({ row }: { row: { original: InvoiceDataType } }) => {
        let color = 'bg-gray-200 text-gray-700';
        if (row.original.status === 'Paid') color = 'bg-green-100 text-green-700';
        if (row.original.status === 'Expired') color = 'bg-red-100 text-red-700';
        if (row.original.status === 'Pending') color = 'bg-yellow-100 text-yellow-700';
        if (row.original.status === 'Draft') color = 'bg-blue-100 text-blue-700';
        return <Tag title={`${row.original.status}`} className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}></Tag>;
      },
    },
    {
      id: 'dateCreated',
      header: 'DATE CREATED',
      accessorKey: 'dateCreated',
      cell: ({ row }: { row: { original: InvoiceDataType } }) => <span className="text-muted-foreground">{format(row.original.dateCreated, 'MMM dd, yyyy')}</span>,
    },
  ];

  const filteredData = invoiceData.filter(invoice => {
    const matchesSearch = searchTerm
      ? invoice.invoiceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesStatus = statusFilter ? invoice.status === statusFilter : true;

    const invoiceDate = new Date(invoice.dateCreated);
    const matchesDateRange = (!from || invoiceDate >= (from as Dayjs).toDate()) && (!to || invoiceDate <= (to as Dayjs).toDate());

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  return (
    <div className="space-y-6">
      {/* Test Mode Banner */}
      {/* <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold">🔴 Test Mode</span>
          <span>You are currently in test mode. Verify your business to activate Live Mode</span>
        </div>
        <Button type="link" className="text-red-700 hover:text-red-800">
          Start Verification &gt;
        </Button>
      </div> */}
      <BannerHeader
        title="Invoices"
        breadcrumbs={[{ label: 'Payments' }, { label: 'Invoices' }]}
        description="Manage and track all your generated invoices."
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <AntdInput
            placeholder="Search invoices..."
            prefix={<Search className="w-4 h-4 text-muted-foreground" />}
            className="w-full md:w-64 h-10 rounded-lg border-input focus:border-primary focus:ring-2 focus:ring-primary/20 bg-card text-foreground"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <Select
            placeholder="Filter by Status"
            value={statusFilter}
            onChange={(value) => setStatusFilter(value as string)}
            options={[
              { label: 'Paid', value: 'Paid' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Expired', value: 'Expired' },
              { label: 'Draft', value: 'Draft' },
            ]}
            className="w-40"
          />
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
          icon={({ className }) => <Plus className={cn("w-4 h-4", className ?? "")} />}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Create an invoice
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
