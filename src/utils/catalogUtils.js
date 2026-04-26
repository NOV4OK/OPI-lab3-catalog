export const filterByCategory = (items, category) => {
    if (category === 'all') return items;
    return items.filter(item => item.type === category);
};