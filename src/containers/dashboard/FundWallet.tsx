"use client"

import { useState } from "react"
import { Form, Input, Button as AntdButton, Card, Radio, Space } from "antd"
import { CreditCard, Banknote, QrCode, CheckCircle } from "lucide-react"
import BannerHeader from "~/components/ui/BannerHeader"


export default function FundWalletContainer() {
  const [paymentMethod, setPaymentMethod] = useState("card") // 'card', 'bank_transfer', 'ussd', 'qr'
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log("Fund Wallet Form Values:", values)
    // Simulate payment processing
    alert(`Initiating ${paymentMethod} payment for ${values.amount} NGN`)
    // In a real app, you'd integrate with CoralPay/BellBank here
  }

  return (
    <div className="space-y-6">
      <BannerHeader
        title="Fund Wallet"
        breadcrumbs={[{ label: "Wallet" }, { label: "Fund Wallet" }]}
        description="Choose a method to add funds to your BellCollect wallet."
          />

      <Card className="border-0 shadow-sm bg-card p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Select Payment Method</h2>

        <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} className="w-full mb-8">
          <Space direction="vertical" className="w-full">
            <Radio.Button
              value="card"
              className="w-full h-auto p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-primary" />
                <span className="font-medium text-base">Pay with Card</span>
              </div>
              {paymentMethod === "card" && <CheckCircle className="w-5 h-5 text-primary" />}
            </Radio.Button>
            <Radio.Button
              value="bank_transfer"
              className="w-full h-auto p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Banknote className="w-6 h-6 text-primary" />
                <span className="font-medium text-base">Bank Transfer</span>
              </div>
              {paymentMethod === "bank_transfer" && <CheckCircle className="w-5 h-5 text-primary" />}
            </Radio.Button>
            <Radio.Button
              value="ussd"
              className="w-full h-auto p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-6 h-6 text-primary" />
                <span className="font-medium text-base">USSD</span>
              </div>
              {paymentMethod === "ussd" && <CheckCircle className="w-5 h-5 text-primary" />}
            </Radio.Button>
            {/* Add QR Code option if needed */}
            {/* <Radio.Button value="qr" className="w-full h-auto p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <QrCode className="w-6 h-6 text-primary" />
                <span className="font-medium text-base">QR Code</span>
              </div>
              {paymentMethod === 'qr' && <CheckCircle className="w-5 h-5 text-primary" />}
            </Radio.Button> */}
          </Space>
        </Radio.Group>

        <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-6">
          <Form.Item
            label="Amount (NGN)"
            name="amount"
            rules={[
              { required: true, message: "Please enter the amount" },
              { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: "Please enter a valid amount" },
              { min: 1, message: "Amount must be at least 1 NGN" },
            ]}
          >
            <Input
              prefix="₦"
              placeholder="e.g., 50000"
              className="h-12 rounded-lg border-input focus:border-primary focus:ring-2 focus:ring-primary/20 bg-card text-foreground text-lg"
              type="number"
            />
          </Form.Item>

          {paymentMethod === "card" && (
            <>
              <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[{ required: true, message: "Please enter card number" }]}
              >
                <Input
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="h-10 rounded-lg border-input focus:border-primary focus:ring-2 focus:ring-primary/20 bg-card text-foreground"
                />
              </Form.Item>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label="Expiry Date"
                  name="expiryDate"
                  rules={[{ required: true, message: "Please enter expiry date" }]}
                >
                  <Input
                    placeholder="MM/YY"
                    className="h-10 rounded-lg border-input focus:border-primary focus:ring-2 focus:ring-primary/20 bg-card text-foreground"
                  />
                </Form.Item>
                <Form.Item label="CVV" name="cvv" rules={[{ required: true, message: "Please enter CVV" }]}>
                  <Input
                    placeholder="XXX"
                    className="h-10 rounded-lg border-input focus:border-primary focus:ring-2 focus:ring-primary/20 bg-card text-foreground"
                  />
                </Form.Item>
              </div>
            </>
          )}

          {paymentMethod === "bank_transfer" && (
            <div className="bg-muted p-4 rounded-lg text-center space-y-3">
              <p className="text-lg font-semibold text-foreground">Transfer to this account:</p>
              <p className="text-2xl font-bold text-primary">0123456789</p>
              <p className="text-muted-foreground">BellCollect Virtual Account (Providus Bank)</p>
              <p className="text-sm text-gray-600">
                Please make a transfer of the exact amount to the account above. Your wallet will be credited
                automatically.
              </p>
              <AntdButton type="primary" className=" mt-4">
                Copy Account Number
              </AntdButton>
            </div>
          )}

          {paymentMethod === "ussd" && (
            <div className="bg-muted p-4 rounded-lg text-center space-y-3">
              <p className="text-lg font-semibold text-foreground">Dial this USSD code:</p>
              <p className="text-2xl font-bold text-primary">*737*000*AMOUNT#</p>
              <p className="text-muted-foreground">For GTBank customers</p>
              <p className="text-sm text-gray-600">Follow the prompts on your phone to complete the payment.</p>
              <AntdButton type="primary" className=" mt-4">
                Generate USSD Code
              </AntdButton>
            </div>
          )}

          <Form.Item>
            <AntdButton type="primary" htmlType="submit" className="  h-12">
              Proceed to Pay
            </AntdButton>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
