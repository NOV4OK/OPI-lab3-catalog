import React, { useState } from 'react';
import { 
  Layout, Typography, Card, Tag, Rate, Select, Row, Col, 
  Empty, Button, Input, Space, ConfigProvider, theme 
} from 'antd';
import { 
  BookOutlined, VideoCameraOutlined, ControlOutlined, 
  PlusOutlined, DeleteOutlined 
} from '@ant-design/icons';
import { useCatalogStore } from './store/useCatalogStore';
import { v4 as uuidv4 } from 'uuid';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

// Цвета оставляем снаружи, так как тут нет JSX-кода
const categoryColors = {
  book: '#177ddc',
  movie: '#cb2b83',
  game: '#49aa19'
};

const App = () => {
  const { items, currentFilter, setFilter, updateRating, addItem, removeItem } = useCatalogStore();
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('book');

  // Перенесли иконки ВНУТРЬ компонента, чтобы тесты на GitHub не падали!
  const categoryIcons = {
    book: <BookOutlined />,
    movie: <VideoCameraOutlined />,
    game: <ControlOutlined />
  };

  const handleAdd = () => {
    if (!newName.trim()) return;
    addItem({ id: uuidv4(), title: newName, type: newType });
    setNewName('');
  };

  const filteredItems = items.filter(item => 
    currentFilter === 'all' ? true : item.type === currentFilter
  );

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Layout style={{ minHeight: '100vh', background: '#141414' }}>
        <Header style={{ 
          background: '#000', 
          padding: '0 50px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid #303030'
        }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>📦 MyCollection</Title>
          <Space>
            <Text style={{ color: 'rgba(255,255,255,0.45)' }}>Фильтр:</Text>
            <Select defaultValue="all" style={{ width: 120 }} onChange={setFilter}>
              <Select.Option value="all">Все</Select.Option>
              <Select.Option value="book">Книги</Select.Option>
              <Select.Option value="movie">Фильмы</Select.Option>
              <Select.Option value="game">Игры</Select.Option>
            </Select>
          </Space>
        </Header>

        <Content style={{ padding: '40px 50px' }}>
          {/* Блок добавления */}
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <Title level={2}>✨ Добавить в коллекцию</Title>
            <Space.Compact style={{ width: '100%', maxWidth: 600 }}>
              <Select 
                defaultValue="book" 
                style={{ width: 120 }} 
                onChange={setNewType}
                size="large"
              >
                <Select.Option value="book">Книга</Select.Option>
                <Select.Option value="movie">Фильм</Select.Option>
                <Select.Option value="game">Игра</Select.Option>
              </Select>
              <Input 
                placeholder="Название (например: Ведьмак)..." 
                value={newName}
                onChange={e => setNewName(e.target.value)}
                size="large"
                onPressEnter={handleAdd}
              />
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                size="large"
                onClick={handleAdd}
                style={{ background: '#49aa19', borderColor: '#49aa19' }}
              >
                Добавить
              </Button>
            </Space.Compact>
          </div>

          {/* Сетка карточек */}
          {filteredItems.length === 0 ? (
            <Empty description="Ничего не найдено" style={{ marginTop: 100 }} />
          ) : (
            <Row gutter={[24, 24]}>
              {filteredItems.map(item => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                  <Card 
                    hoverable
                    style={{ background: '#1f1f1f', borderColor: '#303030' }}
                    actions={[
                      <DeleteOutlined 
                        key="delete" 
                        style={{ color: '#ff4d4f' }} 
                        onClick={() => removeItem(item.id)} 
                      />
                    ]}
                  >
                    <div style={{ marginBottom: 12 }}>
                      <Tag color={categoryColors[item.type]}>
                        {categoryIcons[item.type]} {item.type.toUpperCase()}
                      </Tag>
                    </div>
                    <Card.Meta 
                      title={<span style={{ color: '#fff', fontSize: 18 }}>{item.title}</span>} 
                      description={
                        <div style={{ marginTop: 12 }}>
                          <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>Твой рейтинг:</Text>
                          <Rate 
                            value={item.rating} 
                            onChange={(val) => updateRating(item.id, val)} 
                          />
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;