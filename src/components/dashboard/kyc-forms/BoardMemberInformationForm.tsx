"use client"

import React from "react"
import { Form } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import InputField from "~/components/controls/InputField"
import Button from "~/components/controls/button"
import Upload from "~/components/controls/upload"

interface BoardMemberInformationFormProps {
  onFinish: (values: any) => void
  initialValues?: any
}

export default function BoardMemberInformationForm({ onFinish, initialValues }: BoardMemberInformationFormProps) {
  const [form] = Form.useForm()

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues} className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Board Member Info</h2>

      <InputField
        label="NIN"
        name="nin"
        placeholder="Enter NIN"
        rules={[{ required: true, message: "National Identification Number is required" }]}
      />

      <Form.Item
        label={<span className="text-sm font-medium text-gray-700">Utility Bill</span>}
        name="utilityBill"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Utility bill is required" }]}
      >
        <Upload listType="picture" maxCount={1} accept=".png,.jpg,.jpeg,.pdf" className="w-full">
          <Button icon={UploadOutlined} htmlType="button" type="default">
            Choose a File
          </Button>
        </Upload>
        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG, PDF are accepted. Max file size 5MB</p>
        <a href="#" className="text-primary text-sm mt-1 block">
          See a Sample
        </a>
      </Form.Item>

      <Form.Item
        label={<span className="text-sm font-medium text-gray-700">Valid ID Card(NIN)</span>}
        name="ninIdCard"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "NIN file is required" }]}
      >
        <Upload listType="picture" maxCount={1} accept=".png,.jpg,.jpeg,.pdf" className="w-full">
          <Button icon={UploadOutlined} htmlType="button" type="default">
            Choose a File
          </Button>
        </Upload>
        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG, PDF are accepted. Max file size 5MB</p>
        <a href="#" className="text-primary text-sm mt-1 block">
          See a Sample
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full mt-6">
          Save and Proceed
        </Button>
      </Form.Item>
    </Form>
  )
}
