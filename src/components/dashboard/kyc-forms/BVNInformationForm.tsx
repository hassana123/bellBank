"use client"

import React from "react"
import { Form } from "antd"
import InputField from "~/components/controls/InputField"
import Button from "~/components/controls/button"

interface BVNInformationFormProps {
  onFinish: (values: any) => void
  initialValues?: any
}

export default function BVNInformationForm({ onFinish, initialValues }: BVNInformationFormProps) {
  const [form] = Form.useForm()

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues} className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">BVN Information</h2>

      <InputField
        label="BVN"
        name="bvn"
        placeholder="Enter BVN"
        rules={[{ required: true, message: "BVN is required" }]}
      />

      <InputField
        label="Phone Number Linked with BVN"
        name="bvnPhoneNumber"
        placeholder="Phone Number Linked with BVN"
        rules={[{ required: true, message: "Phone Number is required" }]}
      />

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full mt-6">
          Save and Proceed
        </Button>
      </Form.Item>
    </Form>
  )
}
