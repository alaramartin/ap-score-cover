import { colors } from "../styles/colors.ts";

function Header() {
    return (
        <header
            style={{
                padding: "16px",
                background: colors.background,
            }}
        >
            <h1
                style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#212529",
                }}
            >
                AP Score Cover
            </h1>
        </header>
    );
}

export default Header;
