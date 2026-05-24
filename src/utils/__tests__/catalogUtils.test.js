import { describe, it, expect } from 'vitest';
import { filterByCategory } from '../catalogUtils';

describe('Утилиты каталога', () => {
    it('Должен возвращать все элементы, если фильтр "all"', () => {
        const items = [{ id: 1, type: 'book' }, { id: 2, type: 'movie' }];
        const result = filterByCategory(items, 'all');
        expect(result.length).toBe(2);
    });

    it('Должен фильтровать элементы по заданному типу', () => {
        const items = [{ id: 1, type: 'book' }, { id: 2, type: 'movie' }, { id: 3, type: 'book' }];
        const result = filterByCategory(items, 'book');
        expect(result.length).toBe(2);
        expect(result[0].type).toBe('book');
        expect(result[1].type).toBe('book');
    });
});