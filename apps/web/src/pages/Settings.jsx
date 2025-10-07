export default function Settings() {
    const goToDailyLogs = () => {
        window.location.href = '/daily-logs';
    }

    return (
        <div>
            <h1>You can manage your settings here</h1>
            {console.log("settings component rendered")}
            <button onClick={goToDailyLogs}>Go log your day</button>
        </div>
    );
}