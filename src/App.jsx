import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCatalogStore } from './store/useCatalogStore';
import { filterByCategory } from './utils/catalogUtils';
import './App.css';

function App() {
  const { items, currentFilter, addItem, removeItem, updateRating, setFilter } = useCatalogStore();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('book');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addItem({ id: uuidv4(), title, type });
    setTitle('');
  };

  const filteredItems = filterByCategory(items, currentFilter);

  return (
    <div className="container">
      <h1>Каталогизатор коллекций</h1>
      
      <form onSubmit={handleAdd} className="add-form">
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Название (например: Властелин Колец)..." 
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="book">Книга</option>
          <option value="movie">Фильм</option>
          <option value="game">Игра</option>
        </select>
        <button type="submit">Добавить</button>
      </form>

      <div className="filters">
        <button onClick={() => setFilter('all')} className={currentFilter === 'all' ? 'active' : ''}>Все</button>
        <button onClick={() => setFilter('book')} className={currentFilter === 'book' ? 'active' : ''}>Книги</button>
        <button onClick={() => setFilter('movie')} className={currentFilter === 'movie' ? 'active' : ''}>Фильмы</button>
        <button onClick={() => setFilter('game')} className={currentFilter === 'game' ? 'active' : ''}>Игры</button>
      </div>

      <div className="catalog-list">
        {filteredItems.map(item => (
          <div key={item.id} className="card">
            <h3>{item.title}</h3>
            <span className="badge">{item.type}</span>
            <div className="rating">
              Оценка: 
              {[1, 2, 3, 4, 5].map(star => (
                <span 
                  key={star} 
                  className="star"
                  style={{ color: star <= item.rating ? '#ffd700' : '#444' }}
                  onClick={() => updateRating(item.id, star)}
                >
                  ★
                </span>
              ))}
            </div>
            <button className="delete-btn" onClick={() => removeItem(item.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;