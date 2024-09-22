// Відкриття та закриття модальних вікон
const modal = document.getElementById('modal') as HTMLElement;
const openModalBtn = document.getElementById('openModal') as HTMLElement;
const closeModalBtn = document.getElementById('closeModal') as HTMLElement;

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Додавання анімації при скролі
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate') as NodeListOf<HTMLElement>;
    elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('show');
        }
    });
});

// Завантаження даних з JSONPlaceholder та відображення
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('data-container') as HTMLElement;
        data.slice(0, 5).forEach((post: any) => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            container.appendChild(postElement);
        });
    });
