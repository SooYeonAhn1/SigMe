export default function Landings() {
    const goToSettings = () => {
        window.location.href = '/login';
    }
    return (
        <div>
            <h1>Welcome to CareFlow. You landed to our homepage</h1>
            {console.log("landing component rendered")}
            <button onClick={goToSettings}>Click to login</button>
        </div>
    );
}