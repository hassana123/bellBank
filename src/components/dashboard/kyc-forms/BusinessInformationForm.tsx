"use client"

import React from "react"
import { Form } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import InputField from "~/components/controls/InputField"
import Select from "~/components/controls/select"
import Button from "~/components/controls/button"
import Upload from "~/components/controls/upload"

interface BusinessInformationFormProps {
  onFinish: (values: any) => void
  initialValues?: any
}

export default function BusinessInformationForm({ onFinish, initialValues }: BusinessInformationFormProps) {
  const [form] = Form.useForm()

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

  const countries = [{ value: "NG", label: "Nigeria" }] // Placeholder
  const states = [{ value: "LAG", label: "Lagos" }] // Placeholder
  const lgas = [{ value: "IKEJA", label: "Ikeja" }] // Placeholder

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues} className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Business Information</h2>

      <InputField
        label="Tell Us About Your Business"
        name="businessDescription"
        placeholder="Tell us about your business"
        rules={[{ required: true, message: "Business description is required" }]}
      />

      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Country is required" }]}
      >
        <Select
          placeholder="Select Country"
          options={countries}
        />
      </Form.Item>

      <Form.Item
        label="State"
        name="state"
        rules={[{ required: true, message: "State is required" }]}
      >
        <Select
          placeholder="Select State"
          options={states}
        />
      </Form.Item>

      <Form.Item
        label="Local Government Area (LGA)"
        name="lga"
        rules={[{ required: true, message: "LGA is required" }]}
      >
        <Select
          placeholder="Select LGA"
          options={lgas}
        />
      </Form.Item>

      <InputField
        label="Business Address"
        name="businessAddress"
        placeholder="Business Address"
        rules={[{ required: true, message: "Address is required" }]}
      />

      <InputField
        label="Business Website (required)"
        name="businessWebsite"
        placeholder="Business website is required"
        rules={[{ required: true, message: "Business website is required" }]}
      />

      <Form.Item
        label={<span className="text-sm font-medium text-gray-700">Business Logo</span>}
        name="businessLogo"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "A logo file is required if no logo URL is provided" }]}
      >
        <Upload listType="picture" maxCount={1} accept=".png,.jpg,.jpeg" className="w-full">
          <Button icon={UploadOutlined} htmlType="button" type="default">
            Select File
          </Button>
        </Upload>
      </Form.Item>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-4">Social Media Usernames (optional)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Facebook Username" name="facebookUsername" placeholder="Facebook Username" />
        <InputField label="X Username" name="xUsername" placeholder="X Username" />
        <InputField label="Instagram Username" name="instagramUsername" placeholder="Instagram Username" />
        <InputField label="LinkedIn Username" name="linkedinUsername" placeholder="LinkedIn Username" />
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full mt-6">
          Save and Proceed
        </Button>
      </Form.Item>
    </Form>
  )
}
