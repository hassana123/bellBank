import { useState, useEffect } from "react";
import { Card, Form, Select, Input } from "antd";
import { Lock, AlertTriangle, Send, BanknoteIcon, User, Eye, EyeOff, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "~/components/controls/button";
import { classNames as cn } from "~/utils";

const { Option } = Select;
const { TextArea } = Input;

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const mockBankAccounts: BankAccount[] = [
  { id: "1", bankName: "First Bank of Nigeria", accountNumber: "0123456789", accountName: "John Doe" },
  { id: "2", bankName: "Zenith Bank Plc", accountNumber: "9876543210", accountName: "Jane Smith" },
  { id: "3", bankName: "Guaranty Trust Bank", accountNumber: "1122334455", accountName: "BellCollect Ltd" },
];

const transferInfo = [
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />,
    title: "Instant Processing",
    text: "Transfers are processed instantly, ensuring quick delivery of funds."
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />,
    title: "Secure Transaction",
    text: "Your transaction PIN is required to authorize transfers, ensuring security."
  },
  {
    icon: <Lock className="w-6 h-6 text-muted-foreground shrink-0 mt-0.5" />,
    title: "Encrypted Transfer",
    text: "All transfer data is encrypted end-to-end to protect your sensitive information."
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />,
    title: "Double Check",
    text: "Always verify recipient details carefully before confirming to avoid errors."
  }
];

export default function BankTransferContainer() {
  const [form] = Form.useForm();
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [infoIndex, setInfoIndex] = useState(0);

  const handleBankSelect = (value: string) => {
    const selectedAccount = mockBankAccounts.find((acc) => acc.id === value);
    if (selectedAccount) {
      setBeneficiaryName(selectedAccount.accountName);
      form.setFieldsValue({ beneficiaryName: selectedAccount.accountName });
    } else {
      setBeneficiaryName("");
      form.setFieldsValue({ beneficiaryName: "" });
    }
  };

  const onFinish = (values: any) => {
    console.log("Bank Transfer Form Submitted:", values);
    alert("Transfer initiated successfully!");
    form.resetFields();
    setBeneficiaryName("");
  };

  // Auto-slide transfer info every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setInfoIndex((prev) => (prev + 1) % transferInfo.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 mx-auto dark:text-white max-w-4xl">
      {/* Sliding Info Banner */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-lg flex items-center gap-3 min-h-[90px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={infoIndex}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <small className="block">{transferInfo[infoIndex].icon}</small>
            <div>
              <h3 className="font-medium text-foreground">{transferInfo[infoIndex].title}</h3>
              <p className="text-muted-foreground">{transferInfo[infoIndex].text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Transfer Form */}
      <Card
        title={
          <span className="text-foreground font-semibold text-xl flex items-center gap-2">
            <Send className="w-6 h-6 text-primary" /> Transfer Details
          </span>
        }
        className="rounded-xl shadow-lg bg-card text-card-foreground p-6 border border-border"
      >
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ currency: "NGN" }}>
          {/* Bank Selection */}
          <Form.Item
            name="bankAccount"
            label={
              <span className="text-foreground font-medium text-base">
                Select Bank Account <span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: "Please select a bank account!" }]}
            className="mb-6"
          >
            <Select
              placeholder={
                <span className="flex items-center gap-2 text-muted-foreground">
                  <BanknoteIcon className="w-4 h-4" /> Select an account
                </span>
              }
              onChange={handleBankSelect}
              size="large"
              className="h-12 rounded-lg border border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
              dropdownStyle={{ borderRadius: "8px" }}
            >
              {mockBankAccounts.map((account) => (
                <Option key={account.id} value={account.id}>
                  {account.bankName} ({account.accountNumber})
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Beneficiary */}
          <Form.Item
            name="beneficiaryName"
            label={<span className="text-foreground font-medium text-base">Beneficiary Name</span>}
            className="mb-6"
          >
            <Input
              readOnly
              value={beneficiaryName}
              placeholder="Auto-populated from selected account"
              prefix={<User className="w-4 h-4 text-muted-foreground" />}
              size="large"
              className="h-12 rounded-lg bg-muted/50 text-muted-foreground border border-input"
            />
          </Form.Item>

          {/* Amount */}
          <Form.Item
            name="amount"
            label={
              <span className="text-foreground font-medium text-base">
                Amount <span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: "Please enter an amount!" }]}
            className="mb-2"
          >
            <Input
              type="number"
              min={1}
              addonBefore={<span className="text-muted-foreground text-lg">₦</span>}
              addonAfter={<span className="text-muted-foreground text-lg">NGN</span>}
              placeholder="0.00"
              size="large"
              className="h-12 rounded-lg border border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </Form.Item>
          <p className="text-sm text-muted-foreground mb-6">Minimum transfer amount is ₦1.00</p>

          {/* Narration */}
          <Form.Item
            name="narration"
            label={<span className="text-foreground font-medium text-base">Narration (Optional)</span>}
            className="mb-6"
          >
            <TextArea
              rows={3}
              placeholder="Reason for transfer"
              className="min-h-[60px] rounded-lg border border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </Form.Item>

          {/* PIN */}
          <Form.Item
            name="transactionPin"
            label={
              <span className="text-foreground font-medium text-base">
                Transaction PIN <span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: "Please enter your transaction PIN!" }]}
            className="mb-8"
          >
            <Input
              type={showPin ? "text" : "password"}
              maxLength={4}
              placeholder="Enter your 4-digit PIN"
              prefix={<Lock className="w-4 h-4 text-muted-foreground" />}
              size="large"
              suffix={
                <Button
                  type="text"
                  icon={({ className }) =>
                    showPin ? (
                      <EyeOff className={cn("w-4 h-4", className ?? "")} />
                    ) : (
                      <Eye className={cn("w-4 h-4", className ?? "")} />
                    )
                  }
                  onClick={() => setShowPin(!showPin)}
                  className="text-muted-foreground hover:text-primary"
                />
              }
              className="h-12 rounded-lg border border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={({ className }) => <Send className={cn("w-5 h-5", className ?? "")} />}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
            >
              Send Fund
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
