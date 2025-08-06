import { useState } from 'react';
import { Modal } from '../controls';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { BUSINESS_CATEGORIES } from '~/constants/businessCategory';
interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BusinessTypeOverlay({ open, onClose }: Props) {
  const [selectedType, setSelectedType] = useState<'registered' | 'starter' | null>(null);
  const [category, setCategory] = useState('');

  const isReady = selectedType && category;

  return (
    <Modal
  open={open}
  footer={null}
  closable={false}
  centered
  onCancel={onClose}
  maskClosable={false} 
  width={600}
  className="!p-0"
  bodyStyle={{ padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}
>

      <h2 className="text-xl font-semibold text-center mb-2">Business Type Registration</h2>
      <p className="text-center text-sm text-text-muted mb-6">
        Please select the type and category of your business. This information will help us better understand your business needs.
      </p>

      <section className="space-y-4 mb-6">
        <h4 className="font-medium">Select Your Business Type</h4>

        <div
          onClick={() => setSelectedType('registered')}
          className={classNames(
            'border rounded p-4 cursor-pointer',
            selectedType === 'registered' ? 'border-primary bg-primary/10' : 'border-gray-300'
          )}
        >
          <h5 className="font-medium">Registered Business</h5>
          <p className="text-sm text-text-muted mt-1">
            For businesses that are registered with an identity number. Please select this if you have a legally registered business.
          </p>
        </div>

        <div
          onClick={() => setSelectedType('starter')}
          className={classNames(
            'border rounded p-4 cursor-pointer',
            selectedType === 'starter' ? 'border-primary bg-primary/10' : 'border-gray-300'
          )}
        >
          <h5 className="font-medium">Starter Business</h5>
          <p className="text-sm text-text-muted mt-1">
            For solopreneurs, freelancers, and unregistered businesses. Select this if you're just starting or do not have official registration.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h4 className="font-medium mb-2">Select Your Business Category</h4>
        <div className="relative">
          <select
  className="w-full border border-gray-300 rounded px-4 py-2 pr-8 appearance-none text-sm text-text-muted"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select Category</option>
  {BUSINESS_CATEGORIES.map((cat) => (
    <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>
      {cat}
    </option>
  ))}
</select>
   <DownOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted pointer-events-none" />
        </div>
      </section>

      <button
        className="w-full bg-primary text-white font-medium py-2 rounded disabled:opacity-50"
        disabled={!isReady}
        onClick={() => {
          console.log({ selectedType, category });
          onClose();
        }}
      >
        Save and Proceed
      </button>
    </Modal>
  );
}
