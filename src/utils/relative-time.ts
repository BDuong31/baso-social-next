export const relativeTime = (isoString: Date): string => {
    const data = new Date(isoString);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - data.getTime()) / 1000);

    if (seconds < 60) {
        return 'ngay bây giờ';
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} phút trước`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24){
        return `${hours} giờ trước`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30){
        return `${days} ngày trước`;
    }

    const months = Math.floor(days / 30);
    if (months === 1){
        return `1 tháng trước`;
    }
    if (months < 12){
        return `${months} tháng trước`;
    }

    const years = Math.floor(months / 12);
    if (years === 1){
        return `1 năm trước`;
    }
    return `${years} năm trước`;
};