import { describe, it, expect, beforeEach } from 'vitest';
import { useCatalogStore } from '../useCatalogStore'; // Проверь правильность пути к твоему стору

describe('Тестирование состояния каталога (useCatalogStore)', () => {
    
    // Очищаем хранилище перед каждым тестом, чтобы они были независимыми
    beforeEach(() => {
        useCatalogStore.setState({ items: [], currentFilter: 'all' });
    });

    it('Должен корректно добавлять новый элемент (Позитивный тест)', () => {
        // 1. Arrange (Подготовка)
        const { addItem } = useCatalogStore.getState();
        const newItem = { id: '1', title: 'Дюна', type: 'book', rating: 0 };

        // 2. Act (Действие)
        addItem(newItem);

        // 3. Assert (Проверка)
        const { items } = useCatalogStore.getState();
        expect(items.length).toBe(1);
        expect(items[0].title).toBe('Дюна');
        expect(items[0].type).toBe('book');
    });

    it('Должен изменять текущий фильтр', () => {
        // 1. Arrange
        const { setFilter } = useCatalogStore.getState();

        // 2. Act
        setFilter('movie');

        // 3. Assert
        expect(useCatalogStore.getState().currentFilter).toBe('movie');
    });

    it('Должен корректно удалять элемент', () => {
        // 1. Arrange
        const { addItem, removeItem } = useCatalogStore.getState();
        addItem({ id: '123', title: 'Матрица', type: 'movie', rating: 0 });
        
        // 2. Act
        removeItem('123');

        // 3. Assert
        const { items } = useCatalogStore.getState();
        expect(items.length).toBe(0);
    });
});