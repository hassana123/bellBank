"use client"

import React from "react"
import { Form } from "antd"
import InputField from "~/components/controls/InputField"
import Select from "~/components/controls/select"
import Button from "~/components/controls/button"

interface AccountInformationFormProps {
  onFinish: (values: any) => void
  initialValues?: any
}

export default function AccountInformationForm({ onFinish, initialValues }: AccountInformationFormProps) {
  const [form] = Form.useForm()

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

  const banks = [
    { value: "bankA", label: "Bank A" },
    { value: "bankB", label: "Bank B" },
  ] // Placeholder

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues} className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Account Information (Corporate Bank Account)</h2>

      <InputField label="Search Bank" name="searchBank" placeholder="Search Bank" />

      <Form.Item
        label="Bank"
        name="bank"
        rules={[{ required: true, message: "Bank is required" }]}
      >
        <Select
          placeholder="Select Bank"
          options={banks}
        />
      </Form.Item>

      <InputField
        label="Account Number"
        name="accountNumber"
        placeholder="Account Number"
        rules={[{ required: true, message: "Account Number is required" }]}
      />

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full mt-6">
          Save and Proceed
        </Button>
      </Form.Item>
    </Form>
  )
}
