// Получаем информацию о файле APK
function getFileInfo() {
    fetch('app.apk', { method: 'HEAD' })
        .then(response => {
            // Получаем размер файла
            const size = response.headers.get('content-length');
            if (size) {
                const sizeMB = (size / (1024 * 1024)).toFixed(2);
                document.getElementById('fileSize').textContent = sizeMB + ' MB';
            } else {
                document.getElementById('fileSize').textContent = 'Н/Д';
            }

            // Получаем дату последнего изменения
            const lastModified = response.headers.get('last-modified');
            if (lastModified) {
                const date = new Date(lastModified);
                const options = { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                };
                document.getElementById('lastUpdated').textContent = date.toLocaleDateString('ru-RU', options);
            } else {
                document.getElementById('lastUpdated').textContent = 'Н/Д';
            }
        })
        .catch(error => {
            console.error('Ошибка при получении информации о файле:', error);
            document.getElementById('fileSize').textContent = 'Н/Д';
            document.getElementById('lastUpdated').textContent = 'Н/Д';
        });
}

// Запускаем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', getFileInfo);

// Опционально: добавляем обработчик клика на кнопку скачивания
document.querySelector('.download-btn').addEventListener('click', function(e) {
    console.log('Начинается скачивание APK файла...');
    
    // Можно добавить аналитику или другую логику
    // Например, отправить событие в Google Analytics
    // gtag('event', 'download', { 'event_category': 'APK' });
});