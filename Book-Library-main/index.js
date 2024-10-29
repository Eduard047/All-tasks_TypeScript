

/**
 * Клас для представлення книги
 */
class Book {
    /**
     * @param {string} title - Назва книги
     * @param {string} author - Автор книги
     * @param {number} year - Рік видання
     * @param {boolean} available - Доступність книги
     */
    constructor(title, author, year, available) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.available = available;
    }
}

/**
 * Клас для бібліотеки книг
 */
class BookLibrary {
    constructor() {
        /** @type {Book[]} */
        this.books = [];
    }

    /**
     * Додати нову книгу
     * @param {Book} book - Книга для додавання
     */
    addBook(book) {
        // Перевірка на існування книги за назвою
        const existingBook = this.books.find(b => b.title === book.title);
        if (existingBook) {
            console.log(`Книга "${book.title}" вже існує в бібліотеці.`);
            return;
        }
        this.books.push(book);
        console.log(`Книга "${book.title}" додана до бібліотеки.`);
    }

    /**
     * Видалити книгу за назвою
     * @param {string} title - Назва книги для видалення
     */
    removeBook(title) {
        const index = this.books.findIndex(b => b.title === title);
        if (index !== -1) {
            this.books.splice(index, 1);
            console.log(`Книга "${title}" видалена з бібліотеки.`);
        } else {
            console.log(`Книга "${title}" не знайдена.`);
        }
    }

    /**
     * Показати всі книги
     */
    listAllBooks() {
        if (this.books.length === 0) {
            console.log('Бібліотека пуста.');
            return;
        }
        console.log('Список книг:');
        this.books.forEach((book, index) => {
            console.log(`${index + 1}. Назва: "${book.title}", Автор: ${book.author}, Рік: ${book.year}, Доступність: ${book.available ? 'Так' : 'Ні'}`);
        });
    }

    /**
     * Оновити інформацію про книгу
     * @param {number} index - Індекс книги для оновлення
     * @param {Object} newInfo - Нові дані для книги
     * @param {string} [newInfo.title] - Нова назва книги
     * @param {string} [newInfo.author] - Новий автор книги
     * @param {number} [newInfo.year] - Новий рік видання
     * @param {boolean} [newInfo.available] - Нова доступність книги
     */
    updateBook(index, newInfo) {
        if (index >= 0 && index < this.books.length) {
            this.books[index] = { ...this.books[index], ...newInfo };
            console.log(`Інформація про книгу "${this.books[index].title}" оновлена.`);
        } else {
            console.log('Індекс книги недійсний.');
        }
    }

    /**
     * Пошук книг за автором
     * @param {string} author - Автор для пошуку
     */
    findBooksByAuthor(author) {
        const result = this.books.filter(b => b.author === author);
        if (result.length === 0) {
            console.log(`Книги автора "${author}" не знайдені.`);
            return;
        }
        console.log(`Книги автора "${author}":`);
        result.forEach((book, index) => {
            console.log(`${index + 1}. Назва: "${book.title}", Рік: ${book.year}, Доступність: ${book.available ? 'Так' : 'Ні'}`);
        });
    }

    /**
     * Пошук книг за роком видання
     * @param {number} year - Рік видання для пошуку
     */
    findBooksByYear(year) {
        const result = this.books.filter(b => b.year === year);
        if (result.length === 0) {
            console.log(`Книги за роком видання ${year} не знайдені.`);
            return;
        }
        console.log(`Книги за роком видання ${year}:`);
        result.forEach((book, index) => {
            console.log(`${index + 1}. Назва: "${book.title}", Автор: ${book.author}, Доступність: ${book.available ? 'Так' : 'Ні'}`);
        });
    }

    /**
     * Перевірка доступності книги
     * @param {string} title - Назва книги для перевірки
     */
    checkAvailability(title) {
        const book = this.books.find(b => b.title === title);
        if (book) {
            console.log(`Книга "${title}" ${book.available ? 'доступна.' : 'недоступна.'}`);
        } else {
            console.log(`Книга "${title}" не знайдена.`);
        }
    }

    /**
     * Генерація тестових даних
     */
    generateTestData() {
        const titles = ['Книга A', 'Книга B', 'Книга C', 'Книга D', 'Книга @'];
        for (let i = 0; i < titles.length; i++) {
            this.addBook(new Book(titles[i], `Автор ${i + 1}`, 2000 + i, i % 2 === 0));
        }
    }

    /**
     * Показати кількість книг в бібліотеці
     */
    countBooks() {
        console.log(`Кількість книг в бібліотеці: ${this.books.length}`);
    }

    /**
     * Показати доступні книги
     */
    listAvailableBooks() {
        const availableBooks = this.books.filter(b => b.available);
        if (availableBooks.length === 0) {
            console.log('Немає доступних книг.');
            return;
        }
        console.log('Список доступних книг:');
        availableBooks.forEach((book, index) => {
            console.log(`${index + 1}. Назва: "${book.title}", Автор: ${book.author}, Рік: ${book.year}`);
        });
    }

    /**
     * Показати недоступні книги
     */
    listUnavailableBooks() {
        const unavailableBooks = this.books.filter(b => !b.available);
        if (unavailableBooks.length === 0) {
            console.log('Немає недоступних книг.');
            return;
        }
        console.log('Список недоступних книг:');
        unavailableBooks.forEach((book, index) => {
            console.log(`${index + 1}. Назва: "${book.title}", Автор: ${book.author}, Рік: ${book.year}`);
        });
    }
}

// Створення бібліотеки
const library = new BookLibrary();

// Додавання книг
library.addBook(new Book('Великий Гетсбі', 'Френсіс Скотт Фіцджеральд', 1925, true));
library.addBook(new Book('1984', 'Джордж Орвелл', 1949, true));
library.addBook(new Book('Убити пересмішника', 'Харпер Лі', 1960, true));
library.addBook(new Book('Гордість і упередження', 'Джейн Остін', 1814, true));
library.addBook(new Book('Мобі Дік', 'Герман Мелвілл', 1851, true));

// Видалення книг
library.removeBook('1984');
library.removeBook('Книга, якої немає');

// Перегляд всіх книг
library.listAllBooks();

// Оновлення інформації про книгу
library.updateBook(2, { available: false });

// Пошук книг по автору
library.findBooksByAuthor('Джейн Остін');

// Пошук книг за роком видання
library.findBooksByYear(1960);

// Перевірка доступності книги
library.checkAvailability('Великий Гетсбі');

// Генерація тестових даних
library.generateTestData();

// Перегляд всіх книг після генерації тестових даних
library.listAllBooks();

// Показ кількості книг
library.countBooks();

// Показ доступних книг
library.listAvailableBooks();

// Показ недоступних книг
library.listUnavailableBooks();

// Завершення програми
console.log('Програма завершена.');
