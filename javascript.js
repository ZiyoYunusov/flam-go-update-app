/**
 * Fetches APK file metadata (size and last modified date)
 */
async function getFileInfo() {
    const fileSizeElement = document.getElementById('fileSize');
    const lastUpdatedElement = document.getElementById('lastUpdated');

    try {
        // We use relative path to 'app.apk' in the same folder
        const response = await fetch('app.apk', { method: 'HEAD' });
        
        if (!response.ok) throw new Error('File not found');

        // Extract File Size
        const size = response.headers.get('content-length');
        if (size) {
            const sizeMB = (size / (1024 * 1024)).toFixed(1);
            fileSizeElement.textContent = `${sizeMB} MB`;
        } else {
            fileSizeElement.textContent = '---';
        }

        // Extract Last Modified Date
        const lastModified = response.headers.get('last-modified');
        if (lastModified) {
            const date = new Date(lastModified);
            lastUpdatedElement.textContent = date.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } else {
            lastUpdatedElement.textContent = '---';
        }

    } catch (error) {
        console.warn('Metadata fetch failed:', error);
        fileSizeElement.textContent = '---';
        lastUpdatedElement.textContent = '---';
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    getFileInfo();

    const downloadBtn = document.querySelector('.download-link');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            console.log('Download initiated...');
        });
    }
});
