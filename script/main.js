'use strict';

const docBody       = document.querySelector('body'),
    books           = document.querySelectorAll('.book'),
    booksAll        = document.querySelectorAll('.books'),
    bookTitleLnk    = document.querySelectorAll('.books a'),
    bookContentAll  = document.querySelectorAll('ul'),
    bookSecondContent = bookContentAll[0].querySelectorAll('li'),
    bookFifthContent = bookContentAll[5].querySelectorAll('li'),
    bookSixthContent = bookContentAll[2].querySelectorAll('li'),
    adv             = document.querySelector('.adv');


const addCntItem = (NodeCntAll, bookIndex, itemTitleTxt) => {
    const item = document.createElement('li');
    item.textContent = itemTitleTxt;
    NodeCntAll[bookIndex].append(item);

    const bookCnt = NodeCntAll[bookIndex].querySelectorAll('li');
    bookCnt[bookCnt.length-2].before(bookCnt[bookCnt.length-1]);
};

// Восстановить порядок книг.
books[0].before(books[1]);
books[0].after(books[4]);
books[2].before(books[3]);
books[5].after(books[2]);
// Заменяем картинку заднего фона на другую из папки image
docBody.style.backgroundImage = "url('image/you-dont-know-js.jpg')";
// Исправляем заголовок в книге 3
bookTitleLnk[4].textContent = 'Книга 3. this и Прототипы Объектов';
// Удаляем рекламый банер
adv.remove();
// Восстановим порядок глав во второй
bookSecondContent[10].before(bookSecondContent[2]);
bookSecondContent[3].after(bookSecondContent[6]);
bookSecondContent[6].after(bookSecondContent[8]);
// и пятой книге
bookFifthContent[1].after(bookFifthContent[9]);
bookFifthContent[9].after(bookFifthContent[3]);
bookFifthContent[3].after(bookFifthContent[4]);
bookFifthContent[7].after(bookFifthContent[5]);
// в шестой книге добавим главу “Глава 8: За пределами ES6”
addCntItem (bookContentAll, 2, 'Глава 8: За пределами ES6');