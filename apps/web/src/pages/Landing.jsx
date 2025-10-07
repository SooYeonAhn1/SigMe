export default function Landings() {
    const goToRegister = () => {
        window.location.href = '/register';
    }
    return (
        <div>
            <h1>Welcome to SigMe. You landed to our homepage</h1>
            {console.log("landing component rendered")}
            <button onClick={goToRegister}>Click to register</button>
        </div>
    );
}