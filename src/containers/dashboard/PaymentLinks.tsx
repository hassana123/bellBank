import { useState } from 'react';
import { Filter, Plus, Eye, Copy, Share2, Search } from 'lucide-react';
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

interface PaymentLinkDataType {
  key: string;
  pageName: string;
  amount: number;
  linkType: 'Single' | 'Recurring';
  paymentLink: string;
  status: 'Active' | 'Inactive' | 'Expired';
  lastUpdated: Date;
}

const paymentLinkData: PaymentLinkDataType[] = [
  {
    key: '1',
    pageName: 'Drinks',
    amount: 100.00,
    linkType: 'Single',
    paymentLink: 'https://bellcollect.com/pay/drinks',
    status: 'Active',
    lastUpdated: new Date('2025-07-23T12:59:00Z'),
  },
  {
    key: '2',
    pageName: 'Monthly Subscription',
    amount: 5000.00,
    linkType: 'Recurring',
    paymentLink: 'https://bellcollect.com/pay/sub',
    status: 'Active',
    lastUpdated: new Date('2025-07-20T10:00:00Z'),
  },
  {
    key: '3',
    pageName: 'Donation Campaign',
    amount: 0, // Variable amount
    linkType: 'Single',
    paymentLink: 'https://bellcollect.com/pay/donate',
    status: 'Inactive',
    lastUpdated: new Date('2025-07-18T15:30:00Z'),
  },
  {
    key: '4',
    pageName: 'Product X Pre-order',
    amount: 15000.00,
    linkType: 'Single',
    paymentLink: 'https://bellcollect.com/pay/productx',
    status: 'Active',
    lastUpdated: new Date('2025-07-22T09:00:00Z'),
  },
];

export default function PaymentLinksContainer() {
  const { from, to, changeFilters, keys } = usePageFilters();
  const [currency] = useState('NGN');
  const { value: searchTerm, onChange: setSearchTerm } = useDebouncedSearchParamInput({ prefix: 'search' });
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [linkTypeFilter, setLinkTypeFilter] = useState<string | undefined>(undefined);

  const columns: any[] = [
    {
      id: 'pageName',
      header: 'PAGE NAME',
      accessorKey: 'pageName',
      cell: ({ row }: { row: { original: PaymentLinkDataType } }) => <span className="font-medium text-foreground">{row.original.pageName}</span>,
    },
    {
      id: 'amount',
      header: 'AMOUNT',
      accessorKey: 'amount',
      cell: ({ row }: { row: { original: PaymentLinkDataType } }) => (
        <span className="font-semibold text-foreground">
          {row.original.amount === 0 ? 'Variable' : formatPrice(row.original.amount, { currency }).value}
        </span>
      ),
    },
    {
      id: 'linkType',
      header: 'LINK TYPE',
      accessorKey: 'linkType',
      cell: ({ row }: { row: { original: PaymentLinkDataType } }) => <span className="text-muted-foreground">{row.original.linkType}</span>,
    },
    {
      id: 'paymentLink',
      header: 'PAYMENT LINK',
      accessorKey: 'paymentLink',
      cell: ({ row }: { row: { original: PaymentLinkDataType } }) => (
        <div className="flex items-center gap-2">
          <a href={row.original.paymentLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
            Preview Link <Eye className="w-3 h-3" />
          </a>
          <Button
            type="text"
            size="small"
            icon={({ className }) => <Copy className={cn("w-3 h-3 text-muted-foreground hover:text-foreground", className ?? "")} />}
            onClick={() => navigator.clipboard.writeText(row.original.paymentLink)}
            className="p-0 h-auto"
          />
          <Button
            type="text"
            size="small"
            icon={({ className }) => <Share2 className={cn("w-3 h-3 text-muted-foreground hover:text-foreground", className ?? "")} />}
            onClick={() => alert(`Share ${row.original.paymentLink}`)} // Replace with actual share logic
            className="p-0 h-auto"
          />
        </div>
      ),
    },
    {
      id: 'status',
      header: 'STATUS',
      accessorKey: 'status',
      cell: ({ row }: { row: { original: PaymentLinkDataType } }) => {
        let color = 'bg-gray-200 text-gray-700';
        if (row.original.status === 'Active') color = 'bg-green-100 text-green-700';
        if (row.original.status === 'Inactive') color = 'bg-red-100 text-red-700';
        if (row.original.status === 'Expired') color = 'bg-yellow-100 text-yellow-700';
        return <Tag title={`${row.original.status}`} className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}></Tag>;
      },
    },
    {
      id: 'lastUpdated',
      header: 'LAST UPDATED',
      accessorKey: 'lastUpdated',
      cell: ({ row }: { row: { original: PaymentLinkDataType } }) => <span className="text-muted-foreground">{format(row.original.lastUpdated, 'MMM dd, yyyy HH:mm a')}</span>,
    },
  ];

  const filteredData = paymentLinkData.filter(link => {
    const matchesSearch = searchTerm
      ? link.pageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.paymentLink.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesStatus = statusFilter ? link.status === statusFilter : true;
    const matchesLinkType = linkTypeFilter ? link.linkType === linkTypeFilter : true;

    const linkDate = new Date(link.lastUpdated);
    const matchesDateRange = (!from || linkDate >= (from as Dayjs).toDate()) && (!to || linkDate <= (to as Dayjs).toDate());

    return matchesSearch && matchesStatus && matchesLinkType && matchesDateRange;
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
        title="Payment Links"
        breadcrumbs={[{ label: 'Payments' }, { label: 'Payment Links' }]}
        description="Create and manage custom payment links for your customers."
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">
          <AntdInput
            placeholder="Search links..."
            prefix={<Search className="w-4 h-4 text-muted-foreground" />}
            className="w-full md:w-64 h-10 rounded-lg border-input focus:border-primary focus:ring-2 focus:ring-primary/20 bg-card text-foreground"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <div className='flex itmes-center gap-3'>
            <Select
            placeholder="Filter by Status"
            value={statusFilter}
            onChange={(value) => setStatusFilter(value as string)}
            options={[
              { label: 'Active', value: 'Active' },
              { label: 'Inactive', value: 'Inactive' },
              { label: 'Expired', value: 'Expired' },
            ]}
            className="w-40"
          />
          <Select
            placeholder="Filter by Type"
            value={linkTypeFilter}
            onChange={(value) => setLinkTypeFilter(value as string)}
            options={[
              { label: 'Single', value: 'Single' },
              { label: 'Recurring', value: 'Recurring' },
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
          icon={({ className }) => <Plus className={cn("w-4 h-4", className ?? "")} />}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Create Payment Link
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
