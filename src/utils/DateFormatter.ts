// utils/DateFormatter.ts
export class DateFormatter {
    private static readonly MINUTE = 1000 * 60;
    private static readonly HOUR = this.MINUTE * 60;
    private static readonly DAY = this.HOUR * 24;
    private static readonly WEEK = this.DAY * 7;
    private static readonly MONTH = this.DAY * 30;
    private static readonly YEAR = this.DAY * 365;

    public static toRelativeTime(date: string | Date): string {
        const targetDate = new Date(date);
        const now = new Date();
        const timeDiff = now.getTime() - targetDate.getTime();

        // 시간이 미래인 경우
        if (timeDiff < 0) {
            return '방금 전';
        }

        // 1분 이내
        if (timeDiff < this.MINUTE) {
            return '방금 전';
        }

        // 1시간 이내
        if (timeDiff < this.HOUR) {
            const minutes = Math.floor(timeDiff / this.MINUTE);
            return `${minutes}분 전`;
        }

        // 24시간 이내
        if (timeDiff < this.DAY) {
            const hours = Math.floor(timeDiff / this.HOUR);
            return `${hours}시간 전`;
        }

        // 7일 이내
        if (timeDiff < this.WEEK) {
            const days = Math.floor(timeDiff / this.DAY);
            return `${days}일 전`;
        }

        // 30일 이내
        if (timeDiff < this.MONTH) {
            const weeks = Math.floor(timeDiff / this.WEEK);
            return `${weeks}주 전`;
        }

        // 1년 이상
        const years = Math.floor(timeDiff / this.YEAR);
        return `${years}년 전`;
    }
}