import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { useCatalogStore } from '../store/useCatalogStore';

// Мокаем matchMedia, так как Ant Design использует его под капотом, а в тестовой среде jsdom его нет
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), 
      removeListener: vi.fn(), 
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
});

describe('Компонент App', () => {
    beforeEach(() => {
        // Очищаем стор перед каждым тестом
        useCatalogStore.setState({ items: [], currentFilter: 'all' });
    });

    it('Должен рендерить заголовок и пустое состояние', () => {
        render(<App />);
        expect(screen.getByText(/MyCollection/i)).toBeInTheDocument();
        // В зависимости от того, как у тебя написано пустое состояние
        expect(screen.getByText(/В этой категории пока ничего нет|Ничего не найдено/i)).toBeInTheDocument();
    });

    it('Должен добавлять новый элемент через форму', () => {
        render(<App />);
        
        const input = screen.getByPlaceholderText(/Название/i);
        const addButton = screen.getByRole('button', { name: /Добавить/i });

        // Вводим текст и нажимаем кнопку
        fireEvent.change(input, { target: { value: 'Тестовая книга' } });
        fireEvent.click(addButton);

        // Проверяем, что элемент появился на экране
        expect(screen.getByText('Тестовая книга')).toBeInTheDocument();
    });
});