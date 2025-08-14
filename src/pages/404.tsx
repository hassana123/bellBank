import { Layout, Typography, Space } from 'antd';
import { WarningOutlined, RocketOutlined } from '@ant-design/icons';
import { APP_NAME } from '~/config/app';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function SimpleComingSoonPage({ pageNotFound }: { pageNotFound?: boolean }) {
  return (
    <Layout style={{ minHeight: '100vh' }} className="bg-background"> {/* Changed background to bg-background */}
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <Space direction="vertical" size="large" align="center">
          {pageNotFound ? (
            <WarningOutlined className="text-primary" style={{ fontSize: '64px' }} /> 
          ) : (
            <RocketOutlined className="text-primary" style={{ fontSize: '64px' }} />
          )}
          <Title level={1} className="text-foreground" style={{ marginBottom: 0 }}> {/* Added text-foreground */}
            {pageNotFound ? 'Oops, Page Not Found' : 'Coming Soon'}
          </Title>
          <Text className="text-muted-foreground" style={{ fontSize: '18px', textAlign: 'center' }}> {/* Added text-muted-foreground */}
            {pageNotFound
              ? "It seems what you're looking for is no longer available"
              : "We're launching something exciting. Stay tuned!"}
          </Text>
          <Text type="secondary" className="text-muted-foreground"> {/* Added text-muted-foreground */}
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </Text>
        </Space>
      </Content>
    </Layout>
  );
}
