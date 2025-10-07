export default function DailyLogs() {
    const goToSettings = () => {
        window.location.href = '/settings';
    }
    return (
        <div>
            <h1>Daily Logs</h1>
            {console.log("daily component rendered")}
            <button onClick ={goToSettings}>settings</button>
        </div>
    );
}