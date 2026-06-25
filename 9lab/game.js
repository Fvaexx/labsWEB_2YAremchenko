const categories = ['animals', 'insects', 'fish'];
const extensions = ['jpg', 'png', 'jpeg', 'webp', 'avif'];
let score = 0;
let targetData = { id: 0, cat: '' };


function getImgPath(cat, id, ext = 'jpg') {
    return `https://picsum.photos/seed/${cat}_${id}/150/150`;
}

function fixImgErrors(imgElement, cat, id) {
    imgElement.off('error').on('error', function () {
        let currentSrc = $(this).attr('src');
        
        // Якщо сервер не віддав картинку з першого разу, пробуємо обійти кеш
        if (!currentSrc.includes('retry')) {
            $(this).attr('src', getImgPath(cat, id) + "?retry=1");
        } else {
        
            $(this).attr('src', `https://via.placeholder.com/150/1e1e1e/4caf50?text=${cat}+${id}`);
        }
    });
}

function generateRandomItem() {
    return {
        id: Math.floor(Math.random() * 50) + 1,
        cat: categories[Math.floor(Math.random() * categories.length)]
    };
}

function initGame() {
    score = 0;
    $('#score').text(score);
    $('#cat-name').text('Loading...'); 
    const grid = $('#game-grid').empty();

    for (let i = 0; i < 25; i++) {
        const item = generateRandomItem();
        const zone = $(`<div class="drop-zone" data-id="${item.id}" data-cat="${item.cat}"></div>`);
        const img = $(`<img src="${getImgPath(item.cat, item.id)}">`);

        fixImgErrors(img, item.cat, item.id);
        zone.append(img);
        grid.append(zone);
    }

    setupDroppable();
    nextRound();
}

function nextRound() {
    const allZones = $('.drop-zone');
    const randomZone = $(allZones[Math.floor(Math.random() * allZones.length)]);

    targetData.id = randomZone.data('id');
    targetData.cat = randomZone.data('cat');

    // Виводимо категорію в інтерфейс, щоб гравцю було цікавіше
    $('#cat-name').text(targetData.cat.toUpperCase());

    const taskImg = $('#main-task');
    taskImg.attr('src', getImgPath(targetData.cat, targetData.id));
    fixImgErrors(taskImg, targetData.cat, targetData.id);

    $(".drag-item").css({ top: 0, left: 0 });
}

function setupDroppable() {
    $(".drag-item").draggable({
        revert: "invalid",
        containment: "document"
    });

    $(".drop-zone").droppable({
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            const droppedId = $(this).data('id');
            const droppedCat = $(this).data('cat');

            if (droppedId === targetData.id && droppedCat === targetData.cat) {
                score++;
                $('#score').text(score);
                alert("Correct!");

                const newItem = generateRandomItem();
                $(this).data('id', newItem.id).attr('data-id', newItem.id);
                $(this).data('cat', newItem.cat).attr('data-cat', newItem.cat);

                const newImg = $(this).find('img');
                newImg.attr('src', getImgPath(newItem.cat, newItem.id));
                fixImgErrors(newImg, newItem.cat, newItem.id);

                nextRound();
            } else {
                score = 0;
                $('#score').text(score);
                ui.draggable.animate({ top: 0, left: 0 }, 500);
                alert("Wrong! Score reset.");
            }
        }
    });
}

$('#restart-btn').click(function () {
    initGame();
});

$(document).ready(initGame);